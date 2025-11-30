"use client";

import { useEffect, useState } from "react";

export default function PlacePage({ params }: any) {
  const { id } = params;
  const [image, setImage] = useState<string | null>(null);
  const [place, setPlace] = useState<any>(null);

  useEffect(() => {
    async function loadPlace() {
      const res = await fetch(`/api/places?id=${id}`);
      const data = await res.json();
      setPlace(data.places?.[0] || null);
    }
    loadPlace();
  }, [id]);

  const upload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string; // ← FIX
      const base64 = result.split(",")[1]; // ← SAFE
      setImage(base64);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Place ID: {id}</h1>

      {place && (
        <div style={{ marginBottom: "20px" }}>
          <h2>{place.name}</h2>
          <p>{place.address}</p>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={upload}
        style={{ marginBottom: "20px" }}
      />

      {image && (
        <img
          src={`data:image/jpeg;base64,${image}`}
          style={{ width: "300px", borderRadius: "10px", marginTop: "10px" }}
        />
      )}
    </div>
  );
}
