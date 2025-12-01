"use client";

import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function GlobalMap() {
  const [cams, setCams] = useState([]);

  useEffect(() => {
    // Load cameras from server
    const fetchCams = async () => {
      await fetch("/api/cameras/collect"); // ensures demo cams exist
      const res = await fetch("/api/global_cameras");
      const json = await res.json();
      setCams(json.cameras);
    };

    fetchCams();
  }, []);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
      });

      const google = await loader.load();

      const map = new google.maps.Map(
        document.getElementById("global-map") as HTMLElement,
        {
          center: { lat: 32.0853, lng: 34.7818 },
          zoom: 3,
        }
      );

      cams.forEach((cam) => {
        new google.maps.Marker({
          position: { lat: cam.lat, lng: cam.lng },
          map,
          title: cam.name,
        });
      });
    };

    if (cams.length > 0) initMap();
  }, [cams]);

  return (
    <div
      id="global-map"
      style={{ width: "100%", height: "100%" }}
    ></div>
  );
}
