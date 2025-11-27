"use client";

import { useEffect } from "react";

export default function Map({ children }) {
  useEffect(() => {
    // Wait for Google Maps to load into window
    if (typeof window === "undefined") return;

    const interval = setInterval(() => {
      if (window.google && typeof window.google.maps !== "undefined") {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 32.0853, lng: 34.7818 }, // תל אביב כברירת מחדל
          zoom: 13,
          disableDefaultUI: true
        });

        window._MAP = map;
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "600px",
        borderRadius: "12px",
        background: "#e5e5e5"
      }}
    >
      {children}
    </div>
  );
}
