import { useEffect, useState } from "react";
import api from "./api";
import AdminLayout from "./AdminLayout";

function AdminCelebs() {
  const [celebs, setCelebs] = useState([]);

  // 🔐 Protect route
  if (!localStorage.getItem("token")) {
    window.location.href = "/admin/login";
    return null;
  }

  useEffect(() => {
    fetchCelebs();
  }, []);

  const fetchCelebs = async () => {
    const res = await api.get("/api/celebrities");
    setCelebs(res.data);
  };

  return (
    <AdminLayout>
      <h2>Celebrities</h2>

      {celebs.length === 0 && <p>No celebrities found</p>}

      {celebs.map(c => (
        <div
          key={c._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10
          }}
        >
          <h4>{c.name}</h4>
          <p>{c.category}</p>
          <p>₹{c.price}</p>
        </div>
      ))}
    </AdminLayout>
  );
}

export default AdminCelebs;
