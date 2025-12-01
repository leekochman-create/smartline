// app/api/proxy/stream/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ⚠️ חשוב: מאפשר סטרימינג אמיתי
export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    // מוריד את הוידאו מהמצלמה האמיתית
    const stream = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!stream.ok) {
      return NextResponse.json(
        { error: "Camera unavailable", status: stream.status },
        { status: 500 }
      );
    }

    // מחזיר סטרימינג ישירות לדפדפן
    return new NextResponse(stream.body, {
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("Proxy Error:", err);
    return NextResponse.json(
      { error: err.message || "Proxy failed" },
      { status: 500 }
    );
  }
}
