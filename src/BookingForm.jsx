import { useState } from "react";
import api from "./api";

export default function BookingForm({ celebrity }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    await api.post("/api/bookings", { name, email, message, celebrity });
    alert("Booking sent");
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <textarea placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} />
      <button onClick={submit}>Book Now</button>
    </>
  );
}
