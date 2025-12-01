"use client";

import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function IsraelCamerasMap() {
  const [map, setMap] = useState<any>(null);
  const [selectedStream, setSelectedStream] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly"
      });

      const google = await loader.load();

      const mapInstance = new google.maps.Map(
        document.getElementById("israel-map") as HTMLElement,
        {
          center: { lat: 31.5, lng: 34.8 },
          zoom: 8
        }
      );

      setMap(mapInstance);

      // GET CAMERAS
      const res = await fetch("/api/cameras/list-israel");
      const json = await res.json();

      json.cameras.forEach((cam: any) => {
        const marker = new google.maps.Marker({
          position: { lat: cam.lat, lng: cam.lng },
          map: mapInstance,
          title: cam.name
        });

        marker.addListener("click", () => {
          setSelectedStream(cam.stream);
        });
      });
    }

    init();
  }, []);

  return (
    <>
      <div
        id="israel-map"
        style={{ width: "100%", height: "650px", borderRadius: "15px" }}
      />

      {selectedStream && (
        <div style={{ marginTop: "20px" }}>
          <h3>📹 צפייה במצלמה</h3>
          <video
            src={selectedStream}
            autoPlay
            controls
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </div>
      )}
    </>
  );
}
