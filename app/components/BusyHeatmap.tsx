"use client";

import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function BusyHeatmap() {
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
        libraries: ["visualization"],
      });

      const google = await loader.load();

      const map = new google.maps.Map(
        document.getElementById("busy-map") as HTMLElement,
        {
          center: { lat: 32.0853, lng: 34.7818 },
          zoom: 13,
          disableDefaultUI: false,
        }
      );

      // ---- LOAD BUSY DATA ----
      const res = await fetch("/api/busy");
      const json = await res.json();
      const busyData = json.busy;

      const heatmapPoints = busyData.map((item: any) => ({
        location: new google.maps.LatLng(item.lat, item.lng),
        weight: item.busy_level ?? 1,
      }));

      new google.maps.visualization.HeatmapLayer({
        data: heatmapPoints,
        radius: 35,
        map,
      });
    };

    initMap();
  }, []);

  return (
    <div
      id="busy-map"
      style={{ width: "100%", height: "600px", borderRadius: "20px" }}
    ></div>
  );
}
