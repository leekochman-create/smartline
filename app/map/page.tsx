// app/map/page.tsx
"use client";

import Map from "../components/Map";

export default function MapPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20, textAlign: "center" }}>מפת עומסים</h1>
      <Map />
    </div>
  );
}
