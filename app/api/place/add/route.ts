import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../utils/supabaseServer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, address, lat, lng } = body;

    if (!name || !address || !lat || !lng) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("places")
      .insert({
        name,
        address,
        lat,
        lng,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ place: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
