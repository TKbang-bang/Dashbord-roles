import React from "react";
import { useEffect } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function Edit() {
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [newRole, setNewRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get(`/users/one/${id}`);

        if (res.status !== 200) throw new Error(res.data.message);

        setUser(res.data);
      } catch (error) {
        console.log(error.response ? error.response.data : error);
      }
    };

    getUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/users/${id}`, { role: newRole });

      if (res.status !== 204) throw new Error(res.data.message);

      navigate("/users");
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };

  return (
    <section className="edit container">
      <form onSubmit={handleUpdate}>
        <h1>Edit User Role</h1>
        <div className="field_container">
          <p>Name</p>
          <h3>{user.name}</h3>
        </div>
        <div className="field_container">
          <p>Current role</p>
          <h3>{user.role}</h3>
        </div>
        <div className="field_container">
          <p>New Role</p>
          <input
            type="text"
            placeholder="Enter new role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
        </div>

        <button type="submit">Update Role</button>
        <button
          className="cancel"
          type="button"
          onClick={() => navigate("/users")}
        >
          Cancel
        </button>
      </form>
    </section>
  );
}

export default Edit;
