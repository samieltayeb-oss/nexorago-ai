import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/server";

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { tripId: string } }
) {
  try {
    const { tripId } = params;

    if (!isOwner(tripId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { isActive } = body;

    if (typeof isActive !== "boolean") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { error: shareErr } = await supabase
      .from("trip_shares")
      .update({ is_active: isActive })
      .eq("trip_id", tripId);

    if (shareErr) {
      return NextResponse.json({ error: "Failed to update share status" }, { status: 500 });
    }

    return NextResponse.json({ success: true, isActive });

  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
