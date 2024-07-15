import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
// import FileUploadPersonal from "./components/FileUploadPersonal";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<RedirectIfAuthenticated />}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
        </Route>

        {/* <Route path="/" element={<FileUploadPersonal />}></Route> */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
