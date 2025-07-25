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

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile)
      setName(selectedFile.name.split(".")[0].replace(/[_-]/g, " "));
    else setName("");
  };

  return (
    <div className="createproduct container">
      <form onSubmit={handleSubmit}>
        <div className="img_container">
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleImageChange}
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
