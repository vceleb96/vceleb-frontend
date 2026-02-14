import { useEffect, useState } from "react";
import api from "./api";

function AdminCelebs() {
  const [celebs, setCelebs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: ""
  });

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

  const resolveImage = image => {
    if (!image) return "https://via.placeholder.com/100?text=No+Image";
    if (image.startsWith("http")) return image;
    if (!image.startsWith("/")) image = "/" + image;
    return `${BACKEND_URL}${image}`;
  };

  const startEdit = celeb => {
    setEditingId(celeb._id);
    setForm({
      name: celeb.name || "",
      category: celeb.category || "",
      price: celeb.price || "",
      image: celeb.image || ""
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      name: "",
      category: "",
      price: "",
      image: ""
    });
  };

  const saveEdit = async id => {
    try {
      await api.put(
        `/api/celebrities/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setCelebs(prev =>
        prev.map(c =>
          c._id === id ? { ...c, ...form } : c
        )
      );

      cancelEdit();
    } catch (err) {
      alert("Update failed");
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

  if (loading) {
    return <p>Loading celebrities...</p>;
  }

  return (
    <div>
      <h3>Celebrities</h3>

      {celebs.map(c => (
        <div
          key={c._id}
          style={{
            display: "flex",
            gap: 20,
            alignItems: "flex-start",
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 15
          }}
        >
          <img
            src={resolveImage(c.image)}
            alt={c.name}
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 6
            }}
          />

          <div style={{ flex: 1 }}>
            {editingId === c._id ? (
              <>
                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={e =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  placeholder="Category"
                  value={form.category}
                  onChange={e =>
                    setForm({ ...form, category: e.target.value })
                  }
                />

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

                <button onClick={() => saveEdit(c._id)}>
                  Save
                </button>

                <button onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h4>{c.name}</h4>
                <p>{c.category}</p>
                <p>₹{c.price}</p>

                <button onClick={() => startEdit(c)}>
                  Edit
                </button>

                <button
                  onClick={() => deleteCeleb(c._id)}
                  style={{ color: "red", marginLeft: 10 }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminCelebs;
