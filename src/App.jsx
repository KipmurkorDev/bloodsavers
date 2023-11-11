import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home/Home";
import Navbar from "./Component/Navbar/Navbar";
import AuthNav from "./Component/Navbar/AuthNav";
import LogoNav from "./Component/Navbar/LogoNav";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Donate from "./Pages/Donate/Donate";
import Footer from "./Component/Footer/Footer";
import { ToastContainer } from "react-toastify";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  const isAuthPage =
    useLocation().pathname === "/login" || useLocation().pathname === "/signup";

  const home = useLocation().pathname === "/home";

  const Navigate = useNavigate();

  // console.log("isLoggedIn:", isLoggedIn);
  // console.log("isAuthPage:", isAuthPage);

  return (
    <>
      {!isAuthPage && !isLoggedIn ? <AuthNav /> : null}
      {isAuthPage ? <LogoNav /> : null}
      {!isAuthPage && isLoggedIn ? <Navbar isLoggedIn={isLoggedIn}  /> : null}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
      {!isAuthPage ? <Footer /> : null}
    </>
  );
}

export default App;
