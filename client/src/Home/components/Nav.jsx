import React from "react";
import {
  removeAccessToken,
  setAccessToken,
} from "../../services/token.service";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Nav({ user }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await api.delete("/logout");

      if (res.status !== 204) throw new Error(res.data.message);

      removeAccessToken();
      setAccessToken(null);

      navigate("/signin");
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };

  return (
    <nav>
      <a href="/">
        <h1>Dashboard</h1>
      </a>
      <div className="user">
        <h3>{user.name}</h3>
        <div className="session">
          <button onClick={handleLogout}>Logout</button>
          <button>Delete Account</button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
