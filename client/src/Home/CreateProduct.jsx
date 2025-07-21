import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateProduct() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file || !name) return alert("Please fill all the fields");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);

      const res = await api.post("/products", formData);

      if (res.status !== 201) throw new Error(res.data.message);

      navigate("/products");
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };

  return (
    <div className="createproduct container">
      <form onSubmit={handleSubmit}>
        <h1>Create Product</h1>

        <div className="img_container">
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file ? (
            <img src={URL.createObjectURL(file)} alt="product" />
          ) : (
            <label htmlFor="file"> + Select Image</label>
          )}
        </div>

        {file && (
          <label className="btn_secondary" htmlFor="file">
            Change file 🔁
          </label>
        )}

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default CreateProduct;
