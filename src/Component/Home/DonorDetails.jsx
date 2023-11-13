import React from "react";

const DonorDetails = ({donor, key}) => {
  return (
    <div className="border rounded-lg shadow-lg p-6" key={key}>
      <div className="flex gap-6 items-center">
        <img
          src={donor?.profile}
          alt={donor.name}
          width="100"
          className="h-[100px] w-[100px] rounded-full"
        />
        <div className="grid grid-rows-3">
          <div className="flex gap-3 items-center">
            <h3 className="text-2xl font-bold">{donor.name}</h3>
            <p className="text-gray-500">{donor.bloodGroup}</p>
          </div>
          <p className="text-gray-500">
            {donor.city}, {donor.country}
          </p>
          <button className=" bg-rose-800 px-5 py-2 rounded font-semibold text-white h-[2.7em]">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorDetails;
