import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // While browser is restoring state, don't crash
  if (token === null) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default PrivateRoute;
