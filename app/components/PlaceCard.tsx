export default function PlaceCard({ place }: { place?: any }) {
  if (!place) {
    return (
      <div
        style={{
          padding: "20px",
          borderRadius: "10px",
          background: "#f2f2f2",
          marginBottom: "10px",
        }}
      >
        No place data
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        background: "#fff",
        marginBottom: "10px",
        border: "1px solid #ddd",
      }}
    >
      <h3>{place.name}</h3>
      <p>{place.address}</p>
    </div>
  );
}
