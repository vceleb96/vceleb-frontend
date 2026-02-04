import { useState, useEffect } from "react";
import Login from "./Login";
import Admin from "./Admin";
import Home from "./Home";

function App() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLogged(true);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLogged(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <Home />

      <hr />

      {logged ? (
        <>
          <button onClick={logout}>Logout</button>
          <Admin />
        </>
      ) : (
        <Login onLogin={() => setLogged(true)} />
      )}
    </div>
  );
}

export default App;
