import React from "react";
import { NavLink } from "react-router-dom";

function Display({ user }) {
  return (
    <div className="display">
      <aside>
        <ul>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/products">Users</NavLink>
          </li>
          <li>
            <NavLink to="/products">Logs</NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Display;
