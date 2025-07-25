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
    <>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </>
  );
}

export default Display;
