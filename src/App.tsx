import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
};

export default App;
