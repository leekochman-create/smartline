import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer"; // ← זה מה שקיים אצלך

export async function GET() {
  const { data, error } = await supabaseServer
    .from("busy")
    .select("*");

  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
}
