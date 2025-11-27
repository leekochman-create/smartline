import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { name, address, lat, lng } = await req.json();

  const { error } = await supabase.from("businesses").insert({
    name,
    address,
    lat,
    lng,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
