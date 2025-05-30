import React, { useState, useEffect } from "react";
import { loginUser } from "../services/userApi";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("...........");
  const [error, setError] = useState("");
  const [onSuccess, setOnSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const passwordValue = process.env.REACT_APP_LOGIN_PASSWORD;
    try {
      if (!isValidEmail) {
        setError("Please enter a valid email address");
        return;
      }
      const data = await loginUser(email, passwordValue);
      localStorage.setItem("token", data.token);
      setOnSuccess("Login successful!");
      navigate("/users");
    } catch (error) {
      setError(error.error || "Invalid email or password. Please try again.");
    }
  };
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
        <Typography variant="h5" gutterBottom align="center" color="primary">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            error={!isValidEmail(email) && email !== ""}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            fullWidth
            margin="normal"
            required
          />
          {error && (
            <Typography variant="h5" gutterBottom align="center" color="error">
              {error}
            </Typography>
          )}
          {onSuccess && (
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              color="success"
            >
              {onSuccess}
            </Typography>
          )}
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
            disabled={error !== "" || email === "" || password === ""}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
