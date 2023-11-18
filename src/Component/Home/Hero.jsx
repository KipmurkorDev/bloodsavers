import React from "react";
import { Link } from "react-router-dom";
import bannerImg from "../../assets/banner.png";

const Hero = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${bannerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "60vh",
  };

  return (
    <div
      className="h-[60vh] py-10 text-center rounded-2xl my-10 mx-8 text-white"
      style={backgroundImageStyle}
    >
      <div className="flex flex-col items-center justify-center h-full px-4">
        <h1 className="text-4xl sm:text-2xl sm:font-semibold text-center font-extrabold mb-4">
          Donate blood, Save lives
        </h1>
        <p className="text-lg mb-8 font-medium">
          Your blood donation can give a precious smile to someone's face. Join
          our community of donors today.
        </p>
        <div className="space-x-4">
          <Link to="/donate">
            <button className="px-4 py-2 bg-white text-rose-500 rounded-lg transition hover:duration-500 ease-in-out hover:bg-rose-500 hover:text-white">
              Donate Now
            </button>
          </Link>
          <Link to="/seek-blood">
            <button className="px-4 py-2 bg-transparent text-white rounded-lg border border-white transition hover:duration-500 ease-in-out hover:bg-white hover:text-rose-500">
              Seek blood
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
