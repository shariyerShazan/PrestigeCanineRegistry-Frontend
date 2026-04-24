"use client";

import { FaCheck } from "react-icons/fa6";
import { RiRadioButtonLine } from "react-icons/ri";
import { HiOutlineBolt } from "react-icons/hi2";

type HealthSummaryProps = {
  vaccinations?: string[];
  clearances?: string[];
  healthStatus?: string;
};

const LitterRegistryHealthSummaryDog = ({
  vaccinations = [],
  clearances = [],
  healthStatus = "Excellent",
}: HealthSummaryProps) => {
  // Step 1 er value gulor sathe label matching er jonno mapping
  const vaxLabels: Record<string, string> = {
    RABIES: "Rabies",
    DHPP: "DHPP",
    BORDETELLA: "Bordetella",
    LEPTOSPIROSIS: "Leptospirosis",
    LYME: "Lyme",
    INFLUENZA: "Influenza",
  };

  const clearanceLabels: Record<string, string> = {
    HIP_DYSPLASIA: "Hip Dysplasia Clear",
    ELBOW_CLEAR: "Elbow Clear",
    EYE_CLEARANCE_CERF: "Eye Clearance (CERF)",
    HEART_CLEARANCE: "Heart Clearance",
    PRA_CLEAR: "PRA Clear",
    DM_CLEAR: "DM Clear",
  };

  return (
    <div className="bg-[#121212] text-white p-6 rounded-lg font-sans shadow-xl border border-white/5">
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
          <span className="text-[#4ADE80] text-sm font-medium">
            {healthStatus}
          </span>
        </div>
      </div>

      {/* Vaccinations Section */}
      <div className="mb-6">
        <h3 className="text-md font-medium mb-3 text-gray-400">
          Vaccinations:
        </h3>
        <div className="flex flex-wrap gap-2">
          {vaccinations.length > 0 ? (
            vaccinations.map((vax) => (
              <div
                key={vax}
                className="flex items-center gap-2 bg-[#262626] px-3 py-2 rounded-lg text-gray-300 text-sm border border-transparent hover:border-gray-700 transition-colors"
              >
                <FaCheck className="text-xs text-[#D4AF37]" />
                {vaxLabels[vax] || vax}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">
              No vaccinations selected
            </p>
          )}
        </div>
      </div>

      {/* Health Clearances Section */}
      <div>
        <h3 className="text-md font-medium mb-3 text-gray-400">
          Health Clearances:
        </h3>
        <ul className="space-y-3">
          {clearances.length > 0 ? (
            clearances.map((clearance) => (
              <li
                key={clearance}
                className="flex items-center gap-3 text-gray-300"
              >
                <RiRadioButtonLine className="text-[#D4AF37] text-lg" />
                <span className="text-sm">
                  {clearanceLabels[clearance] || clearance}
                </span>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500 italic">
              No clearances reported
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LitterRegistryHealthSummaryDog;
