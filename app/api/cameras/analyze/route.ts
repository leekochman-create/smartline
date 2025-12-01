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
  const id = searchParams.get("id");

  const { data: cam } = await supabase
    .from("global_cameras")
    .select("*")
    .eq("id", id)
    .single();

  const frame = await fetch(cam.camera_url);
  const buffer = Buffer.from(await frame.arrayBuffer());

  const ai = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Count people in this image." },
          {
            type: "input_image",
            image_url: `data:image/jpeg;base64,${buffer.toString("base64")}`
          }
        ]
      }
    ]
  });

  const people = parseInt(ai.choices[0].message.content || "0");
  const level = Math.min(10, Math.max(0, Math.ceil(people / 5)));

  await supabase.from("busy_global").upsert({
    camera_id: cam.id,
    people_count: people,
    busy_level: level,
  });

  return NextResponse.json({ people, busy_level: level });
}
