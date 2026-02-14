import { useEffect, useState } from "react";
import api from "./api";

const BACKEND_URL = "https://vceleb-backend.onrender.com";

function AdminCelebs() {
  const [celebs, setCelebs] = useState([]);
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    fetchCelebs();
  }, []);

  const fetchCelebs = async () => {
    const res = await api.get("/api/celebrities");
    setCelebs(res.data);
  };

  const resolveImage = img =>
    img?.startsWith("http") ? img : `${BACKEND_URL}${img}`;

  const sorted = [...celebs].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "category")
      return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <h3>Admin – Celebrities</h3>

      <label>Sort by: </label>
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="category">Category</option>
        <option value="price-low">Price (Low → High)</option>
        <option value="price-high">Price (High → Low)</option>
      </select>

      <hr />

      {sorted.map(c => (
        <div key={c._id} style={{ display: "flex", gap: 10 }}>
          <img src={resolveImage(c.image)} width="80" />
          <div>
            <h4>{c.name}</h4>
            <p>{c.category}</p>
            <p>₹{c.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminCelebs;
