import { NextResponse } from "next/server";
import { supabaseServer } from "../../../utils/supabaseServer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { place_id, level } = body;

    if (!place_id || level === undefined) {
      return NextResponse.json(
        { error: "place_id and level are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("busy")
      .insert({
        place_id,
        level,
        timestamp: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ report: data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
