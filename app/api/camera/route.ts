import { NextResponse } from "next/server";

export async function POST(req) {
  const { url } = await req.json();

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return NextResponse.json({ image: base64 });
  } catch (e) {
    return NextResponse.json({ error: true });
  }
}
