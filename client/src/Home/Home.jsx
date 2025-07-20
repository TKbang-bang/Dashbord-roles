import React, { useEffect, useState } from "react";
import api from "../services/api";
import { getAccessToken } from "../services/token.service";
import "./home.css";
import Nav from "./components/Nav";
import Display from "./Display";

function Home() {
  const [user, setUser] = useState({});

  const getVerify = async () => {
    try {
      const res = await api.get("/user");

      if (res.status !== 200) throw new Error(res.data.message);

      setUser(res.data);
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };

  useEffect(() => {
    getVerify();
  }, []);

  return (
    <div>
      <Nav user={user} />
      <Display user={user} />
    </div>
  );
}

export default Home;
