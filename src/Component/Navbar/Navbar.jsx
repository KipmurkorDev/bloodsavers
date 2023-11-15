import { useState } from "react";
import { useParams } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./Modal";

const Navbar = ({isLoggedIn}) => {
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();



  // const urlMatch = useLocation().pathname === "/dashboard";


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
          <NavLink to={`/dashboard/${id}`} activeClassName='active'>Dashboard</NavLink>
        </div>
        <div>
          <button className="bg-black rounded-[10px] py-3 px-4 font-medium" onClick={handleModal}>Send Alert</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)} />
          )}
        </div>
      </div>
  );
};

export default Navbar;
