"use client";

import Link from "next/link";

export default function PlaceCard({ place }) {
  return (
    <Link
      href={`/place/${place.id}`}
      style={{
        display: "block",
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        marginBottom: 16
      }}
    >
      <h3>{place.name}</h3>
      <p style={{ opacity: 0.6 }}>{place.address}</p>
    </Link>
  );
}
