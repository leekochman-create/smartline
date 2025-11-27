import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q");
  const id = url.searchParams.get("id");

  // get by ID
  if (id) {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", id)
      .single();

    return NextResponse.json(data || null);
  }

  // search by query
  if (q) {
    const { data } = await supabase
      .from("businesses")
      .select("*")
      .ilike("name", `%${q}%`);

    return NextResponse.json(data || []);
  }

  // return ALL businesses
  const { data } = await supabase.from("businesses").select("*");
  return NextResponse.json(data || []);
}
