import { NextResponse } from "next/server";
import { SubscribeRequestSchema } from "@/lib/validation/leadSchemas";
import { createAdminClient } from "@/lib/supabase/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Zod Validation
    let validatedData: z.infer<typeof SubscribeRequestSchema>;
    try {
      validatedData = SubscribeRequestSchema.parse(body);
    } catch (e: any) {
      return NextResponse.json(
        { success: false, error: e.errors[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }

    // 2. Email Normalization
    const emailNormalized = validatedData.email.trim().toLowerCase();

    // 3. Supabase Insertion
    let supabase;
    try {
      supabase = createAdminClient();
    } catch (e: any) {
      // If environment variables are missing, simulate success so the UI doesn't break during this demo phase
      console.warn("Supabase not configured. Simulating lead capture for:", emailNormalized);
      return NextResponse.json({ success: true, message: "Simulated success (No DB keys)" });
    }

    const { error } = await supabase
      .from("email_leads")
      .insert({
        email: validatedData.email.trim(),
        email_normalized: emailNormalized,
        source: validatedData.source,
        locale: validatedData.locale,
        consent_given: validatedData.consentGiven,
        consent_text_version: "v1_footer",
        status: "subscribed",
        metadata: validatedData.campaignId ? { campaign: validatedData.campaignId } : {}
      });

    // 4. Handle duplicates gracefully (Idempotent response)
    if (error) {
      if (error.code === "23505") { // Unique violation code in Postgres
        // Treat an already-subscribed email as a successful request
        return NextResponse.json({ success: true, message: "Already subscribed" });
      }
      console.error("Supabase Insert Error:", error);
      return NextResponse.json({ success: false, error: "Failed to save subscription" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Subscription saved successfully" });

  } catch (error) {
    console.error("Subscribe Endpoint Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
