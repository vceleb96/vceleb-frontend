import { useState, useEffect } from "react";
import api from "./api";

function Admin() {
  // Page control
  const [page, setPage] = useState("celebs");

  // Celebrity form
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  // Data
  const [celebs, setCelebs] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Load data
  const loadCelebs = async () => {
    const res = await api.get("/api/celebrities");
    setCelebs(res.data);
  };

  const loadBookings = async () => {
    const res = await api.get("/api/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
    loadCelebs();
    loadBookings();
  }, []);

  // Add celebrity
  const addCeleb = async () => {
    if (!name || !category || !price || !image) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "vceleb_upload");

    const cloudRes = await fetch(
      "https://api.cloudinary.com/v1_1/dgl8tq0r9/image/upload",
      { method: "POST", body: formData }
    );

    const cloudData = await cloudRes.json();

    if (!cloudData.secure_url) {
      alert("Image upload failed");
      return;
    }

    await api.post("/api/celebrities", {
      name,
      category,
      price,
      image: cloudData.secure_url
    });

    setName("");
    setCategory("");
    setPrice("");
    setImage(null);
    loadCelebs();
  };

  // Delete celebrity
  const deleteCeleb = async (id) => {
    if (!window.confirm("Delete this celebrity?")) return;
    await api.delete(`/api/celebrities/${id}`);
    loadCelebs();
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      {/* 🔀 PAGE SWITCH */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setPage("celebs")}>
          Celebrities
        </button>
        <button onClick={() => setPage("bookings")}>
          Bookings
        </button>
      </div>

      {/* ===================== */}
      {/* ⭐ CELEBRITIES PAGE */}
      {/* ===================== */}
      {page === "celebs" && (
        <>
          <div className="card">
            <h3>Add Celebrity</h3>

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

            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
            />

            <button onClick={addCeleb}>Add Celebrity</button>
          </div>

          <h3>Celebrity List</h3>

          {celebs.map(c => (
            <div className="card" key={c._id}>
              <img
                src={c.image}
                alt={c.name}
                style={{ width: "100%", borderRadius: 8 }}
              />
              <p><b>{c.name}</b></p>
              <p>{c.category} — ₹{c.price}</p>
              <button onClick={() => deleteCeleb(c._id)}>
                Delete
              </button>
            </div>
          ))}
        </>
      )}

      {/* ===================== */}
      {/* 📩 BOOKINGS PAGE */}
      {/* ===================== */}
      {page === "bookings" && (
        <>
          <h3>Booking Enquiries</h3>

          {bookings.length === 0 && <p>No bookings yet</p>}

          {bookings.map(b => (
            <div className="card" key={b._id}>
              <p><b>Celebrity:</b> {b.celebrity}</p>
              <p><b>Name:</b> {b.name}</p>
              <p><b>Email:</b> {b.email}</p>
              {b.message && <p><b>Message:</b> {b.message}</p>}
              <p style={{ fontSize: 12, color: "#666" }}>
                {new Date(b.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Admin;
