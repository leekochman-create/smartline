"use client";

import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function BusyHeatmap() {

  useEffect(() => {
    const init = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
        libraries: ["visualization"]
      });

      const google = await loader.load();

      const map = new google.maps.Map(
        document.getElementById("busy-map") as HTMLElement,
        {
          zoom: 14,
          center: { lat: 32.0853, lng: 34.7818 },
        }
      );

      // 1️⃣ Load automatic places
      const placesRes = await fetch("/api/places?lat=32.0853&lng=34.7818&type=supermarket");
      const placesJson = await placesRes.json();
      const places = placesJson.places;

      // 2️⃣ Load busy table from Supabase
      const busyRes = await fetch("/api/busy");
      const busyJson = await busyRes.json();
      const busy = busyJson.busy;

      // 3️⃣ Join places + busy
      const heatmapPoints = places.map((p: any) => {
        const match = busy.find((b: any) => b.place_id === p.place_id);

        const level = match ? match.busy_level : 0;

        return {
          location: new google.maps.LatLng(
            p.geometry.location.lat,
            p.geometry.location.lng
          ),
          weight: level
        };
      });

      new google.maps.visualization.HeatmapLayer({
        data: heatmapPoints,
        radius: 40,
        map
      });
    };

    init();
  }, []);

  return (
    <div
      id="busy-map"
      style={{ width: "100%", height: "600px", borderRadius: "16px" }}
    ></div>
  );
}
