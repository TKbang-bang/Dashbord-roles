import React from "react";

function Nav({ user }) {
  return (
    <nav>
      <a href="/dashboard">
        <h1>Dashboard</h1>
      </a>
      <div className="user">
        <h3>{user.name}</h3>
        <div className="session">
          <button>Logout</button>
          <button>Delete Account</button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
