"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const search = () => {
    router.push("/search?q=" + q);
  };

  return (
    <div>
      <input
        style={{
          padding: 14,
          width: "70%",
          borderRadius: 8,
          border: "1px solid #ccc"
        }}
        placeholder="חפש עסק / מקום..."
        onChange={(e) => setQ(e.target.value)}
      />
      <button
        style={{
          padding: 14,
          borderRadius: 8,
          marginLeft: 10
        }}
        onClick={search}
      >
        חפש
      </button>
    </div>
  );
}
