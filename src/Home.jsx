import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";
import BookingForm from "./BookingForm";

export default function Home() {
  const [celebs, setCelebs] = useState([]);

  useEffect(() => {
    api.get("/api/celebrities").then(res => setCelebs(res.data));
  }, []);

  return (
    <div className="container">
      {/* ✅ FIXED: use Link instead of <a href> */}
      <div style={{ textAlign: "right", marginBottom: 20 }}>
        <Link to="/admin/login">
          <button>Admin Login</button>
        </Link>
      </div>

      <h1>Available Celebrities</h1>

      {celebs.map(c => (
        <div className="card" key={c._id}>
          <img src={c.image} alt={c.name} />
          <h3>{c.name}</h3>
          <p>
            {c.category} — ₹{c.price}
          </p>
          <BookingForm celebrity={c.name} />
        </div>
      ))}
    </div>
  );
}
