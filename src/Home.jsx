import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";
import BookingForm from "./BookingForm";
import CATEGORIES from "./constants/categories";

export default function Home() {
  const [celebs, setCelebs] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    api.get("/api/celebrities").then(res => {
      setCelebs(res.data);
    });
  }, []);

  const filtered =
    category === "all"
      ? celebs
      : celebs.filter(c => c.category === category);

  return (
    <div className="container">
      <div style={{ textAlign: "right", marginBottom: 20 }}>
        <Link to="/admin/login">
          <button>Admin Login</button>
        </Link>
      </div>

      <h1>Available Celebrities</h1>

      <div style={{ marginBottom: 20 }}>
        <label>Filter by category: </label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="all">ALL</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {filtered.map(c => (
        <div className="card" key={c._id}>
          <img src={c.image} alt={c.name} />
          <h3>{c.name}</h3>
          <p>{c.category}</p>
          <BookingForm celebrity={c.name} />
        </div>
      ))}
    </div>
  );
}
