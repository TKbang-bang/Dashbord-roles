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
    <div className="users_container container">
      <table className="users_list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th className="actions">New Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td className="actions">
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  placeholder="New Role"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                />
                <button type="submit" className="update">
                  Update
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Edit;
