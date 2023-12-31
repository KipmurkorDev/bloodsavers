import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth/Login";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import { ToastContainer } from "react-toastify";
import Donors from "./Pages/Donors/Donors";
import About from "./Pages/About/ABout";
import DetailPage from "./Pages/DetailPage/DetailPage";
import HomePage from "./Pages/HomePage/HomePage";
import Patient from "./Component/Patients/Patient";
import SearchResults from "./Pages/Search/SearchResults";
function App() {
  const isAuthPage =
    useLocation().pathname === "/login" || useLocation().pathname === "/signup";

  return (
    <>
      {!isAuthPage ? <Navbar /> : null}

      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/donors" element={<Donors />} />
        <Route path="/recipient" element={<Patient />} />
        <Route path="/donor/:donorId" element={<DetailPage />} />
        <Route path="/donors/search/" element={<SearchResults />} />
      </Routes>
      {!isAuthPage ? <Footer /> : null}
    </>
  );
}

export default App;
