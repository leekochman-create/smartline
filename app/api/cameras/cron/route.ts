// app/api/cameras/cron/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Load camera list
    const { data: cameras, error } = await supabaseServer
      .from("israel_cameras")
      .select("*");

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!cameras) {
      return NextResponse.json({ error: "NO CAMERAS" }, { status: 400 });
    }

    // Analyze each camera
    for (const cam of cameras) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cameras/analyze`, {
        method: "POST",
        body: JSON.stringify({ imageUrl: cam.snapshot }),
      });

      const json = await res.json();
      const people = json.people || 0;

      // Update table
      await supabaseServer.from("busy").upsert({
        camera_id: cam.id,
        people,
        updated_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CRON ERROR:", err);
    return NextResponse.json({ error: "Cron failed" }, { status: 500 });
  }
}
