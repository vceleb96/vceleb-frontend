import { useState } from "react";
import api from "./api";

function BookingForm({ celebrity }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    if (loading || submitted) return;

    if (!name || !email) {
      alert("Name and email are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/bookings", {
        name,
        email,
        celebrity,
        message
      });

      setSubmitted(true);
      alert("✅ Booking submitted successfully");
    } catch (err) {
      alert("❌ Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      {submitted ? (
        <p style={{ color: "green" }}>
          Booking submitted ✔
        </p>
      ) : (
        <>
          <input
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={loading}
          />

          <input
            placeholder="Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />

          <textarea
            placeholder="Message (optional)"
            value={message}
            onChange={e => setMessage(e.target.value)}
            disabled={loading}
          />

          <button
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </>
      )}
    </div>
  );
}

export default BookingForm;
