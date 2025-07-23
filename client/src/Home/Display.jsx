import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Products from "./Products";
import CreateProduct from "./CreateProduct";
import Users from "./Users";
import Edit from "./Edit";
import Logs from "./Logs";

function Display({ user }) {
  return (
    <div className="display">
      <aside>
        <ul>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          {user.role != "viewer" && (
            <>
              <li>
                <NavLink to="/createproduct">Create Product</NavLink>
              </li>

              <li>
                <NavLink to="/users">Users</NavLink>
              </li>

              {user.role == "admin" && (
                <>
                  <li>
                    <NavLink to="/logs">Logs</NavLink>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </aside>

      <Routes>
        <Route path="/products" element={<Products user={user} />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/users" element={<Users User={user} />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </div>
  );
}

export default Display;
