import { useEffect, useState } from "react";
import api from "./api";
import BookingForm from "./BookingForm";

export default function Home() {
  const [celebs, setCelebs] = useState([]);

  useEffect(() => {
    api.get("/api/celebrities").then(res => setCelebs(res.data));
  }, []);

  return (
    <div className="container">
      <h1>Available Celebrities</h1>
      {celebs.map(c => (
        <div className="card" key={c._id}>
          <img src={c.image} />
          <h3>{c.name}</h3>
          <p>{c.category} — ₹{c.price}</p>
          <BookingForm celebrity={c.name} />
        </div>
      ))}
    </div>
  );
}
