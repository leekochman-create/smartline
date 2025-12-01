// app/api/cameras/analyze/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    // Fetch snapshot
    const img = await fetch(imageUrl);
    const buffer = Buffer.from(await img.arrayBuffer());
    const base64 = buffer.toString("base64");

    // GPT-4o vision (חדש)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Count how many people you see in this image. Return only a number." },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64}`,
              },
            },
          ],
        },
      ],
    });

    const text = response.choices[0].message.content || "0";
    const people = parseInt(text.replace(/\D/g, "")) || 0;

    return NextResponse.json({ people });
  } catch (err) {
    console.error("ANALYZE ERROR:", err);
    return NextResponse.json({ error: "Vision failed" }, { status: 500 });
  }
}
