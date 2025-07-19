import React, { useEffect } from "react";
import api from "../services/api";
import { getAccessToken } from "../services/token.service";

function Home() {
  const getVerify = async () => {
    try {
      const res = await api.get("/");

      // console.log(res.data);
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };

  useEffect(() => {
    getVerify();
  }, []);

  return (
    <div>
      <h1>Welcome Home</h1>
      <button onClick={getVerify}>Verify</button>
      <button onClick={() => console.log(getAccessToken())}>Get token</button>
    </div>
  );
}

export default Home;
