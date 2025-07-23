import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await api.get("/users/all");

        if (res.status !== 200) throw new Error(res.data.message);

        setUsers(res.data);
      } catch (error) {
        console.log(error.response ? error.response.data : error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="users_container  container">
      <table className="users_list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.user_id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td className="actions">
                  <Link to={`/edit/${user.user_id}`}>Edit role</Link>
                  <button>Delete User</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
