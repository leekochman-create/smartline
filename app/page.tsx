
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: 40 }}>

      <h1 style={{ fontSize: 36, marginBottom: 20 }}>
        ברוך הבא ל-SmartLine Ultra
      </h1>

      <p style={{ fontSize: 18, opacity: 0.8, marginBottom: 40 }}>
        מערכת חכמה לראות עומסים, תורים, ומידע בזמן אמת —
        סניפים, דואר, סופרים, קופות חולים ועוד.
      </p>

      <div style={{
        display: "flex",
        gap: 20,
        flexWrap: "wrap"
      }}>
        <Link
          href="/map"
          style={{
            padding: "20px 30px",
            background: "#175cff",
            color: "#fff",
            borderRadius: 10,
            fontSize: 18
          }}
        >
          📍 מעבר למפת עומסים
        </Link>

        <Link
          href="/search"
          style={{
            padding: "20px 30px",
            background: "#222",
            color: "#fff",
            borderRadius: 10,
            fontSize: 18
          }}
        >
          🔍 חפש עסקים
        </Link>

        <Link
          href="/dashboard"
          style={{
            padding: "20px 30px",
            background: "#00a36c",
            color: "#fff",
            borderRadius: 10,
            fontSize: 18
          }}
        >
          📊 דשבורד מנהלים
        </Link>

        <Link
          href="/report"
          style={{
            padding: "20px 30px",
            background: "#ff8c00",
            color: "#fff",
            borderRadius: 10,
            fontSize: 18
          }}
        >
          📝 דווח עומס
        </Link>
      </div>
    </div>
  );
}
