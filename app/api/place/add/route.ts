import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("businesses")
    .insert({
      name: body.name,
      category: body.category,
      lat: body.lat,
      lng: body.lng,
      address: body.address,
      google_query: body.googleQuery
    })
    .select("*");

  return NextResponse.json({ data, error });
}
