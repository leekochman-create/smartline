import { NextResponse } from "next/server";
import { supabaseServer } from "../../../utils/supabaseServer";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("busy")
    .select("*");

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ busy: data });
}
