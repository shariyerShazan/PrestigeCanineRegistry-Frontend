import { FaCheck } from "react-icons/fa6";
import { RiRadioButtonLine } from "react-icons/ri";
import { HiOutlineBolt } from "react-icons/hi2";

type HealthProps = {
  status?: string;
  vaccinations?: string[];
  clearances?: string[];
};

const RegistryHealthSummaryDog = ({
  status = "Excellent",
  vaccinations = [],
  clearances = [],
}: HealthProps) => {
  return (
    <div className="bg-[#121212] text-white p-6 rounded-xl font-sans shadow-xl border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#2A2418] p-2 rounded-lg">
            <HiOutlineBolt className="text-[#D4A017] text-2xl" />
          </div>
          <h2 className="text-lg font-bold tracking-tight">Health Summary</h2>
        </div>
        <div className="flex items-center gap-2 bg-[#0E2A1A] px-3 py-1 rounded-full border border-[#1B432C]">
          <span className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse"></span>
          <span className="text-[#4ADE80] text-xs font-bold uppercase">
            {status}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-widest">
          Vaccinations
        </h3>
        <div className="flex flex-wrap gap-2">
          {vaccinations.length > 0 ? (
            vaccinations.map((v) => (
              <div
                key={v}
                className="flex items-center gap-2 bg-[#262626] px-3 py-1.5 rounded-lg text-gray-300 text-xs border border-gray-700"
              >
                <FaCheck className="text-[10px] text-[#D4AF37]" />
                {v}
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-600">None selected</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-widest">
          Clearances
        </h3>
        <ul className="space-y-2">
          {clearances.length > 0 ? (
            clearances.map((c) => (
              <li key={c} className="flex items-center gap-3 text-gray-300">
                <RiRadioButtonLine className="text-[#4ADE80] text-md" />
                <span className="text-xs">{c.replace(/_/g, " ")}</span>
              </li>
            ))
          ) : (
            <p className="text-xs text-gray-600">No clearances reported</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RegistryHealthSummaryDog;
