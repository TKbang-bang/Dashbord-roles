import "./home.css";
import Nav from "./components/Nav";
import Display from "./Display";
import { Route, Routes } from "react-router-dom";

function Home() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="*" element={<Display />} />
      </Routes>
    </div>
  );
}

export default Home;
