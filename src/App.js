import React from "react";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default App;
