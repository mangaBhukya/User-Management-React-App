// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
