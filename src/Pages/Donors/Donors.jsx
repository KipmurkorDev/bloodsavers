import React, { useState, useEffect } from "react";
import axios from "axios";
import DetailCard from "../../Component/Home/DetailCard";
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
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {donors.map((donor) => (
            <div key={donor._id} className="bg-white p-4 rounded-md shadow-md">
              <DetailCard donor={donor} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Donors;
