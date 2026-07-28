import { z } from "zod";

// --- Enums & Classifications ---
export const BaseTownSchema = z.enum(["Banff", "Canmore", "Lake Louise"]);

export const ConfidenceSchema = z.enum([
  "live_verified",
  "recent",
  "estimated",
  "provider_confirmation_required",
  "unknown"
]);

export const SourceTypeSchema = z.enum([
  "official_advisory",
  "verified_fact",
  "estimated_value",
  "ai_recommendation",
  "user_preference"
]);

// --- Budget Schema ---
export const BudgetCategorySchema = z.object({
  accommodation: z.number().min(0),
  activities: z.number().min(0),
  food: z.number().min(0),
  transportation: z.number().min(0).optional(), // Shuttle/Gas
  parkPasses: z.number().min(0).optional()
}).strict();

// --- Daily Itinerary Items ---
export const ItineraryActivitySchema = z.object({
  title: z.string().min(1),
  type: SourceTypeSchema,
  time: z.string().min(1), // e.g. "8:00 AM"
  durationMinutes: z.number().int().min(0),
  estimatedCost: z.number().min(0),
  costConfidence: ConfidenceSchema,
  reservationRequired: z.boolean(),
  reservationStatus: z.enum(["user_must_confirm", "no_reservation_needed"]),
  warning: z.string().optional(),
  description: z.string().min(1)
}).strict();

export const ItineraryDaySchema = z.object({
  dayNumber: z.number().int().min(1),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  theme: z.string().min(1),
  weatherIntelligence: z.object({
    forecastSummary: z.string(), // e.g. "18°C, Sunny morning, Rain after 4 PM"
    aiRecommendation: z.string() // e.g. "Moved Banff Gondola to Sunday due to PM showers."
  }).strict(),
  morning: z.array(ItineraryActivitySchema).min(1),
  afternoon: z.array(ItineraryActivitySchema).min(1),
  evening: z.array(ItineraryActivitySchema).min(1)
}).strict();

// --- Final Itinerary Response Schema ---
export const ItineraryResponseSchema = z.object({
  summary: z.string().min(10),
  bestBase: BaseTownSchema,
  bestBaseReason: z.string().min(10),
  seasonalIntelligence: z.object({
    season: z.enum(["Winter", "Spring", "Summer", "Fall"]),
    aiStrategy: z.string()
  }).strict(),
  estimatedBudget: BudgetCategorySchema,
  dailyItinerary: z.array(ItineraryDaySchema).min(1)
}).strict();

export type ValidatedItinerary = z.infer<typeof ItineraryResponseSchema>;

// --- Advisory Summary Schema ---
export const AdvisorySummarySchema = z.object({
  title: z.string().min(5),
  severity: z.enum(["critical", "warning", "info"]),
  bullets: z.array(z.string().min(10)).length(3, { message: "Must have exactly 3 bullets" }),
  generatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  disclaimer: z.string().min(10),
  referencedAdvisoryIds: z.array(z.string())
}).strict();

export type ValidatedAdvisorySummary = z.infer<typeof AdvisorySummarySchema>;

// --- Safe API Response Types ---
export type ItineraryApiResponse =
  | {
      success: true;
      data: ValidatedItinerary;
      generatedAt: string;
      requestId: string;
    }
  | {
      success: false;
      error: {
        code:
          | "INVALID_INPUT"
          | "AI_TIMEOUT"
          | "AI_INVALID_JSON"
          | "AI_SCHEMA_FAILURE"
          | "AI_BUSINESS_RULE_FAILURE"
          | "RATE_LIMITED"
          | "INTERNAL_ERROR";
        message: string;
        requestId: string;
      };
    };

export type AdvisoryApiResponse = 
  | {
      success: true;
      data: ValidatedAdvisorySummary;
      generatedAt: string;
      requestId: string;
    }
  | {
      success: false;
      error: {
        code: string;
        message: string;
        requestId: string;
      };
    };
