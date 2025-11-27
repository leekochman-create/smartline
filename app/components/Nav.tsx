"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <nav style={{
      padding: "16px 24px",
      background: "#fff",
      borderBottom: "1px solid #eee",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 10
    }}>
      <Link href="/" style={{ fontWeight: 700, fontSize: 22 }}>
        SmartLine
      </Link>

      <div style={{ display: "flex", gap: 20 }}>
        <Link href="/map">מפת עומסים</Link>
        <Link href="/dashboard">דשבורד</Link>
      </div>
    </nav>
  );
}
