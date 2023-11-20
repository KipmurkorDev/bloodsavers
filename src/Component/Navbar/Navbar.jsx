import { useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";

const Navbar = ({ isAuthPage }) => {
  const [showModal, setShowModal] = useState(false);
  const [IsLoggedIn, setIsLoggedIn] = useState();
  const handleModal = () => {
    setShowModal(!showModal);
  };
  const storedLoggedInStatus = localStorage.getItem("token");
  useEffect(() => {
    if (storedLoggedInStatus) {
      setIsLoggedIn(true);
    }
  }, [storedLoggedInStatus]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <>
      <div className="flex items-center justify-between bg-red-800 text-white pt-6 pb-3 px-4 ">
        <NavLink to="/" activeClassName="active">
          <div className="">
            <img src={Logo} alt="Logo" className="h-[2.7em]" />
          </div>
        </NavLink>
        <div className="inline-flex gap-6  text-xl font-medium">
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/donors" activeClassName="active">
            Donors
          </NavLink>
          <NavLink to="/recipient" activeClassName="active">
            Patients
          </NavLink>
          <NavLink to={`/about`} activeClassName="active">
            About
          </NavLink>
        </div>
        <div>
          <button
            className="bg-black rounded-[10px] py-3 px-4 font-medium"
            onClick={handleModal}
          >
            Send Alert
          </button>
          {showModal && <Modal onClose={() => setShowModal(false)} />}
        </div>
        {!IsLoggedIn || isAuthPage ? (
          <NavLink to={`/login`} activeClassName="active">
            Login
          </NavLink>
        ) : (
          <NavLink to={`/`} activeClassName="active" onClick={handleLogout}>
            Logout
          </NavLink>
        )}
      </div>
    </>
  );
};

export default Navbar;
