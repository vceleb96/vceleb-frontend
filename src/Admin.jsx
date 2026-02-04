import { useState, useEffect } from "react";
import api from "./api";

function Admin() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [celebs, setCelebs] = useState([]);

  const loadCelebs = async () => {
    const res = await api.get("/api/celebrities");
    setCelebs(res.data);
  };

  useEffect(() => {
    loadCelebs();
  }, []);

  const addCeleb = async () => {
    if (!name || !category || !price) {
      alert("All fields required");
      return;
    }

    await api.post("/api/celebrities", {
      name,
      category,
      price
    });

    setName("");
    setCategory("");
    setPrice("");
    loadCelebs();
  };

  const deleteCeleb = async (id) => {
    await api.delete(`/api/celebrities/${id}`);
    loadCelebs();
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />

      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <button onClick={addCeleb}>Add Celebrity</button>

      <hr />

      {celebs.map(c => (
        <div key={c._id} style={{ marginBottom: 10 }}>
          <b>{c.name}</b> — {c.category} — ₹{c.price}
          <button onClick={() => deleteCeleb(c._id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
