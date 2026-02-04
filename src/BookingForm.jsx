import { useState } from "react";
import api from "./api";

function BookingForm({ celebrity }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (!name || !email) {
      alert("Name and email required");
      return;
    }

    await api.post("/api/bookings", {
      name,
      email,
      message,
      celebrity
    });

    alert("Booking enquiry sent!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 10, marginTop: 10 }}>
      <h4>Book {celebrity}</h4>

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

      <button onClick={submit}>Send Enquiry</button>
    </div>
  );
}

export default BookingForm;
