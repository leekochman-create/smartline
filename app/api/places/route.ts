import { NextResponse } from "next/server";
import { supabaseServer } from "../../../utils/supabaseServer";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("places")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ places: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
