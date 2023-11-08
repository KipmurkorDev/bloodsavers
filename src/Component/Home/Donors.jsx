import React from "react";

const Donors = () => {
  return (
    <div className="mx-8 py-10">
      <h2 className=" text-4xl font-bold">Search for donors</h2>
      <div>
        <form action="" className="flex justify-between my-4">
          <div className="formOne">
            <input type="text" placeholder="Search by name, city or country" className="w-[585px] h-[3em] bg-white rounded-[10px] border-2 border-stone-500 placeholder:text-stone-400 placeholder:text-sm font-medium px-3" />
          </div>
          <div className="formTwo">
            <select name="bloodGroup" id="" className="w-[585px] h-[3em] bg-white rounded-[10px] border-2 border-stone-500 placeholder:text-stone-400 placeholder:text-sm font-medium px-3">
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
      </div>
    </div>
  );
};

export default Donors;
