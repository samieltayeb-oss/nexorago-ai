import { z } from "zod";

// Zod Schema for the Trip Snapshot we save to the DB
export const TripSnapshotSchema = z.object({
  title: z.string().min(1),
  destinationSummary: z.string().optional(),
  checkIn: z.string().optional(), // YYYY-MM-DD
  checkOut: z.string().optional(),
  adults: z.number().int().min(1),
  children: z.number().int().min(0),
  // Strict mapping of data types
  tripData: z.record(z.any()).default({}), // e.g., raw search criteria
  itineraryData: z.record(z.any()).optional(), // AI validated itinerary
  budgetData: z.record(z.any()).optional(),
  hotelData: z.record(z.any()).optional(),
  advisoryData: z.record(z.any()).optional(),
});

export type TripSnapshotInput = z.infer<typeof TripSnapshotSchema>;

// Request body for generating a share link
export const CreateShareRequestSchema = z.object({
  visibility: z.enum(["private", "link", "password"]).default("link"),
  password: z.string().min(8).optional(),
  expiresInDays: z.number().int().min(1).max(365).optional()
});

// Response projection for public consumption (No owner data, no internal PKs)
export const PublicTripProjectionSchema = z.object({
  shareId: z.string(),
  title: z.string(),
  destinationSummary: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  adults: z.number(),
  children: z.number(),
  itineraryData: z.record(z.any()).optional(),
  budgetData: z.record(z.any()).optional(),
  hotelData: z.record(z.any()).optional(),
  advisoryData: z.record(z.any()).optional(),
  updatedAt: z.string()
});
