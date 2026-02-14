import { useEffect, useState } from "react";
import api from "./api";
import CATEGORIES from "./constants/categories";

const BACKEND_URL = "https://vceleb-backend.onrender.com";

function AdminCelebs() {
  const [celebs, setCelebs] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "Bollywood",
    price: "",
    image: ""
  });

  useEffect(() => {
    fetchCelebs();
  }, []);

  const fetchCelebs = async () => {
    const res = await api.get("/api/celebrities");
    setCelebs(res.data);
  };

  const resolveImage = img => {
    if (!img) return "https://via.placeholder.com/80";
    if (img.startsWith("http")) return img;
    return `${BACKEND_URL}${img}`;
  };

  const submit = async () => {
    setError("");

    if (!form.name || !form.category || !form.price || !form.image) {
      setError("All fields are required");
      return;
    }

    try {
      if (editingId) {
        await api.put(
          `/api/celebrities/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
      } else {
        await api.post(
          "/api/celebrities",
          form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
      }

      setForm({
        name: "",
        category: "Bollywood",
        price: "",
        image: ""
      });
      setEditingId(null);
      fetchCelebs();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Operation failed (check category & auth)"
      );
    }
  };

  const edit = c => {
    setEditingId(c._id);
    setForm({
      name: c.name,
      category: c.category,
      price: c.price,
      image: c.image
    });
  };

  const del = async id => {
    if (!window.confirm("Delete this celebrity?")) return;

    try {
      await api.delete(`/api/celebrities/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      fetchCelebs();
    } catch {
      setError("Delete failed");
    }
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

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* SORT */}
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

      {/* FORM */}
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
        type="number"
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

      {editingId && (
        <button
          onClick={() => {
            setEditingId(null);
            setForm({
              name: "",
              category: "Bollywood",
              price: "",
              image: ""
            });
          }}
        >
          Cancel
        </button>
      )}

      <hr />

      {/* LIST */}
      {sorted.map(c => (
        <div
          key={c._id}
          style={{ display: "flex", gap: 10, marginBottom: 10 }}
        >
          <img src={resolveImage(c.image)} width="80" />
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
