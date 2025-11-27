"use client";

import { useState } from "react";

export default function ReportPage() {
  const [businessId, setBusinessId] = useState("");
  const [people, setPeople] = useState(0);
  const [registers, setRegisters] = useState(1);
  const [done, setDone] = useState(false);

  async function send() {
    await fetch("/api/report", {
      method: "POST",
      body: JSON.stringify({ businessId, people, registers })
    });
    setDone(true);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>דווח עומס</h1>

      {done ? (
        <h2>✔ תודה על הדיווח!</h2>
      ) : (
        <>
          <input
            placeholder="Business ID"
            onChange={(e) => setBusinessId(e.target.value)}
            style={{ display: "block", marginTop: 20 }}
          />

          <input
            type="number"
            placeholder="מספר אנשים"
            onChange={(e) => setPeople(Number(e.target.value))}
            style={{ display: "block", marginTop: 20 }}
          />

          <input
            type="number"
            placeholder="מספר עמדות"
            onChange={(e) => setRegisters(Number(e.target.value))}
            style={{ display: "block", marginTop: 20 }}
          />

          <button onClick={send} style={{ marginTop: 20 }}>
            שלח דיווח
          </button>
        </>
      )}
    </div>
  );
}
