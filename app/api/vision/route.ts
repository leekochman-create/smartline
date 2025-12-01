import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: body.prompt,
    });

    return NextResponse.json({ result: response.output_text });
  } catch (error: any) {
    console.error("Vision API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process vision request" },
      { status: 500 }
    );
  }
}
