import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { businessId, level } = await req.json();

  const { error } = await supabase.from("crowd_reports").insert({
    business_id: businessId,
    level,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
