import { useState } from "react";
import api from "./api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password
      });
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>

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

      <button onClick={submit}>Login</button>
    </div>
  );
}

export default Login;
