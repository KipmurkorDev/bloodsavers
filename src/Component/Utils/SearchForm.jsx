import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({ bloodGroup: "A+" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/donors/search?name=${searchQuery}&bloodGroup=${formData.bloodGroup}`
    );
  };

  return (
    <form
      className="flex flex-col sm:flex-row items-center justify-center w-full my-4 gap-2"
      onSubmit={handleSubmit}
    >
      <div className="mb-4 sm:mb-0 sm:mr-4 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search by name, city, or country"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-solid border-gray-300 rounded focus:outline-none focus:border-gray-700 px-5 py-1 w-full"
        />
      </div>
      <div className="w-full sm:w-auto">
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="border border-solid border-gray-300 rounded focus:outline-none focus:border-gray-700 px-5 py-1 w-full"
        >
          {bloodGroupOptions.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      <button className="search-button bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent rounded-full px-5 py-1">
        Search
      </button>
    </form>
  );
}

const bloodGroupOptions = ["A+", "A-", "B+", "B-", "O+", "O-"];

export default SearchForm;
