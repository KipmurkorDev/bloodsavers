import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../../Component/Utils/SearchForm";
import axios from "axios";
import DetailCard from "../../Component/Utils/DetailCard";
const baseUrl = import.meta.env.VITE_APP_API_URL;

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const bloodGroup = searchParams.get("bloodGroup");
  const [results, setResults] = useState([]);
  console.log(name, bloodGroup);
  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://blood-savers-api.vercel.app/blood-savers/search?name=${name}&bloodGroup=${bloodGroup}`
        );
        setResults(response.data.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    getSearchResults();
  }, [name, bloodGroup]);

  return (
    <div className="p-6 mb-6">
      <SearchForm />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {results?.map((donor) => (
          <DetailCard donor={donor} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
