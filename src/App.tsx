import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import FileUploadPersonal from "./components/FileUploadPersonal";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        {/* <Route path="/" element={<FileUploadPersonal />}></Route> */}

        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
};

export default App;
