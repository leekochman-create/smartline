// app/page.tsx
"use client";

import IsraelLiveMap from "./components/IsraelLiveMap";

export default function HomePage() {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 25 }}>
        מפת מצלמות לייב — ישראל 🌍📹
      </h1>

      <IsraelLiveMap />
    </div>
  );
}
