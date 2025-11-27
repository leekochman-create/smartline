"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [businesses, setBusinesses] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function load() {
      const places = await fetch("/api/places").then(r => r.json());
      setBusinesses(places);

      const rep = await fetch("/api/report").then(r => r.json());
      setReports(rep);
    }
    load();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>דשבורד מנהלים</h1>

      <h2 style={{ marginTop: 30 }}>עסקים:</h2>
      {businesses.map(b => (
        <div key={b.id} style={{ padding: 10, borderBottom: "1px solid #eee" }}>
          <b>{b.name}</b> – {b.address}
        </div>
      ))}

      <h2 style={{ marginTop: 30 }}>דיווחי עומס:</h2>
      {reports.map(r => (
        <div key={r.id} style={{ padding: 10, borderBottom: "1px solid #eee" }}>
          {r.people} אנשים • {r.registers} עמדות • {r.created_at}
        </div>
      ))}
    </div>
  );
}
