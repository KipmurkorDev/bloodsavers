import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "A+",
  });
  const [error, setError] = useState(null); // State to manage API call errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    async function getDonors() {
      const response = await axios.get(`${baseUrl}/blood-savers`);
      setDonors(response.data.data);
    }
    getDonors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${baseUrl}/blood-savers/search?name=${searchQuery}&bloodGroup=${formData.bloodGroup}`
      );
      console.log(response);

      setDonors(response.data.data);
      setError(null); // Reset error state on successful API call
    } catch (error) {
      console.error("Error fetching donors", error);
      setError("Error fetching donors. Please try again."); // Set error message
    }
  };
  return (
    <div className="mx-8 py-10">
      <h2 className="text-4xl font-bold">Search for donors</h2>
      <div>
        <form
          action=""
          className="flex justify-between my-4"
          onSubmit={handleSubmit}
        >
          <div className="formOne">
            <input
              type="text"
              placeholder="Search by name, city or country"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[585px] h-[3em] bg-white rounded-[10px] border-2 border-stone-500 placeholder:text-stone-400 placeholder:text-sm font-medium px-3"
            />
          </div>
          <div className="formTwo">
            <select
              name="bloodGroup"
              id=""
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-[585px] h-[3em] bg-white rounded-[10px] border-2 border-stone-500 placeholder:text-stone-400 placeholder:text-sm font-medium px-3"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <button className="bg-red-800 rounded-[10px] py-3 px-4 font-medium text-white">
            Search
          </button>
        </form>
        {error ? (
          <div className="flex justify-center items-center">
            <p className="text-2xl font-bold text-red-800">{error}</p>
          </div>
        ) : donors.length ? (
          <div className="grid grid-cols-3 gap-4">
            {donors.map((donor) => (
              <div
                className="bg-white rounded-[10px] shadow-md p-4"
                key={donor?.id}
              >
                <div className="flex justify-between mt-4">
                  <div className="flex gap-4">
                    <div className="w-[50px] h-[50px] rounded-full bg-gray-300">
                      <img src={donor?.profile} alt="Donor Profile" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{donor?.name}</h3>
                      <p className="text-sm">{donor?.bloodGroup}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      className="bg-red-800 rounded-[10px] py-2 px-4 font-medium text-white"
                      onClick={() => {
                        console.log("View Profile clicked");
                      }}
                    >
                      View Profile
                    </button>
                    <button
                      className="bg-red-800 rounded-[10px] py-2 px-4 font-medium text-white"
                      onClick={() => {
                        console.log("Message clicked");
                      }}
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-2xl font-bold">No donors found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donors;
