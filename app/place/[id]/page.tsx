"use client";

import { useState, useEffect } from "react";

export default function PlacePage({ params }) {
  const [place, setPlace] = useState(null);
  const [image, setImage] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("/api/places?id=" + params.id)
      .then((r) => r.json())
      .then(setPlace);
  }, []);

  const upload = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result.split(",")[1]);
    reader.readAsDataURL(e.target.files[0]);
  };

  const analyze = async () => {
    const res = await fetch("/api/vision", {
      method: "POST",
      body: JSON.stringify({ image })
    });
    setResult(await res.json());
  };

  if (!place) return <div style={{ padding: 40 }}>טוען...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>{place.name}</h1>
      <p>{place.address}</p>

      <div style={{ marginTop: 30 }}>
        <h3>בדוק עומס עם תמונה</h3>
        <input type="file" onChange={upload} />
        <button onClick={analyze}>נתח</button>
      </div>

      {result && (
        <div style={{ marginTop: 20 }}>
          <p>אנשים בתור: {result.people}</p>
          <p>עמדות פעילות: {result.registers}</p>
          <p>
            זמן המתנה משוער:{" "}
            <b>{Math.ceil(result.people / result.registers * 0.6)} דקות</b>
          </p>
        </div>
      )}
    </div>
  );
}
