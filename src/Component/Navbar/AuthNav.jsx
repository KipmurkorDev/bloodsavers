import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const AuthNav = () => {
  return (
    <div className="flex items-center justify-between bg-red-800 text-white pt-6 pb-3 px-4 ">
      <div className="">
        <img src={Logo} alt="Logo" className="h-[2.7em]" />
      </div>

      <div className="inline-flex gap-4">
        <Link to="/login">
        <button className="bg-white text-black rounded-[10px] w-[100px] py-2 px-4 font-medium">
          Login
        </button>
        </Link>
        <Link to="/signup">
        <button className="bg-black rounded-[10px] w-[100px] py-2 px-4 font-medium">
          Register
        </button>
        </Link>
      </div>
    </div>
  );
};

export default AuthNav;
