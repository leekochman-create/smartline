import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// ---- Reverse Geocoding via Google Maps ----
async function geocodeLocation(name: string) {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      name
    )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

    const res = await fetch(url);
    const json = await res.json();

    if (json.results?.length > 0) {
      const loc = json.results[0].geometry.location;
      return { lat: loc.lat, lng: loc.lng };
    }
  } catch (err) {
    console.log("Geocoding failed:", err);
  }
  return { lat: null, lng: null };
}

// ---- AI Location Guess ----
async function guessLocationAI(cameraName: string) {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Camera name: "${cameraName}". 
          Guess the city in Israel where this camera is located. Respond with only the city name.`,
        },
      ],
    });

    const city = res.choices[0].message.content?.trim() || null;
    if (!city) return null;

    return await geocodeLocation(city + ", Israel");
  } catch (err) {
    return null;
  }
}

export async function GET() {
  try {
    const cameraList: any[] = [];

    // -------- 1. Fetch Insecam --------
    const insecamRes = await fetch("https://www.insecam.org/en/bycountry/IL/");
    const html = await insecamRes.text();
    const regex = /http:\/\/\d+\.\d+\.\d+\.\d+:\d+/g;
    const matches = html.match(regex) || [];

    for (const url of matches) {
      cameraList.push({
        name: "Israeli Public Camera",
        url,
        lat: null,
        lng: null,
      });
    }

    // -------- 2. Fetch IPCams --------
    const ipcamsRes = await fetch("https://api.ipcams.com/public/cameras");
    const ipcams = await ipcamsRes.json();

    for (const cam of ipcams) {
      if (cam.country?.toLowerCase() === "israel") {
        cameraList.push({
          name: cam.title || "Israel Camera",
          url: cam.stream,
          lat: cam.latitude || null,
          lng: cam.longitude || null,
        });
      }
    }

    // -------- 3. Add AI Location for cameras with missing lat/lng --------
    for (const cam of cameraList) {
      if (!cam.lat || !cam.lng) {
        const aiLoc = await guessLocationAI(cam.name);
        if (aiLoc?.lat && aiLoc?.lng) {
          cam.lat = aiLoc.lat;
          cam.lng = aiLoc.lng;
        }
      }
    }

    // -------- 4. Remove invalid URLs --------
    const clean = cameraList.filter((c) => c.url && c.url.length > 5);

    // -------- 5. Save to Supabase --------
    await supabase.from("israel_cameras").delete().neq("id", 0);
    const { error } = await supabase.from("israel_cameras").insert(clean);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      found: clean.length,
      message: "Israel cameras synced with automatic geolocation!",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
