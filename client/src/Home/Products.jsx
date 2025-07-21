import React from "react";
import { Link } from "react-router-dom";

function Products() {
  return (
    <div className="products container">
      <Link to="/createproduct" className="btn">
        Create Product
      </Link>

      <div className="products_list">
        <h1>Products</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          doloribus explicabo ipsa quod obcaecati molestiae repellendus
          similique soluta enim optio illum nisi nemo quasi, nesciunt ullam
          laudantium quibusdam vero corporis?
        </p>
      </div>
    </div>
  );
}

export default Products;
