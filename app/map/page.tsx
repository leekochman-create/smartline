// app/map/page.tsx
"use client";

import IsraelCamerasMap from "../components/IsraelCamerasMap";

export default function MapPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20, textAlign: "center" }}>מפת מצלמות ישראל (לייב)</h1>
      <IsraelCamerasMap />
    </div>
  );
}
