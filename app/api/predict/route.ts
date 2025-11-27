import { NextResponse } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase";

const ai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function POST(req: Request) {
  const { businessId } = await req.json();

  const { data: reports } = await supabase
    .from("crowd_reports")
    .select("*")
    .eq("business_id", businessId)
    .order("created_at", { ascending: true });

  const res = await ai.responses.create({
    model: "gpt-4.1",
    input: `
      נתוני עומס היסטוריים:
      ${JSON.stringify(reports)}

      צור תחזית לפי שעות:
      [{"hour": 10, "predicted_wait": 5}]
    `
  });

  return NextResponse.json(JSON.parse(res.output_text));
}
