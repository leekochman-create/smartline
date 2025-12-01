import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public/data/israel_cameras.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const cameras = JSON.parse(fileData);

    return NextResponse.json({ cameras });
  } catch (error) {
    console.error("Error loading cameras:", error);
    return NextResponse.json({ error: "Failed to load cameras" }, { status: 500 });
  }
}
