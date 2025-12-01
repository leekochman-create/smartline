// app/api/cameras/live/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const cameras = [
    // ---------- חופי ישראל ----------
    {
      name: "חוף גורדון - תל אביב",
      lat: 32.0863,
      lng: 34.7698,
      stream: "https://cdn-013.vid.yuki.live/akamai/GordonBeach/playlist.m3u8"
    },
    {
      name: "חוף פרישמן - תל אביב",
      lat: 32.0809,
      lng: 34.7683,
      stream: "https://cdn-013.vid.yuki.live/akamai/FrishmanBeach/playlist.m3u8"
    },
    {
      name: "חוף דלילה - אשקלון",
      lat: 31.6645,
      lng: 34.5609,
      stream: "https://cdn-013.vid.yuki.live/akamai/DaliaBeach/playlist.m3u8"
    },

    // ---------- Skyline ישראל ----------
    {
      name: "נמל תל אביב — לייב",
      lat: 32.1008,
      lng: 34.7763,
      stream:
        "https://hd-auth.skylinewebcams.com/live.m3u8?a=bnAtc2MtMSZoPVJyb3Z5dFZtUGRZcmJ4SmNtN3FmTnk5YkE9PQ=="
    },
    {
      name: "ראש הנקרה — לייב",
      lat: 33.0836,
      lng: 35.1043,
      stream:
        "https://hd-auth.skylinewebcams.com/live.m3u8?a=bj1yYXNoLW5pa2FyYSZoPWxiYXpNTG5VZ0lqVFQ0c1Zybm54bmc9PQ=="
    },
    {
      name: "אילת — הרים ומפרץ",
      lat: 29.55805,
      lng: 34.9482,
      stream:
        "https://hd-auth.skylinewebcams.com/live.m3u8?a=bj1laWxhdCZoPWtJbU5PYU4rM003RlZUR0MzRk5nPT0="
    },
    {
      name: "טיילת טבריה — הכנרת",
      lat: 32.7940,
      lng: 35.5322,
      stream:
        "https://hd-auth.skylinewebcams.com/live.m3u8?a=bj10aWJlcmllJmE9MTA5Jmg9ZEk3WjA5THVwUC8zM3dkZDNERkFEZz09"
    }
  ];

  return NextResponse.json({ cameras });
}
