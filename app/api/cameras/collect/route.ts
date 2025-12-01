import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const sources = [
    "https://www.skylinewebcams.com/", 
    "https://www.windy.com/webcams",
    "https://www.earthcam.com/",
    "https://www.places.co.il/camera"
  ];

  // NOTE: זה דמו בסיסי.
  // אחרי האישור שלך אני מוסיף Scraping אמיתי עם HTML Parsing.

  const demoCameras = [
    {
      name: "Tel Aviv - Frishman Beach",
      lat: 32.0809,
      lng: 34.7680,
      camera_url: "https://www.places.co.il/camera/tel-aviv-frishman",
      category: "beach",
      city: "Tel Aviv",
      country: "Israel",
      source: "IsraelCams"
    },
    {
      name: "New York - Times Square",
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
    },
  ];

  for (const cam of demoCameras) {
    await supabase.from("global_cameras").upsert(cam);
  }

  return NextResponse.json({ added: demoCameras.length });
}
