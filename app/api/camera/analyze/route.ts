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

  // Fetch camera info
  const { data: cam } = await supabase
    .from("global_cameras")
    .select("*")
    .eq("id", cameraId)
    .single();

  if (!cam) {
    return NextResponse.json({ error: "Camera not found" }, { status: 404 });
  }

  // Fetch frame
  const frameRes = await fetch(cam.camera_url);
  const buffer = Buffer.from(await frameRes.arrayBuffer());

  // OpenAI Vision — correct format
  const result = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Count the number of people in this image." },
          {
            type: "input_image",
            image_url: `data:image/jpeg;base64,${buffer.toString("base64")}`,
          },
        ],
      },
    ],
  });

  // Parse result
  const responseText = result.choices[0].message.content || "0";
  const peopleCount = parseInt(responseText.replace(/\D/g, "")) || 0;

  const busyLevel = Math.min(10, Math.max(0, Math.ceil(peopleCount / 5)));

  // Save to Supabase
  await supabase.from("busy_global").upsert({
    camera_id: cam.id,
    people_count: peopleCount,
    busy_level: busyLevel,
    updated_at: new Date().toISOString(),
  });

  return NextResponse.json({
    camera: cam.name,
    people: peopleCount,
    busy_level: busyLevel,
  });
}
