import { Link } from "react-router-dom";
import React from "react";

const DetailCard = ({ donor }) => {
  return (
    <div className="bg-white p-4 mx-2 rounded-md shadow-sm">
      <Link to={`/donor/${donor._id}`}>
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
          <img
            src={donor?.profile}
            alt={donor.name}
            width="100"
            className="h-[100px] w-[100px] rounded-full mb-4 sm:mb-0 sm:mr-4"
          />
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold mb-2">{donor.name}</h3>
            <p className="text-black-500">{donor.bloodGroup}</p>
            <p className="text-gray-500">
              {donor.city}, {donor.country}
            </p>
            <button className="bg-rose-800 px-3 py-1 rounded font-semibold text-white mt-2">
              Contact
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DetailCard;
