"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

export default function Map() {
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && typeof window.google.maps !== "undefined") {
        const map = new window.google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: { lat: 32.0853, lng: 34.7818 },
            zoom: 13,
          }
        );

        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "500px", borderRadius: "12px" }}
    ></div>
  );
}
