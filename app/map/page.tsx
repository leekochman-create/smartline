"use client";

import { useEffect, useState } from "react";
import Map from "@/components/Map";
import HeatmapLayer from "@/components/HeatmapLayer";

export default function MapPage() {
  const [places, setPlaces] = useState([]);
  const [heatmapPoints, setHeatmapPoints] = useState([]);

  useEffect(() => {
    async function load() {
      // טוען את כל העסקים
      const res = await fetch("/api/places");
      const data = await res.json();
      setPlaces(data);

      // מייצר נקודות Heatmap
      const points = data.map((p) => ({
        lat: p.lat,
        lng: p.lng
      }));

      setHeatmapPoints(points);
    }

    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>מפת עומסים</h1>

      <Map>
        <HeatmapLayer points={heatmapPoints} />
      </Map>

      <div style={{ marginTop: 30 }}>
        <h3>רשימת מקומות במפה</h3>
        {places.length === 0 && <p>טוען...</p>}
        {places.map((p) => (
          <div key={p.id} style={{ marginBottom: 6, opacity: 0.8 }}>
            {p.name} – {p.address || "ללא כתובת"}
          </div>
        ))}
      </div>
    </div>
  );
}
