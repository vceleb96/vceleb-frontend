import { useEffect, useState } from "react";
import api from "./api";

const BACKEND_URL = "https://vceleb-backend.onrender.com";

function AdminCelebs() {
  const [celebs, setCelebs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: ""
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCelebs();
  }, []);

  const fetchCelebs = async () => {
    const res = await api.get("/api/celebrities");
    setCelebs(res.data);
  };

  const resolveImage = img => {
    if (!img) return "https://via.placeholder.com/100";
    if (img.startsWith("http")) return img;
    return `${BACKEND_URL}${img.startsWith("/") ? img : "/" + img}`;
  };

  const submit = async () => {
    if (editingId) {
      await api.put(`/api/celebrities/${editingId}`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
    } else {
      await api.post("/api/celebrities", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
    }

    setForm({ name: "", category: "", price: "", image: "" });
    setEditingId(null);
    fetchCelebs();
  };

  const edit = c => {
    setEditingId(c._id);
    setForm(c);
  };

  const del = async id => {
    await api.delete(`/api/celebrities/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    fetchCelebs();
  };

  return (
    <div>
      <h3>Manage Celebrities</h3>

      <input placeholder="Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Category" value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })} />

      <input placeholder="Price" value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })} />

      <input placeholder="Image URL" value={form.image}
        onChange={e => setForm({ ...form, image: e.target.value })} />

      <button onClick={submit}>
        {editingId ? "Update" : "Add"}
      </button>

      <hr />

      {celebs.map(c => (
        <div key={c._id} style={{ display: "flex", gap: 10 }}>
          <img src={resolveImage(c.image)} width="80" />
          <div>
            <h4>{c.name}</h4>
            <p>{c.category} — ₹{c.price}</p>
            <button onClick={() => edit(c)}>Edit</button>
            <button onClick={() => del(c._id)} style={{ color: "red" }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminCelebs;
