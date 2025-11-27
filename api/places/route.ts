import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q");
  const id = url.searchParams.get("id");

  if (id) {
    const { data } = await supabase.from("businesses").select("*").eq("id", id).single();
    return NextResponse.json(data);
  }

  const { data } = await supabase
    .from("businesses")
    .select("*")
    .ilike("name", `%${q}%`);

  return NextResponse.json(data);
}
