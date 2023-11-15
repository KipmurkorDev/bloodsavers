import React from 'react';
import { donorTableData } from '../../data';

const DonorTable = () => {
  return (
    <div className="overflow-x-auto px-2 md:px-10 pb-10">
      <table className="min-w-full bg-white border border-gray-200 rounded-xl">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-4 px-2 md:px-4 border-b border-gray-200">Date</th>
            <th className="py-4 px-2 md:px-4 border-b border-gray-200">Location</th>
            <th className="py-4 px-2 md:px-4 border-b border-gray-200">Blood Type</th>
            <th className="py-4 px-2 md:px-4 border-b border-gray-200 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {donorTableData.map((item, index) => (
            <tr key={index} className='bg-white hover:bg-gray-50'>
              <td className="py-4 px-2 md:px-4 border-b border-gray-200">{item.date}</td>
              <td className="py-4 px-2 md:px-4 border-b border-gray-200">{item.location}</td>
              <td className="py-4 px-2 md:px-4 border-b border-gray-200">{item.bloodType}</td>
              <td className="py-4 px-2 md:px-4 border-b border-gray-200 text-right">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonorTable;
