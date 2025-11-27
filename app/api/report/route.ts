import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  const body = await req.json();

  await supabase.from("crowd_reports").insert({
    business_id: body.businessId,
    people: body.people,
    registers: body.registers
  });

  return NextResponse.json({ ok: true });
}
