"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    google: any;
  }
}

export default function Map() {
  const [loaded, setLoaded] = useState(false);

  // Detect when the Google Maps script is loaded
  useEffect(() => {
    function checkGoogle() {
      if (window.google && window.google.maps) {
        setLoaded(true);
      }
    }

    const interval = setInterval(checkGoogle, 200);

    // stop checking after loaded
    return () => clearInterval(interval);
  }, []);

  // Initialize map after google is loaded
  useEffect(() => {
    if (!loaded) return;

    const map = new window.google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 32.0853, lng: 34.7818 },
        zoom: 13,
        disableDefaultUI: true,
      }
    );
  }, [loaded]);

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
