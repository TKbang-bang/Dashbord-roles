import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./sign.css";
import axios from "axios";
import { setAccessToken } from "../services/token.service";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/signin", {
        email,
        password,
      });

      if (res.status !== 200) throw new Error(res.data.message);

      setAccessToken(res.data.accessToken);

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>

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

        <button>Sign In</button>

        <p>
          Don't have an account yet? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
