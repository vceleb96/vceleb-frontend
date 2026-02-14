import { useEffect, useState } from "react";
import api from "./api";

function AdminCelebs() {
  const [celebs, setCelebs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👇 CHANGE THIS if your backend URL changes
  const BACKEND_URL = "https://vceleb-backend.onrender.com";

  useEffect(() => {
    fetchCelebs();
  }, []);

  const fetchCelebs = async () => {
    try {
      const res = await api.get("/api/celebrities");
      setCelebs(res.data);
    } catch (err) {
      console.error("Failed to fetch celebrities", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCeleb = async id => {
    if (!window.confirm("Delete this celebrity?")) return;

    try {
      await api.delete(`/api/celebrities/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setCelebs(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  // 🔧 FIX IMAGE URL (THIS IS THE KEY)
  const resolveImage = image => {
    if (!image) return "https://via.placeholder.com/100?text=No+Image";

    // already absolute URL
    if (image.startsWith("http")) return image;

    // ensure leading slash
    if (!image.startsWith("/")) image = "/" + image;

    return `${BACKEND_URL}${image}`;
  };

  if (loading) {
    return <p>Loading celebrities...</p>;
  }

  return (
    <div>
      <h3>Celebrities</h3>

      {celebs.length === 0 && <p>No celebrities found</p>}

      {celebs.map(c => (
        <div
          key={c._id}
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 15
          }}
        >
          {/* IMAGE */}
          <img
            src={resolveImage(c.image)}
            alt={c.name}
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 6
            }}
            onError={e => {
              e.target.src =
                "https://via.placeholder.com/100?text=No+Image";
            }}
          />

          {/* DETAILS */}
          <div style={{ flex: 1 }}>
            <h4>{c.name}</h4>
            <p>{c.category}</p>
            <p>₹{c.price}</p>

            <button
              onClick={() => deleteCeleb(c._id)}
              style={{
                marginTop: 10,
                backgroundColor: "#c00",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminCelebs;
