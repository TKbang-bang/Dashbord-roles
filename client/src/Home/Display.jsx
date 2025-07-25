import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Products from "./Products";
import CreateProduct from "./CreateProduct";
import Users from "./Users";
import Edit from "./Edit";
import Logs from "./Logs";
import { userConext } from "../App";

function Display() {
  const { User } = React.useContext(userConext);
  return (
    <div className="display">
      <aside>
        <ul>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          {User.role != "viewer" && (
            <>
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
            </>
          )}
        </ul>
      </aside>

      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </div>
  );
}

export default Display;
