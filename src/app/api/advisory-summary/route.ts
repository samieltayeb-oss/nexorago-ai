import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { AdvisorySummarySchema, AdvisoryApiResponse } from "@/lib/schemas/aiSchemas";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "dummy-key-to-prevent-build-error",
});

function sanitizeJsonString(raw: string): string {
  let clean = raw.trim();
  if (clean.startsWith("```json")) clean = clean.replace(/^```json\n?/, "");
  if (clean.startsWith("```")) clean = clean.replace(/^```\n?/, "");
  if (clean.endsWith("```")) clean = clean.replace(/```$/, "");
  return clean.trim();
}

export async function POST(req: Request) {
  try {
    const { advisories } = await req.json();
    
    if (!advisories || advisories.length === 0) {
      // Deterministic empty state (per user requirements)
      const emptyResp: AdvisoryApiResponse = {
        success: true,
        data: {
          title: "No Active Safety Alerts",
          severity: "info",
          bullets: [
            "All primary roads and trails are operating normally.",
            "Standard wildlife precautions apply throughout the park.",
            "Check local weather forecasts before your daily excursions."
          ],
          generatedAt: new Date().toISOString(),
          disclaimer: "These conditions represent the absence of major verified advisories at this time.",
          referencedAdvisoryIds: []
        },
        generatedAt: new Date().toISOString(),
        requestId: `req_${Date.now()}`
      };
      return NextResponse.json(emptyResp);
    }

    const advisoryIds = advisories.map((a: any) => a.id);

    const basePrompt = `
You are Nexora, a world-class luxury AI concierge for the Canadian Rockies.
The user is looking at the following active safety and travel advisories for their trip:

${JSON.stringify(advisories, null, 2)}

Please generate a quick, 3-bullet "Executive Safety Summary" that highlights the most critical information.
You MUST summarize ONLY the advisories provided above. Do not invent new closures.

Return ONLY a raw JSON object strictly matching this exact schema:
{
  "title": "...",
  "severity": "critical" | "warning" | "info",
  "bullets": [ "bullet 1", "bullet 2", "bullet 3" ],
  "generatedAt": "${new Date().toISOString()}",
  "disclaimer": "...",
  "referencedAdvisoryIds": ${JSON.stringify(advisoryIds)}
}
`;

    // Attempt 1
    let chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: basePrompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3, // Low temp to prevent hallucinating extra rules
      response_format: { type: "json_object" },
    });

    let rawJson = sanitizeJsonString(chatCompletion.choices[0]?.message?.content || "{}");
    let parsed: any;
    let validatedData: any;

    try {
      parsed = JSON.parse(rawJson);
      validatedData = AdvisorySummarySchema.parse(parsed);
    } catch (e) {
      // Attempt 2: Repair Prompt
      const repairPrompt = `
The previous JSON you generated failed schema validation. 
Error details: ${e instanceof Error ? e.message : String(e)}

Please fix the structural errors and return a perfectly valid JSON object matching the requested schema. Ensure exactly 3 bullets.
`;
      chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "user", content: basePrompt },
          { role: "assistant", content: rawJson },
          { role: "user", content: repairPrompt }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.1,
        response_format: { type: "json_object" },
      });

      rawJson = sanitizeJsonString(chatCompletion.choices[0]?.message?.content || "{}");
      try {
        parsed = JSON.parse(rawJson);
        validatedData = AdvisorySummarySchema.parse(parsed);
      } catch (finalError) {
        const errResp: AdvisoryApiResponse = {
          success: false,
          error: { code: "AI_SCHEMA_FAILURE", message: "Failed to generate valid advisory summary.", requestId: `req_${Date.now()}` }
        };
        return NextResponse.json(errResp, { status: 500 });
      }
    }

    const successResp: AdvisoryApiResponse = {
      success: true,
      data: validatedData,
      generatedAt: new Date().toISOString(),
      requestId: `req_${Date.now()}`
    };

    return NextResponse.json(successResp);
  } catch (error: any) {
    console.error("Groq API Error:", error);
    const errResp: AdvisoryApiResponse = {
      success: false,
      error: { code: "INTERNAL_ERROR", message: error.message || "Failed to generate summary", requestId: `req_${Date.now()}` }
    };
    return NextResponse.json(errResp, { status: 500 });
  }
}
