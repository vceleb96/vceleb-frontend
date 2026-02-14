import { useEffect, useState } from "react";
import api from "./api";
import CATEGORIES from "./constants/categories";

const BACKEND_URL = "https://vceleb-backend.onrender.com";

function AdminCelebs() {
  const [celebs, setCelebs] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [form, setForm] = useState({
    name: "",
    category: "Bollywood",
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

  const submit = async () => {
    if (editingId) {
      await api.put(`/api/celebrities/${editingId}`, form);
    } else {
      await api.post("/api/celebrities", form);
    }

    setForm({
      name: "",
      category: "Bollywood",
      price: "",
      image: ""
    });
    setEditingId(null);
    fetchCelebs();
  };

  const edit = c => {
    setEditingId(c._id);
    setForm(c);
  };

  const del = async id => {
    if (!window.confirm("Delete celebrity?")) return;
    await api.delete(`/api/celebrities/${id}`);
    fetchCelebs();
  };

  const sorted = [...celebs].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "category")
      return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <h3>Manage Celebrities</h3>

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

      {/* ADD / EDIT FORM */}
      <input
        placeholder="Name"
        value={form.name}
        onChange={e =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <select
        value={form.category}
        onChange={e =>
          setForm({ ...form, category: e.target.value })
        }
      >
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        placeholder="Price"
        value={form.price}
        onChange={e =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <input
        placeholder="Image URL"
        value={form.image}
        onChange={e =>
          setForm({ ...form, image: e.target.value })
        }
      />

      <button onClick={submit}>
        {editingId ? "Update" : "Add"}
      </button>

      <hr />

      {sorted.map(c => (
        <div key={c._id} style={{ display: "flex", gap: 10 }}>
          <img src={c.image} width="80" />
          <div>
            <h4>{c.name}</h4>
            <p>{c.category}</p>
            <p>₹{c.price}</p>
            <button onClick={() => edit(c)}>Edit</button>
            <button
              onClick={() => del(c._id)}
              style={{ color: "red" }}
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
