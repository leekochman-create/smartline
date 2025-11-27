"use client";

import Map from "../components/Map";
import HeatmapLayer from "../components/HeatmapLayer";

export default function MapPage() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Map />
      <HeatmapLayer />
    </div>
  );
}
