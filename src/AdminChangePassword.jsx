import { useState } from "react";
import api from "./api";

function AdminChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setMessage("");
    setError("");

    if (!currentPassword || !newPassword) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.put(
        "/api/auth/change-password",
        {
          currentPassword,
          newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setMessage(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Password update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h3>Change Password</h3>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={e => setCurrentPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
}

export default AdminChangePassword;
