import { FiCalendar } from "react-icons/fi";

export const ReportStatusSection = () => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
    <h3 className="font-bold text-lg mb-4 text-gray-800">Report Status</h3>
    <div className="flex gap-10">
      <div>
        <p className="text-xs text-gray-400 mb-2">Current Status</p>
        <span className="bg-[#FFE2E2] text-[#9F0712] px-4 py-1.5 rounded-md text-sm font-semibold">Unread</span>
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-2">Priority Level</p>
        <span className="bg-[#FFE2E2] text-[#9F0712] px-4 py-1.5 rounded-md text-sm font-semibold">High Priority</span>
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-2">Report Date</p>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <span className="text-gray-400"><FiCalendar /></span> 11/28/2024, 10:30:00 AM
        </div>
      </div>
    </div>
  </div>
);