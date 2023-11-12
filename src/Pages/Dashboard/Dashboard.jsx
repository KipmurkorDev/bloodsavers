import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <div className="flex-grow p-4 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          <div className="card shadow-lg">
            <div className="cardHeader">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Total Donations
              </h2>
            </div>
            <div className="cardBody">
              <div className="text-3xl font-bold">15</div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                +3 from last month
              </p>
            </div>
          </div>

          <div className="card">
            <div className="cardHeader">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Total Donations
              </h2>
            </div>
            <div className="cardBody">
              <div className="text-3xl font-bold">15</div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                +3 from last month
              </p>
            </div>
          </div>

          <div className="card">
            <div className="cardHeader">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Total Donations
              </h2>
            </div>
            <div className="cardBody">
              <div className="text-3xl font-bold">15</div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                +3 from last month
              </p>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;
