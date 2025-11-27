"use client";

import { useEffect, useState } from "react";
import Map from "@/components/Map";
import HeatmapLayer from "@/components/HeatmapLayer";

export default function MapPage() {
  const [places, setPlaces] = useState([]);
  const [heatmapPoints, setHeatmapPoints] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/places");
      const data = await res.json();
      setPlaces(data);

      // Translate crowd reports to heatmap intensity (simple)
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

      <div style={{ marginTop: 20 }}>
        <h3>מקומות</h3>
        {places.map((p) => (
          <p key={p.id}>{p.name}</p>
        ))}
      </div>
    </div>
  );
}
