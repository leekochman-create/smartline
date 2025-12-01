"use client";

import IsraelCamerasMap from "./components/IsraelCamerasMap";

export default function HomePage() {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        מפת מצלמות לייב — ישראל
      </h1>

      <IsraelCamerasMap />
    </div>
  );
}
