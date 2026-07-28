import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/server";
import { randomBytes } from "crypto";

// Helper to check ownership MVP
function isOwner(tripId: string): boolean {
  const cookieStore = cookies();
  const guestTrips = cookieStore.get("nexorago_guest_trips")?.value || "[]";
  try {
    const parsed = JSON.parse(guestTrips);
    return parsed.includes(tripId);
  } catch(e) {
    return false;
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { tripId: string } }
) {
  try {
    const { tripId } = params;

    if (!isOwner(tripId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createAdminClient();

    // Generate new shareId
    const newShareId = randomBytes(12).toString("base64url");

    // Invalidate the old share (or we can just update the existing one)
    // The prompt says "Invalidate the previous link immediately" and "Return the new URL"
    // Since our trips to shares is 1-to-many logically (or 1-to-1 if we update), we can just UPDATE the existing share_id.
    const { data: shareRow, error: shareErr } = await supabase
      .from("trip_shares")
      .update({ share_id: newShareId, is_active: true })
      .eq("trip_id", tripId)
      .select("share_id")
      .single();

    if (shareErr || !shareRow) {
      return NextResponse.json({ error: "Failed to regenerate share" }, { status: 500 });
    }

    return NextResponse.json({ success: true, shareId: shareRow.share_id });

  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
