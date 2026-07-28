import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { shareId: string } }
) {
  try {
    const { shareId } = params;

    if (!shareId || typeof shareId !== "string") {
      return NextResponse.json({ error: "Invalid share ID format" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // 1. Fetch the share record
    const { data: shareRow, error: shareErr } = await supabase
      .from("trip_shares")
      .select("trip_id, visibility, expires_at, is_active, password_hash")
      .eq("share_id", shareId)
      .single();

    if (shareErr || !shareRow) {
      return NextResponse.json({ error: "Trip not found or link invalid" }, { status: 404 });
    }

    // 2. Validate share constraints
    if (!shareRow.is_active) {
      return NextResponse.json({ error: "This shared trip is no longer available. Ask the trip organizer for a new NexoraGo link." }, { status: 410 }); // 410 Gone
    }

    if (shareRow.expires_at && new Date(shareRow.expires_at) < new Date()) {
      return NextResponse.json({ error: "This shared trip link has expired." }, { status: 410 });
    }

    if (shareRow.visibility === "private") {
      return NextResponse.json({ error: "This trip is private." }, { status: 403 });
    }

    // Check if password protected (minimal implementation - just block if password required and none provided)
    if (shareRow.visibility === "password") {
      // Typically, you'd check a secure cookie or auth header here.
      // For this MVP, if it's password protected and we just do a GET, return 401.
      return NextResponse.json({ error: "Password required", requirePassword: true }, { status: 401 });
    }

    // 3. Fetch the Trip data (safely projecting only public fields)
    const { data: tripRow, error: tripErr } = await supabase
      .from("trips")
      .select(`
        title, 
        destination_summary, 
        check_in, 
        check_out, 
        adults, 
        children, 
        itinerary_data, 
        budget_data, 
        hotel_data, 
        advisory_data,
        updated_at
      `)
      .eq("id", shareRow.trip_id)
      .single();

    if (tripErr || !tripRow) {
      return NextResponse.json({ error: "Trip data could not be retrieved" }, { status: 500 });
    }

    // 4. Update view count in background (don't await to block response)
    supabase.rpc('increment_view_count', { row_id: shareId }).catch(() => {
      // fallback if RPC doesn't exist
      supabase
        .from("trip_shares")
        .update({ last_viewed_at: new Date().toISOString() })
        .eq("share_id", shareId)
        .then();
    });

    // 5. Return public projection
    return NextResponse.json({
      success: true,
      data: {
        shareId: shareId,
        title: tripRow.title,
        destinationSummary: tripRow.destination_summary,
        checkIn: tripRow.check_in,
        checkOut: tripRow.check_out,
        adults: tripRow.adults,
        children: tripRow.children,
        itineraryData: tripRow.itinerary_data,
        budgetData: tripRow.budget_data,
        hotelData: tripRow.hotel_data,
        advisoryData: tripRow.advisory_data,
        updatedAt: tripRow.updated_at
      }
    });

  } catch (err: any) {
    console.error("GET /api/public/trips error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
