import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const [isTokenValid, setIsTokenValid] = useState(true);
  const navigate = useNavigate();

  const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) return true;
    return false;
  };

  useEffect(() => {
    if (isTokenExpired()) {
      localStorage.clear();
      setIsTokenValid(false);
      navigate("/");
    }
  }, [navigate]);

  return isTokenValid ? element : null;
};

export default ProtectedRoute;
