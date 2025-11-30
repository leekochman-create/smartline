import { NextResponse } from "next/server";
import { supabaseServer } from "../../../utils/supabaseServer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { place_id } = body;

    if (!place_id) {
      return NextResponse.json(
        { error: "place_id is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("busy")
      .select("*")
      .eq("place_id", place_id)
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ prediction: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
