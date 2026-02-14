import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";
import BookingForm from "./BookingForm";

export default function Home() {
  const [celebs, setCelebs] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    api.get("/api/celebrities").then(res => {
      setCelebs(res.data);
    });
  }, []);

  // 🗂️ UNIQUE CATEGORIES
  const categories = [
    "all",
    ...new Set(celebs.map(c => c.category))
  ];

  // 🔽 CATEGORY SORT / FILTER (PUBLIC)
  const filteredCelebs =
    category === "all"
      ? celebs
      : celebs.filter(c => c.category === category);

  return (
    <div className="container">
      {/* ADMIN LOGIN */}
      <div style={{ textAlign: "right", marginBottom: 20 }}>
        <Link to="/admin/login">
          <button>Admin Login</button>
        </Link>
      </div>

      <h1>Available Celebrities</h1>

      {/* CATEGORY SORT */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ marginRight: 10 }}>
          Sort by category:
        </label>

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* CELEBRITY LIST */}
      {filteredCelebs.map(c => (
        <div className="card" key={c._id}>
          <img src={c.image} alt={c.name} />

          <h3>{c.name}</h3>

          <p>{c.category}</p>

          {/* ❌ PRICE HIDDEN FROM PUBLIC */}

          <BookingForm celebrity={c.name} />
        </div>
      ))}
    </div>
  );
}
