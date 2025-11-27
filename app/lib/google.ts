export async function getBusy(placeQuery: string) {
  const res = await fetch("/api/busy?place=" + placeQuery);
  return await res.json();
}
