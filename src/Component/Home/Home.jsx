import React, { useState, useEffect } from "react";
import axios from "axios";
import DetailCard from "../Utils/DetailCard";
import SearchForm from "../Utils/SearchForm";
const Home = () => {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    async function getDonors() {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/blood-savers/heros`);
        setDonors(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donors", error);
        setError("Error fetching donors. Please try again.");
        setLoading(false);
      }
    }
    getDonors();
  }, []);

  return (
    <div className="mx-8 py-10">
      <h2 className="text-4xl font-bold">Search for donors</h2>
      <SearchForm />
      <div>
        {loading && <p>Loading...</p>}

        {donors.length === 0 && !error && !loading && (
          <p className="text-red-500">Donor not found. Please try again.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {donors.map((donor) => (
            <div key={donor._id} className="bg-white p-4 rounded-lg shadow-md">
              <DetailCard donor={donor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
