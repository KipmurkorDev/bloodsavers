import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import axios from "axios";;

const DonorDetails = ({donor, key}) => {
  const { id } = useParams();



  return (
    <div className="border rounded-lg shadow-lg p-6 mb-4 sm:flex sm:items-center" >
      <div className="flex gap-6 items-center">
        <img
          src={donor?.profile}
          alt={donor.name}
          width="100"
          className="h-[100px] w-[100px] rounded-full mb-4 sm:mb-0 sm:mr-4"
        />
        <div className="grid grid-rows-3 gap-2 sm:flex sm:flex-col sm:flex-grow">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <h3 className="text-2xl font-bold mb-2 sm:mb-0">{donor.name}</h3>
            <p className="text-gray-500">{donor.bloodGroup}</p>
          </div>
          <p className="text-gray-500">
            {donor.city}, {donor.country}
          </p>
          <button className=" bg-rose-800 px-5 py-2 rounded font-semibold text-white h-[2.7em] mt-2 sm:mt-0" >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorDetails;
