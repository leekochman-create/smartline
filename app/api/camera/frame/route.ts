import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cameraId = searchParams.get("id");

  if (!cameraId) {
    return NextResponse.json({ error: "Missing camera id" }, { status: 400 });
  }

  // Load camera source
  const { data: cam } = await supabase
    .from("camera_sources")
    .select("*")
    .eq("id", cameraId)
    .single();

  if (!cam) {
    return NextResponse.json({ error: "Camera not found" }, { status: 404 });
  }

  // Grab frame from the camera (doesn't matter if it's MJPEG, HTTP snapshot, etc.)
  const frame = await fetch(cam.camera_url);
  const blob = await frame.blob();

  return new NextResponse(blob, {
    headers: { "Content-Type": "image/jpeg" },
  });
}
