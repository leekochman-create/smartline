import { supabase } from "../../../lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from("places").insert(body);

  if (error) return NextResponse.json({ error });
  return NextResponse.json(data);
}
