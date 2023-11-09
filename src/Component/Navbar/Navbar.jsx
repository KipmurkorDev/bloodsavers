import {useState} from "react";
import Logo from "../../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import Modal from "../Home/Modal";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({isLoggedIn}) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  }

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
          <button className="bg-black rounded-[10px] py-3 px-4 font-medium" onClick={handleModal}>Send Alert</button>
        </div>
      </div>
  );
};

export default Navbar;
