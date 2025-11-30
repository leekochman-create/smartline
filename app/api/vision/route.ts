import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs"; // מאפשר Buffer ו-File מלא

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY!,
});

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // מודל רואה תמונות
      messages: [
        {
          role: "user",
          content: [
            {
              type: "input_image",
              image_url: `data:image/jpeg;base64,${base64Image}`,
            },
            {
              type: "text",
              text: "Analyze this image in detail.",
            },
          ],
        },
      ],
    });

    return NextResponse.json({
      result: response.choices[0].message.content,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
