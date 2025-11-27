"use client";

import { useEffect, useRef } from "react";

export default function CameraPlayer({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!src || !videoRef.current) return;

    videoRef.current.src = src;
    videoRef.current.play().catch(() => {});
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      style={{ width: "100%", borderRadius: 12 }}
    ></video>
  );
}
