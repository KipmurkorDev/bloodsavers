import React from "react";
import Logo from "../../assets/logo.svg";
import Love from "../../assets/love.svg";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (

      <div className="flex items-center justify-between bg-red-800 text-white pt-6 pb-3 px-4 ">
        <div className="">
          <img src={Logo} alt="Logo" className="h-[2.7em]" />
        </div>
        <div className="inline-flex gap-6  text-xl font-medium">
          <NavLink to="/" activeClassName='active'>Home</NavLink>
          <NavLink to="/donate" activeClassName='active'>Donate</NavLink>
          <NavLink to="/dashboard" activeClassName='active'>Dashboard</NavLink>
        </div>
        <div>
          <button className="bg-black rounded-[10px] py-3 px-4 font-medium">Send Alert</button>
        </div>
      </div>
  );
};

export default Navbar;
