import { NextResponse } from "next/server";
import cheerio from "cheerio";

export async function GET(req) {
  const place = new URL(req.url).searchParams.get("place");
  const html = await (await fetch(`https://www.google.com/search?q=${place}`)).text();
  const $ = cheerio.load(html);

  const script = $('script:contains("var tdd")').html();
  if (!script) return NextResponse.json({ busy: null });

  const match = script.match(/data:([^\]]+\])/);
  const data = JSON.parse(match[1]);

  const now = new Date();
  const activity = data[now.getDay()][now.getHours()];

  return NextResponse.json({ busy: activity });
}
