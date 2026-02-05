import { useState } from "react";
import api from "./api";

function BookingForm({ celebrity, close }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    // 🔴 HARD VALIDATION
    if (!name.trim() || !email.trim()) {
      setError("Name and Email are required");
      return;
    }

    try {
      await api.post("/api/bookings", {
        name,
        email,
        message,
        celebrity
      });

      alert("Booking submitted successfully");

      setName("");
      setEmail("");
      setMessage("");
      setError("");

      if (close) close();
    } catch (err) {
      setError("Failed to submit booking");
    }
  };

  return (
    <div>
      <h3>Book {celebrity}</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Your Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Your Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <textarea
        placeholder="Message (optional)"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <button onClick={submit}>Submit Booking</button>
    </div>
  );
}

export default BookingForm;
