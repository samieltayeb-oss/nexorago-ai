import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { ItineraryResponseSchema, ItineraryApiResponse } from "@/lib/schemas/aiSchemas";
import { getMockWeatherForecast } from "@/lib/providers/weatherProvider";
import { getSeasonalContext } from "@/lib/providers/seasonProvider";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "dummy-key-to-prevent-build-error",
});

function sanitizeJsonString(raw: string): string {
  let clean = raw.trim();
  if (clean.startsWith("```json")) {
    clean = clean.replace(/^```json\n?/, "");
  }
  if (clean.startsWith("```")) {
    clean = clean.replace(/^```\n?/, "");
  }
  if (clean.endsWith("```")) {
    clean = clean.replace(/```$/, "");
  }
  return clean.trim();
}

function generateDates(startStr: string, endStr: string): string[] {
  const dates = [];
  let current = new Date(startStr);
  const end = new Date(endStr);
  while (current <= end) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export async function POST(req: Request) {
  try {
    const criteria = await req.json();

    // Generate weather and seasonal context for the trip dates
    const tripDates = generateDates(criteria.checkIn, criteria.checkOut);
    const weatherForecast = getMockWeatherForecast(tripDates);
    const seasonalContext = getSeasonalContext(criteria.checkIn);

    const basePrompt = `
You are Nexora, a world-class luxury AI concierge for the Canadian Rockies.
The user is planning a trip with the following criteria:
- Check-in: ${criteria.checkIn}
- Check-out: ${criteria.checkOut}
- Adults: ${criteria.adults}
- Children: ${criteria.children} (Ages: ${criteria.childrenAges?.join(", ") || "N/A"})
- Target Budget: $${criteria.maxBudgetCAD} CAD
- Travel Mode: ${criteria.travelMode}
- Priorities: ${criteria.priorities?.join(", ") || "None"}
- Activities: ${criteria.activities?.join(", ") || "None"}
- Pace: ${criteria.pace}

CRITICAL SEASONAL INTELLIGENCE:
This trip takes place in ${seasonalContext.season}. You MUST adhere to these exact constraints and closures when recommending activities:
${seasonalContext.closuresAndConstraints.map(c => `- ${c}`).join("\n")}
Explain your overarching seasonal strategy in the "seasonalIntelligence" field.

CRITICAL WEATHER INTELLIGENCE:
You must adapt the itinerary based on this weather forecast:
${JSON.stringify(weatherForecast, null, 2)}
Example: If there is heavy rain in the afternoon, schedule indoor activities (like Cave and Basin or Hot Springs) for the afternoon, and move outdoor hikes to the sunny morning. 
Explain your reasoning in the "weatherIntelligence" field for each day.

Please generate a highly personalized, day-by-day itinerary.
CRITICAL: You must return ONLY a raw JSON object matching the exact schema requested below.
Every activity must have a "type", "time", "durationMinutes", "estimatedCost", "costConfidence", "reservationRequired", "reservationStatus", "description".
The output must be valid JSON, strictly matching:
{
  "summary": "...",
  "bestBase": "Banff" | "Canmore" | "Lake Louise",
  "bestBaseReason": "...",
  "seasonalIntelligence": {
    "season": "Winter" | "Spring" | "Summer" | "Fall",
    "aiStrategy": "Because this is a Winter trip, Moraine Lake is closed. I have substituted it with a snowshoeing tour..."
  },
  "estimatedBudget": { "accommodation": 0, "activities": 0, "food": 0, "transportation": 0, "parkPasses": 0 },
  "dailyItinerary": [
    {
      "dayNumber": 1,
      "date": "2026-08-10",
      "theme": "Arrival",
      "weatherIntelligence": {
         "forecastSummary": "18°C, Sunny morning, Rain after 4 PM",
         "aiRecommendation": "Moved Banff Gondola to the morning to avoid PM showers."
      },
      "morning": [{ "title": "...", "type": "ai_recommendation", "time": "9:00 AM", "durationMinutes": 120, "estimatedCost": 0, "costConfidence": "estimated", "reservationRequired": false, "reservationStatus": "no_reservation_needed", "description": "..." }],
      "afternoon": [...],
      "evening": [...]
    }
  ]
}
`;

    // Attempt 1
    let chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: basePrompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    let rawJson = sanitizeJsonString(chatCompletion.choices[0]?.message?.content || "{}");
    let parsed: any;
    let validatedData: any;
    let isValid = false;

    try {
      parsed = JSON.parse(rawJson);
      validatedData = ItineraryResponseSchema.parse(parsed);
      isValid = true;
    } catch (e) {
      // Attempt 2: Repair Prompt
      const repairPrompt = `
The previous JSON you generated failed schema validation. 
Error details: ${e instanceof Error ? e.message : String(e)}

Please fix the structural errors and return a perfectly valid JSON object matching the requested schema. Ensure the morning, afternoon, and evening properties are arrays of objects, NOT strings!
`;
      chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "user", content: basePrompt },
          { role: "assistant", content: rawJson },
          { role: "user", content: repairPrompt }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.3, // Lower temp for repair
        response_format: { type: "json_object" },
      });

      rawJson = sanitizeJsonString(chatCompletion.choices[0]?.message?.content || "{}");
      try {
        parsed = JSON.parse(rawJson);
        validatedData = ItineraryResponseSchema.parse(parsed);
        isValid = true;
      } catch (finalError) {
        // Double failure
        const errResp: ItineraryApiResponse = {
          success: false,
          error: { code: "AI_SCHEMA_FAILURE", message: "Failed to generate valid itinerary structure after repair.", requestId: `req_${Date.now()}` }
        };
        return NextResponse.json(errResp, { status: 500 });
      }
    }

    // Business Rule Validation
    if (isValid && validatedData) {
      // Rule 1: Check date bounds
      const dIn = new Date(criteria.checkIn).getTime();
      const dOut = new Date(criteria.checkOut).getTime();
      const tripDays = Math.max(1, Math.ceil((dOut - dIn) / (1000 * 3600 * 24))) + 1; // inclusive of start and end day conceptually depending on time

      for (const day of validatedData.dailyItinerary) {
        const dayTime = new Date(day.date).getTime();
        // If the AI generated a date way outside the bounds (allowing a 1 day buffer for timezones)
        if (dayTime < dIn - 86400000 || dayTime > dOut + 86400000) {
           const errResp: ItineraryApiResponse = {
             success: false,
             error: { code: "AI_BUSINESS_RULE_FAILURE", message: `Generated date ${day.date} falls outside trip bounds.`, requestId: `req_${Date.now()}` }
           };
           return NextResponse.json(errResp, { status: 500 });
        }
      }
    }

    const successResp: ItineraryApiResponse = {
      success: true,
      data: validatedData,
      generatedAt: new Date().toISOString(),
      requestId: `req_${Date.now()}`
    };

    return NextResponse.json(successResp);
  } catch (error: any) {
    console.error("Groq API Error:", error);
    const errResp: ItineraryApiResponse = {
      success: false,
      error: { code: "INTERNAL_ERROR", message: error.message || "Failed to generate itinerary", requestId: `req_${Date.now()}` }
    };
    return NextResponse.json(errResp, { status: 500 });
  }
}
