import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./api";

function AdminCelebs() {
  const [celebs, setCelebs] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const loadCelebs = async () => {
    const res = await api.get("/api/celebrities");
    setCelebs(res.data);
  };

  useEffect(() => {
    loadCelebs();
  }, []);

  const addCeleb = async () => {
    if (!name || !category || !price || !image) return alert("All fields required");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "vceleb_upload");

    const cloudRes = await fetch(
      "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
      { method: "POST", body: formData }
    );

    const cloudData = await cloudRes.json();
    if (!cloudData.secure_url) return alert("Image upload failed");

    await api.post("/api/celebrities", {
      name,
      category,
      price,
      image: cloudData.secure_url
    });

    setName(""); setCategory(""); setPrice(""); setImage(null);
    loadCelebs();
  };

  const deleteCeleb = async (id) => {
    if (!window.confirm("Delete celebrity?")) return;
    await api.delete(`/api/celebrities/${id}`);
    loadCelebs();
  };

  return (
    <div className="container">
      <h2>Admin – Celebrities</h2>

      <div style={{ marginBottom: 20 }}>
        <Link to="/admin/bookings">📩 View Bookings</Link> |{" "}
        <button onClick={() => { localStorage.removeItem("token"); window.location.href="/"; }}>
          Logout
        </button>
      </div>

      <div className="card">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <input type="file" onChange={e => setImage(e.target.files[0])} />
        <button onClick={addCeleb}>Add Celebrity</button>
      </div>

      {celebs.map(c => (
        <div className="card" key={c._id}>
          <img src={c.image} alt={c.name} />
          <p><b>{c.name}</b></p>
          <p>{c.category} — ₹{c.price}</p>
          <button onClick={() => deleteCeleb(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminCelebs;
