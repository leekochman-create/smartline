export async function fetchCameraFrame(url: string) {
  const res = await fetch("/api/camera", {
    method: "POST",
    body: JSON.stringify({ url })
  });
  return await res.json();
}
