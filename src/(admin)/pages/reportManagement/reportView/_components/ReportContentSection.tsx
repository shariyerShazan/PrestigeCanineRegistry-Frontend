import { Badge } from "@/components/ui/badge";

const ReportContentSection = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-5">
    <h3 className="font-bold text-lg text-gray-800">Report Content</h3>
    
    <div>
      <p className="text-sm text-gray-800 uppercase font-semibold mb-2">Reason for Report</p>
      <Badge className="bg-[#DBEAFE] text-[#193CB8] !rounded-md hover:bg-[#c2dcfd] border-none px-4 py-2 font-medium">
        Incorrect Information
      </Badge>
    </div>

    <div>
      <p className="text-sm text-gray-800 uppercase font-semibold mb-2">Subject</p>
      <div className="bg-gray-50/50 p-4 rounded-lg border border-[#F9FAFB] font-bold text-gray-800">
        DNA Percentage Discrepancy
      </div>
    </div>

    <div>
      <p className="text-sm  text-gray-800 uppercase font-semibold mb-2">Detailed Description</p>
      <div className="bg-gray-50/50 p-4 rounded-lg border border-[#F9FAFB] text-sm text-gray-600 leading-relaxed">
        The DNA breakdown percentages listed don't match the breed characteristics shown in the photos. 
        The dog appears to have more German Shepherd traits than indicated.
      </div>
    </div>
  </div>
);

export default ReportContentSection;