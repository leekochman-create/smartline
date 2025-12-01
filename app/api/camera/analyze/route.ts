import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

  const { data: cam } = await supabase
    .from("camera_sources")
    .select("*")
    .eq("id", cameraId)
    .single();

  if (!cam) {
    return NextResponse.json({ error: "Camera not found" }, { status: 404 });
  }

  // 1️⃣ Fetch frame
  const frame = await fetch(cam.camera_url);
  const buffer = Buffer.from(await frame.arrayBuffer());

  // 2️⃣ Analyze with OpenAI Vision
  const ai = await openai.images.generate({
    model: "gpt-image-1",
    prompt: "Count the number of people and estimate crowd density from this image.",
    image: buffer.toString("base64"),
  });

  const json = JSON.parse(ai.data[0].b64_json);

  const busy_level = Math.min(10, Math.max(1, Math.ceil(json.people / 5)));

  // 3️⃣ Update busy table
  await supabase.from("busy").upsert({
    place_id: cam.place_id,
    busy_level,
    lat: cam.lat,
    lng: cam.lng,
    updated_at: new Date().toISOString(),
  });

  return NextResponse.json({
    people: json.people,
    busy_level,
  });
}
