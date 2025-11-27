"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import PlaceCard from "@/components/PlaceCard";

export default function SearchPage() {
  const q = useSearchParams().get("q");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("/api/places?q=" + q)
      .then((r) => r.json())
      .then(setPlaces);
  }, [q]);

  return (
    <div style={{ padding: 40 }}>
      <h2>תוצאות עבור: {q}</h2>

      <div style={{ marginTop: 20 }}>
        {places.map((p) => (
          <PlaceCard key={p.id} place={p} />
        ))}
      </div>
    </div>
  );
}
