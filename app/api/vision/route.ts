import { NextResponse } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase";

const ai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());

  const vision = await ai.images.generate({
    model: "gpt-image-1",
    prompt: "Analyze this image",
    image: buffer,
  });

  return NextResponse.json({ result: vision.data });
}
