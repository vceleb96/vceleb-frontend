import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";
import BookingForm from "./BookingForm";
import CATEGORIES from "./constants/categories";

export default function Home() {
  const [celebs, setCelebs] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [activeBooking, setActiveBooking] = useState(null);

  useEffect(() => {
    api.get("/api/celebrities").then(res => setCelebs(res.data));
  }, []);

  const filtered = celebs.filter(c => {
    const matchCategory =
      category === "all" || c.category === category;
    const matchSearch = c.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="container">
      <div style={{ textAlign: "right", marginBottom: 20 }}>
        <Link to="/admin/login">
          <button>Admin Login</button>
        </Link>
      </div>

      <h1>Available Celebrities</h1>

      {/* SEARCH */}
      <input
        placeholder="Search celebrity"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      {/* CATEGORY FILTER */}
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="all">ALL</option>
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* CELEBRITY LIST */}
      {filtered.map(c => (
        <div className="card" key={c._id}>
          <img src={c.image} alt={c.name} />
          <h3>{c.name}</h3>
          <p>{c.category}</p>

          {activeBooking === c._id ? (
            <BookingForm celebrity={c.name} />
          ) : (
            <button
              onClick={() => setActiveBooking(c._id)}
            >
              Book Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
