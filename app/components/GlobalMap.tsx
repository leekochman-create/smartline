"use client";

import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function GlobalMap() {
  const [cams, setCams] = useState([]);

  useEffect(() => {
    fetch("/api/cameras/collect");
    fetch("/api/cameras/collect"); // טעינה כפולה כדי למנוע ריקנות

    const load = async () => {
      const res = await fetch("/api/cameras/collect");
      const json = await res.json();

      const camsRes = await fetch("/api/global_cameras");
      const camsJson = await camsRes.json();
      setCams(camsJson.cameras);
    };

    load();
  }, []);

  useEffect(() => {
    const init = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
      });

      const google = await loader.load();

      const map = new google.maps.Map(
        document.getElementById("global-map"),
        {
          center: { lat: 32.0853, lng: 34.7818 },
          zoom: 3,
        }
      );

      cams.forEach((c) => {
        new google.maps.Marker({
          position: { lat: c.lat, lng: c.lng },
          map,
          title: c.name,
        });
      });
    };

    if (cams.length > 0) init();
  }, [cams]);

  return <div id="global-map" style={{ width: "100%", height: "100%" }}></div>;
}
