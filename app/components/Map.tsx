// app/components/Map.tsx
"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

export default function Map() {
  useEffect(() => {
    // מחכה ש-Google Maps ייטען
    if (!window.google || !window.google.maps) return;

    const map = new window.google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 32.0853, lng: 34.7818 }, // תל אביב
        zoom: 13,
        disableDefaultUI: true,
      }
    );
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "12px",
        background: "#eee",
      }}
    ></div>
  );
}
