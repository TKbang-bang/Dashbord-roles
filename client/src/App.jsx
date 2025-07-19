import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home/Home";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import { useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname == "/") navigate("/dashboard");
  }, []);

  return (
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
