"use client";

import { useEffect } from "react";

export default function MapPage() {
  useEffect(() => {
    // טוען סקריפט דינמית — הדרך הנכונה ב-Next.js
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      initMap();
    };

    document.body.appendChild(script);
  }, []);

  function initMap() {
    if (!window.google) return;

    const map = new window.google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 32.0853, lng: 34.7818 },
        zoom: 13,
      }
    );
  }

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "100vh",
        borderRadius: "0px",
      }}
    ></div>
  );
}
