import { useState, useEffect } from "react";
import { bloodDashboardData, donorTableData } from "../../data";
import { useParams } from "react-router-dom";
import axios from "axios";
import DonorTable from "../../Component/Dashboard/DonorTable";

const Dashboard = () => {
  const { donorId } = useParams();
  const [donor, setDonor] = useState(null);
  const [error, setError] = useState(null);

  const fetchDonorDetails = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(
        `https://blood-savers-api.vercel.app/blood-savers/${donorId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Compare the id from the API to the donorId from the URL
      if (response.data.data._id === donorId) {
        setDonor(response.data.data);
      } else {
        setError("Error fetching data");
      }
    } catch (error) {
      console.log(error);
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    // Check if donorId exists before making the API call
    if (donorId) {
      // Set donorId in localStorage after a successful fetch
      fetchDonorDetails();
      localStorage.setItem("donorId", donorId);
    }
  }, [donorId]);

  console.log(donor);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <div className="flex-grow p-4 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bloodDashboardData.map((item) => {
            return (
              <div
                key={item.id}
                className="card shadow-lg shadow-stone-300 flex flex-col gap-4 py-6 px-3 rounded-lg "
              >
                <div className="cardHeader">
                  <h2 className="text-3xl font-semibold text-rose-900 font-['Inter']">
                    {item.title}
                  </h2>
                </div>
                <div className="cardBody">
                  <div className="text-3xl font-bold">{item.value}</div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {item.frequency}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <DonorTable />
    </div>
  );
};

export default Dashboard;
