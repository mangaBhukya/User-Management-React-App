import React from "react";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/users" element={<ProtectedRoute element={<UserList />} />} />
      </Routes>
    </Router>
  );
};

export default App;