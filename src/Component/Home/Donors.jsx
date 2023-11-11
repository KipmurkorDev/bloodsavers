import {useState, useEffect} from "react";
import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const Donors = () => {

  // work on the search query using the useEffect hook and the api
  const [donors, setDonors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${baseUrl}/blood-savers/search?name=${searchQuery}&bloodGroup=${formData.bloodGroup}`);
      setDonors(response.data);
    } catch (error) {
      console.error("Error fetching donors", error);
    }
  };

  useEffect(() => {
  }, [searchQuery, formData.bloodGroup]);





  return (
    <div className="mx-8 py-10">
      <h2 className=" text-4xl font-bold">Search for donors</h2>
      <div>
        <form action="" className="flex justify-between my-4" onSubmit={handleSubmit}>
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
            className="w-[585px] h-[3em] bg-white rounded-[10px] border-2 border-stone-500 placeholder:text-stone-400 placeholder:text-sm font-medium px-3">
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <button className="bg-red-800 rounded-[10px] py-3 px-4 font-medium text-white">Search</button>
        </form>
        {donors ? (
          <div className="grid grid-cols-3 gap-4">
            {donors.map((donor) => (
              <div className="bg-white rounded-[10px] shadow-md p-4">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <div className="w-[50px] h-[50px] rounded-full bg-gray-300"></div>
                    <div>
                      <h3 className="text-xl font-bold">{donor.name}</h3>
                      <p className="text-sm">{donor.bloodGroup}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="bg-red-800 rounded-[10px] py-2 px-4 font-medium text-white">View Profile</button>
                    <button className="bg-red-800 rounded-[10px] py-2 px-4 font-medium text-white">Message</button>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex gap-4">
                    <div className="w-[50px] h-[50px] rounded-full bg-gray-300"></div>
                    <div>
                      <h3 className="text-xl font-bold">{donor.name}</h3>
                      <p className="text-sm">{donor.bloodGroup}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="bg-red-800 rounded-[10px] py-2 px-4 font-medium text-white">View Profile</button>
                    <button className="bg-red-800 rounded-[10px] py-2 px-4 font-medium text-white">Message</button>
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
