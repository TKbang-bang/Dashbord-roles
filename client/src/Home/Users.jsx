import React, { useContext, useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { userConext } from "../App";

function Users() {
  const [users, setUsers] = useState([]);
  const { User } = useContext(userConext);

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

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/users/${id}`);

      if (res.status !== 204) throw new Error(res.data.message);

      setUsers(users.filter((user) => user.user_id !== id));
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };

  return (
    <section className="users_container  container">
      <ul className="users_list">
        {users.map((user) => (
          <li key={user.user_id} className="user_item">
            <h3 className="user_name">{user.name}</h3>
            <span className="user_role">{user.role}</span>
            {User.role === "admin" && (
              <>
                <Link to={`/edit/${user.user_id}`}>Edit role</Link>
                <button onClick={() => handleDelete(user.user_id)}>
                  Delete User
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
