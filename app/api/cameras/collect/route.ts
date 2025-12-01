import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// DEMO INITIAL CAMERAS (WILL BE REPLACED BY SCRAPERS)
const initialCameras = [
  {
    name: "Frishman Beach - Tel Aviv",
    lat: 32.0809,
    lng: 34.7680,
    camera_url: "https://www.places.co.il/camera/tel-aviv-frishman",
    category: "beach",
    city: "Tel Aviv",
    country: "Israel",
    source: "IsraelCams"
  },
  {
    name: "Times Square - New York",
    lat: 40.7580,
    lng: -73.9855,
    camera_url: "https://www.earthcam.com/usa/newyork/timessquare/",
    category: "city",
    city: "New York",
    country: "USA",
    source: "EarthCam"
  },
  {
    name: "Amsterdam Dam Square",
    lat: 52.3731,
    lng: 4.8922,
    camera_url: "https://www.skylinewebcams.com/en/webcam/paesi-bassi/noord-holland/amsterdam/dam-square.html",
    category: "city",
    city: "Amsterdam",
    country: "Netherlands",
    source: "Skyline"
  }
];

export async function GET() {
  // Insert demo cameras
  for (const cam of initialCameras) {
    await supabase.from("global_cameras").upsert(cam);
  }

  return NextResponse.json({
    status: "ok",
    inserted: initialCameras.length
  });
}
