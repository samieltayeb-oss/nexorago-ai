import { z } from "zod";

export const SubscribeRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).max(255),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: "You must provide consent to receive emails.",
  }),
  source: z.string().default("footer"),
  locale: z.string().default("en"),
  campaignId: z.string().optional(),
  botToken: z.string().optional(), // Prepared for Turnstile
}).strict();

export type SubscribeRequest = z.infer<typeof SubscribeRequestSchema>;
