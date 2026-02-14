import { useState } from "react";
import api from "./api";

function BookingForm({ celebrity, onClose }) {
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

      // ⏱️ auto-close after success
      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err) {
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {!submitted ? (
          <>
            <h3>Book {celebrity}</h3>

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

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={submit} disabled={loading}>
                {loading ? "Submitting..." : "Submit Booking"}
              </button>
              <button onClick={onClose} disabled={loading}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="success">
            <div className="check">✔</div>
            <p>Booking submitted successfully</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingForm;
