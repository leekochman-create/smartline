// app/api/cameras/analyze/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { imageUrl } = await req.json();

  if (!imageUrl) {
    return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    // Fetch the image bytes
    const img = await fetch(imageUrl);
    const buffer = Buffer.from(await img.arrayBuffer());

    // Send image to GPT-4o-mini vision
    const result = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Count people in this image. Respond with a number only." },
            {
              type: "image_url",
              image_url: `data:image/jpeg;base64,${buffer.toString("base64")}`
            }
          ]
        }
      ]
    });

    const answer = result.choices[0].message?.content || "0";
    const people = parseInt(answer.replace(/\D/g, "")) || 0;

    return NextResponse.json({ people });
  } catch (err) {
    console.error("Vision error:", err);
    return NextResponse.json({ error: "Vision AI failed" }, { status: 500 });
  }
}
