// app/api/cameras/cron/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export async function GET() {
  // get all cameras
  const { data: cameras } = await supabase.from("israel_cameras").select("*");
  if (!cameras) return NextResponse.json({ error: "NO CAMERAS" });

  for (const cam of cameras) {
    const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "/api/cameras/analyze", {
      method: "POST",
      body: JSON.stringify({ imageUrl: cam.snapshot }),
    });

    const json = await res.json();

    const people = json.people || 0;

    await supabase
      .from("busy")
      .upsert({
        camera_id: cam.id,
        people,
        updated_at: new Date().toISOString(),
      });
  }

  return NextResponse.json({ ok: true });
}
