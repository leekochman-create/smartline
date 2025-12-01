import { NextResponse } from "next/server";
import cameras from "@/app/data/israel_cameras.json";

export async function GET() {
  return NextResponse.json({
    cameras
  });
}
