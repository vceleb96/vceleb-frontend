import { useEffect, useState } from "react";
import api from "./api";

function AdminCelebs() {
  const [celebs, setCelebs] = useState([]);
  const [loading, setLoading] = useState(true);

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
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10
          }}
        >
          <h4>{c.name}</h4>
          <p>{c.category}</p>
          <p>₹{c.price}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminCelebs;
