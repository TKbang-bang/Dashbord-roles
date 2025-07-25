import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
import { userConext } from "../App";

function Products() {
  const { User } = useContext(userConext);
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

      setProducts(products.filter((product) => product.product_id !== id));
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };

  return (
    <section className="products container">
      <ul className="products_list">
        {products.map((product) => {
          return (
            <li key={product.product_id}>
              <img
                src={`http://localhost:3000/images/${product.path}`}
                alt={product.name}
              />

              <article className="info">
                <h3>{product.name}</h3>

                {User.role == "admin" && (
                  <button
                    className="del"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Delete
                  </button>
                )}
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Products;
