"use client";

import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function IsraelLiveMap() {
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<any>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
      });

      const google = await loader.load();

      const mapInstance = new google.maps.Map(
        document.getElementById("israel-map") as HTMLElement,
        {
          center: { lat: 32.0853, lng: 34.7818 }, // CENTER ISRAEL
          zoom: 10,
          disableDefaultUI: false,
        }
      );

      setMap(mapInstance);

      // --- Fetch cameras from Supabase API ---
      const res = await fetch("/api/cameras/list-israel");
      const data = await res.json();

      if (!data || !data.cameras) return;

      const markerList: any[] = [];

      data.cameras.forEach((cam: any) => {
        if (!cam.lat || !cam.lng) return;

        const marker = new google.maps.Marker({
          position: { lat: cam.lat, lng: cam.lng },
          map: mapInstance,
          title: cam.name,
        });

        marker.addListener("click", () => {
          setSelectedCamera(cam);
        });

        markerList.push(marker);
      });

      setMarkers(markerList);
    };

    initMap();
  }, []);

  return (
    <div>
      {/* MAP */}
      <div
        id="israel-map"
        style={{
          width: "100%",
          height: "650px",
          borderRadius: "20px",
          marginBottom: "20px",
        }}
      ></div>

      {/* POPUP WITH VIDEO */}
      {selectedCamera && (
        <div
          style={{
            padding: "20px",
            borderRadius: "20px",
            background: "white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            marginTop: "20px",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>{selectedCamera.name}</h2>

          <video
            src={selectedCamera.url}
            controls
            autoPlay
            style={{
              width: "100%",
              borderRadius: "12px",
              background: "#000",
            }}
          />

          <button
            style={{
              marginTop: "15px",
              padding: "10px 18px",
              background: "red",
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setSelectedCamera(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
