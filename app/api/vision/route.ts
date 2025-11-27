import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function POST(req) {
  const { image } = await req.json();

  const res = await client.responses.create({
    model: "gpt-4.1",
    input: [
      {
        type: "input_image",
        image_url: `data:image/jpeg;base64,${image}`
      },
      {
        type: "text",
        text: "ספר כמה אנשים בתור וכמה קופות פעילות. החזר JSON בלבד."
      }
    ]
  });

  return NextResponse.json(JSON.parse(res.output_text));
}
