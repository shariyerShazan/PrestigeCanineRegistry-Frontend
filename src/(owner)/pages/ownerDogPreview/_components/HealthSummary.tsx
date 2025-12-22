

import { FaCheck } from 'react-icons/fa6';
import { RiRadioButtonLine } from 'react-icons/ri';
import { HiOutlineBolt } from "react-icons/hi2";

const HealthSummaryOfOwnerDog = () => {
  const vaccinations = ["Rabies", "DHPP", "Bordetella", "Leptospirosis"];
  const clearances = ["Hip Dysplasia Clear", "Elbow Clear", "Eye Clearance (CERF)"];

  return (
    <div className=" bg-[#121212] text-white p-6 rounded-2xl font-sans shadow-xl">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#2A2418] p-2 rounded-lg">
            <HiOutlineBolt className="text-[#D4A017] text-2xl" />
          </div>
          <h2 className="text-xl font-medium tracking-tight">Health Summary</h2>
        </div>
        <div className="flex items-center gap-2 bg-[#0E2A1A] px-3 py-1 rounded-full border border-[#1B432C]">
          <span className="w-2 h-2 bg-[#4ADE80] rounded-full"></span>
          <span className="text-[#4ADE80] text-sm font-medium">Excellent</span>
        </div>
      </div>

      {/* Vaccinations Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3">Vaccinations:</h3>
        <div className="flex flex-wrap gap-2">
          {vaccinations.map((vaccine) => (
            <div 
              key={vaccine}
              className="flex items-center gap-2 bg-[#262626] px-3 py-2 rounded-lg text-gray-300 text-sm border border-transparent hover:border-gray-700 transition-colors"
            >
              <FaCheck className="text-xs text-gray-400" />
              {vaccine}
            </div>
          ))}
        </div>
      </div>

      {/* Health Clearances Section */}
      <div>
        <h3 className="text-md font-medium mb-3">Health Clearances:</h3>
        <ul className="space-y-3">
          {clearances.map((clearance) => (
            <li key={clearance} className="flex items-center gap-3 text-gray-300">
              <RiRadioButtonLine className="text-[#4ADE80] text-lg" />
              <span className="text-sm">{clearance}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HealthSummaryOfOwnerDog;