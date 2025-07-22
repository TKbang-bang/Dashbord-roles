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
          <th>Name</th>
          <th>Role</th>
          <th className="actions">Actions</th>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.user_id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td className="actions">
                  <Link to={`/users/${user.user_id}`}>Edit role</Link>
                  <button>Delete User</button>
                </td>
              </tr>
            );
          })}
        </tbody>
        {/* {users.map((user) => {
          return (
            <li key={user.user_id}>
              <h3>{user.name}</h3>
              <p>{user.role}</p>
              <Link>Edit role</Link>
              <button>Delete User</button>
            </li>
          );
        })} */}
      </table>
    </div>
  );
}

export default Users;
