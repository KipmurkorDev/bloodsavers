import React, { useState, useEffect } from "react";
import axios from "axios";
import DetailCard from "../../Component/Utils/DetailCard";
import SearchForm from "../../Component/Utils/SearchForm";
const baseUrl = import.meta.env.VITE_APP_API_URL;

function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get(`${baseUrl}/blood-savers`);

        if (response.status === 200) {
          setDonors(response.data.data);
        } else {
          setError("Error fetching donor data");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching donor data");
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  return (
    <div>
      {error && <p className="text-red-600">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600">Loading...</p>{" "}
        </div>
      ) : (
        <>
          <SearchForm />
          <div className="my-6 text-black-700 text-lg mx-4">
            These are the people who can help you with their blood. Reach out to
            them if you need assistance.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-14">
            {donors.map((donor) => (
              <DetailCard key={donor._id} donor={donor} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Donors;
