import "./home.css";
import Display from "./Display";
import { Route, Routes, NavLink } from "react-router-dom";
import { useContext } from "react";
import { userConext } from "../App";

function Home() {
  const { User } = useContext(userConext);
  return (
    <div className="home">
      <header>
        <a href="/products">
          <h1>Dashboard</h1>
        </a>
        <div className="user">
          <h3>{User.name}</h3>
          <button>Logout</button>
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
