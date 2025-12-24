import { TbInfoTriangle } from "react-icons/tb";

export const ActionRequiredAlert = () => (
  <div className="bg-[#FEE685]/30 border border-[#FEE685] p-4 rounded-xl flex items-start gap-3">
    <span className="text-[#E17100] text-xl"><TbInfoTriangle /></span>
    <div>
      <h4 className="font-bold text-[#7B3306]">Action Required</h4>
      <p className="text-sm text-[#7B3306]">This report has not been reviewed yet. Please review the details and take appropriate action.</p>
    </div>
  </div>
);