import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home/Home";
import Navbar from "./Component/Navbar/Navbar";
import AuthNav from "./Component/Navbar/AuthNav";
import LogoNav from "./Component/Navbar/LogoNav"; // Import LogoNav
import Dashboard from "./Pages/Dashboard/Dashboard";
import Donate from "./Pages/Donate/Donate";
import Footer from "./Component/Footer/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuthPage =
    useLocation().pathname === "/login" || useLocation().pathname === "/signup";

  const home = useLocation().pathname === "/home";

  return (
    <>
      {!isAuthPage && !isLoggedIn ? <AuthNav /> : null}
      {isAuthPage ? <LogoNav /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
      {home ? <Footer /> : null}
    </>
  );
}

export default App;
