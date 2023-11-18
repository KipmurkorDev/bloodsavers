import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { donorId } = useParams();

  useEffect(() => {
    const fetchDonorDetails = async () => {
      const accessToken = localStorage.getItem("token");

      try {
        const response = await axios.get(`${baseUrl}/blood-savers/${donorId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          setDonor(response.data.data);
          setError(null);
        } else {
          setError(`Error: ${response.data.message}`);
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchDonorDetails();
  }, [donorId]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white">
      <div className="max-w-md p-6 mx-auto bg-white rounded-md shadow-md mt-8">
        {loading && <p className="text-gray-600">Loading...</p>}

        {error && (
          <div className="text-red-600 mb-4">
            <p>{error}</p>
          </div>
        )}

        {donor && (
          <>
            <img
              src={donor.profile}
              alt={`${donor.name}'s Profile`}
              className="mb-4 rounded-full w-32 h-32 object-cover mx-auto"
            />
            <div className="mb-4 text-2xl font-semibold">{donor.name}</div>

            <div className="mb-4">
              <span className="font-semibold">City:</span> {donor.city}
            </div>

            <div className="mb-4">
              <span className="font-semibold">State:</span> {donor.state}
            </div>

            <div className="mb-4">
              <span className="font-semibold">Country:</span> {donor.country}
            </div>

            <div className="mb-4">
              <span className="font-semibold">Blood Group:</span>{" "}
              {donor.bloodGroup}
            </div>

            <div>
              <span className="font-semibold">Phone Number:</span> {donor.phone}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
