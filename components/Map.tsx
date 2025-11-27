"use client";

import { useEffect } from "react";

export default function Map({ children }) {
  useEffect(() => {
    if (!window.google) return;

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 32.0853, lng: 34.7818 },
      zoom: 13
    });

    window._MAP = map;
  }, []);

  return (
    <div id="map" style={{ width: "100%", height: "600px", borderRadius: 12 }}>
      {children}
    </div>
  );
}
