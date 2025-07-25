import React, { useEffect, createContext, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home/Home";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import axios from "axios";
import SignUpPlus from "./auth/SignupPlus";
import { setAccessToken } from "./services/token.service";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export const userConext = createContext();

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get("/protected/users");

        if (res.status !== 200) throw new Error(res.data.message);
        if (!res.headers["access-token"])
          throw new Error("Access token not found");

        setAccessToken(res.headers["access-token"]);
        setUser(res.data);

        if (window.location.pathname == "/") navigate("/products");
      } catch (error) {
        console.error(error.response ? error.response.data : error);
        navigate("/signin");
      }
    };

    verify();
  }, []);

  return (
    <userConext.Provider value={{ User: user }}>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/plus" element={<SignUpPlus />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </userConext.Provider>
  );
}

export default App;
