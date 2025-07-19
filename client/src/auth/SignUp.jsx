import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./sign.css";
import axios from "axios";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      if (res.status !== 201) throw new Error(res.data.message);

      navigate("/signin");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <div className="field_container">
          <label htmlFor="">First name</label>
          <input
            type="text"
            placeholder=" "
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="field_container">
          <label htmlFor="">Last name</label>
          <input
            type="text"
            placeholder=" "
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="field_container">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder=" "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field_container">
          <label htmlFor="">Password</label>
          <input
            type={seePassword ? "text" : "password"}
            placeholder=" "
            required
            min={6}
            max={12}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setSeePassword(!seePassword)}>
            {seePassword ? "Hide" : "Show"}
          </span>
        </div>

        <button>Sign Up</button>

        <p>
          Do you already have an account? <a href="/signin">Sign in</a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
