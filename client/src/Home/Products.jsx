import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";

function Products({ user }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get("/products");

        if (res.status !== 200) throw new Error(res.data.message);

        setProducts(res.data);
      } catch (error) {
        console.log(error.response ? error.response.data : error);
      }
    };

    getProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/products/${id}`);

      if (res.status !== 204) throw new Error(res.data.message);

      return setProducts(
        products.filter((product) => product.product_id !== id)
      );
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };

  return (
    <div className="products container">
      {user.role != "viewer" && (
        <Link to="/createproduct" className="btn">
          Create Product
        </Link>
      )}

      <ul className="products_list">
        {products.map((product) => {
          return (
            <li key={product.product_id}>
              <img
                src={`http://localhost:3000/images/${product.path}`}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <button
                className="del"
                onClick={() => handleDelete(product.product_id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Products;
