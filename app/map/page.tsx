"use client";

import { useEffect } from "react";

export default function MapPage() {

  useEffect(() => {
    // Load Google Maps script ONCE
    if (!document.getElementById("google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=visualization`;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => initMap();
    } else {
      initMap();
    }

    function initMap() {
      if (!window.google || !window.google.maps) return;

      const map = new window.google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 32.0853, lng: 34.7818 },
          zoom: 13,
        }
      );
    }
  }, []);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "500px", borderRadius: "12px" }}
    ></div>
  );
}
