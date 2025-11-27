"use client";

import { useState } from "react";

export default function AddPlace() {
  const [data, setData] = useState({});

  async function save() {
    await fetch("/api/place/add", {
      method: "POST",
      body: JSON.stringify(data)
    });
    alert("נוסף!");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>הוסף עסק חדש</h1>

      <input placeholder="שם" onChange={e => setData({...data, name: e.target.value})} />
      <input placeholder="קטגוריה" onChange={e => setData({...data, category: e.target.value})} />
      <input placeholder="lat" onChange={e => setData({...data, lat: Number(e.target.value)})} />
      <input placeholder="lng" onChange={e => setData({...data, lng: Number(e.target.value)})} />
      <input placeholder="כתובת" onChange={e => setData({...data, address: e.target.value})} />
      <input placeholder="google_query" onChange={e => setData({...data, googleQuery: e.target.value})} />

      <button style={{ marginTop: 20 }} onClick={save}>שמור</button>
    </div>
  );
}
