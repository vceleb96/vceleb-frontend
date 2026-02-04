import { useEffect, useState } from "react";
import api from "./api";
import BookingForm from "./BookingForm";


function Home() {
  const [celebs, setCelebs] = useState([]);

  useEffect(() => {
    api.get("/api/celebrities")
      .then(res => setCelebs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Available Celebrities</h1>

      {celebs.length === 0 && <p>No celebrities available</p>}
      <h2>Total celebs: {celebs.length}</h2>

      {celebs.map(c => (
        <div
          key={c._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10
          }}
        >
          <h3>{c.name}</h3>
          <p>Category: {c.category}</p>
          <p>Price: ₹{c.price}</p>
          <BookingForm celebrity={c.name} />
        </div>
      ))}
    </div>
  );
}

export default Home;
