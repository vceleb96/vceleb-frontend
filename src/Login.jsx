import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setError("");

      if (!email || !password) {
        setError("Email and password required");
        return;
      }

      setLoading(true);

      const res = await api.post("/api/auth/login", {
        email,
        password
      });

      // save token
      localStorage.setItem("token", res.data.token);

      // redirect to admin dashboard
      navigate("/admin");
    } catch (err) {
  console.log("LOGIN ERROR:", err.response?.data);
  setError(err.response?.data?.message || "Login failed");
}
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 400, margin: "auto" }}>
        <h2>Admin Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={login} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
