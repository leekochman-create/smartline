import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
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
    .from("global_cameras")
    .select("*")
    .eq("id", cameraId)
    .single();

  if (!cam) {
    return NextResponse.json({ error: "Camera not found" }, { status: 404 });
  }

  const frame = await fetch(cam.camera_url);
  const buffer = Buffer.from(await frame.arrayBuffer());

  const base64Image = buffer.toString("base64");

  // NEW CORRECT OPENAI FORMAT
  const result = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Count the number of people in this image. Respond with a number only.",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
  });

  const raw = result.choices[0].message.content || "0";
  const number = parseInt(raw.replace(/\D/g, "")) || 0;

  const busy = Math.min(10, Math.max(1, Math.ceil(number / 5)));

  await supabase.from("busy_global").upsert({
    camera_id: cam.id,
    people_count: number,
    busy_level: busy,
    updated_at: new Date().toISOString(),
  });

  return NextResponse.json({
    camera: cam.name,
    people: number,
    busy_level: busy,
  });
}
