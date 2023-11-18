import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailCard from "./DetailCard";
const Home = () => {
  const [donors, setDonors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ bloodGroup: "A+" });
  const [error, setError] = useState(null);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { id } = useParams();
  const donorDashboard = donors.filter((donor) => donor._id === parseInt(id));

  useEffect(() => {
    async function getDonors() {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/blood-savers`);
        setDonors(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donors", error);
        setError("Error fetching donors. Please try again.");
        setLoading(false);
      }
    }
    getDonors();
  }, [formData.bloodGroup]);

  useEffect(() => {
    if (donors) {
      const filtered = donors.filter(
        (donor) =>
          (donor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            donor.bloodGroup.toLowerCase() ===
              formData.bloodGroup.toLowerCase()) ||
          donor.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          donor.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDonors(filtered);
    }
  }, [searchQuery, formData.bloodGroup, donors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/blood-savers/search?name=${searchQuery}&bloodGroup=${formData.bloodGroup}`
      );

      setDonors(response.data.data);
      setFilteredDonors(response.data.data);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching donors", error);
      setError("Error fetching donors. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-8 py-10">
      <h2 className="text-4xl font-bold">Search for donors</h2>
      <div>
        <form
          action=""
          className="flex justify-between w-[100%] my-4 flex-col sm:flex-row gap-2"
          onSubmit={handleSubmit}
        >
          <div className="formOne mb-4 sm:mb-0 sm:mr-4">
            <input
              type="text"
              placeholder="Search by name, city, or country"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[200px] sm:text-sm h-[3em] bg-white rounded-[10px] border-2 border-stone-500 placeholder:text-stone-400 placeholder:text-sm font-medium px-3"
            />
          </div>
          <div className="formTwo">
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full sm:w-[200px] sm:text-sm h-[3em] bg-white rounded-[10px] border-2 border-stone-500 placeholder:text-stone-400 placeholder:text-sm font-medium px-3"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <button
            className="bg-red-800 rounded-[10px] py-3 px-4 font-medium text-white"
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </form>

        {loading && <p>Loading...</p>}

        {filteredDonors.length === 0 && !error && !loading && (
          <p className="text-red-500">Donor not found. Please try again.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredDonors.map((donor) => (
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
