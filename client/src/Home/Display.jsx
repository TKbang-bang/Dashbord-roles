import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Products from "./Products";
import CreateProduct from "./CreateProduct";
import Users from "./Users";

function Display({ user }) {
  return (
    <div className="display">
      <aside>
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
          <li>
            <NavLink to="/logs">Logs</NavLink>
          </li>
        </ul>
      </aside>

      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default Display;
