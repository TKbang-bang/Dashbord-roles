import "./home.css";
import Display from "./Display";
import { Route, Routes, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userConext } from "../App";
import api from "../services/api";
import { removeAccessToken } from "../services/token.service";

function Home() {
  const { User } = useContext(userConext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.delete("/logout");

      if (res.status !== 204) throw new Error(res.data.message);

      removeAccessToken();
      navigate("/signin");
      window.location.reload();
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };

  return (
    <div className="home">
      <header>
        <a href="/products">
          <h1>Dashboard</h1>
        </a>
        <div className="user">
          <h3>{User.name}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {User.role !== "viewer" && (
        <nav>
          <ul>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/createproduct">Create Product</NavLink>
            </li>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
            {User.role == "admin" && (
              <li>
                <NavLink to="/logs">Logs</NavLink>
              </li>
            )}
          </ul>
        </nav>
      )}

      <Routes>
        <Route path="*" element={<Display />} />
      </Routes>
    </div>
  );
}

export default Home;
