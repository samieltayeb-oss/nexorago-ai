import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/server";
import { TripSnapshotSchema } from "@/lib/schemas/shareSchemas";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = TripSnapshotSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid trip snapshot data" }, { status: 400 });
    }

    const data = parseResult.data;
    
    // We use the admin client since auth is not fully implemented yet in the UI
    // In the future, we'd use the authenticated client and insert with owner_id = auth.uid()
    const supabase = createAdminClient();

    // Insert trip
    const { data: tripRow, error: tripErr } = await supabase
      .from("trips")
      .insert({
        title: data.title,
        destination_summary: data.destinationSummary || "",
        check_in: data.checkIn || null,
        check_out: data.checkOut || null,
        adults: data.adults,
        children: data.children,
        trip_data: data.tripData,
        itinerary_data: data.itineraryData || {},
        budget_data: data.budgetData || {},
        hotel_data: data.hotelData || {},
        advisory_data: data.advisoryData || {}
      })
      .select("id")
      .single();

    if (tripErr || !tripRow) {
      console.error("Failed to insert trip:", tripErr);
      return NextResponse.json({ error: "Database error saving trip" }, { status: 500 });
    }

    // Immediately generate a secure share for this guest trip
    const shareId = randomBytes(12).toString("base64url");

    const { data: shareRow, error: shareErr } = await supabase
      .from("trip_shares")
      .insert({
        trip_id: tripRow.id,
        share_id: shareId,
        visibility: "link"
      })
      .select("share_id")
      .single();

    if (shareErr || !shareRow) {
      console.error("Failed to insert trip_share:", shareErr);
      return NextResponse.json({ error: "Database error creating share link" }, { status: 500 });
    }

    // Set an HttpOnly cookie to authorize this client to manage this specific trip/share.
    // For MVP, we'll store an array of owned trip IDs or just this one.
    // Using a signed JWT would be better, but storing a simple token in HttpOnly is secure enough against XSS for guest trips.
    const cookieStore = cookies();
    const guestTrips = cookieStore.get("nexorago_guest_trips")?.value || "[]";
    try {
      const parsed = JSON.parse(guestTrips);
      parsed.push(tripRow.id);
      cookieStore.set("nexorago_guest_trips", JSON.stringify(parsed), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
    } catch(e) {}

    return NextResponse.json({ 
      success: true, 
      tripId: tripRow.id, 
      shareId: shareRow.share_id 
    });

  } catch (err: any) {
    console.error("POST /api/trips error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
