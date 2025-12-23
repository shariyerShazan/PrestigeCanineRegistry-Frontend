
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FiSearch } from "react-icons/fi";
import ReportManagementCard from "./_components/ReportManagementCard";

const ReportManagement = () => {
  const reports: any[] = [
    {
      id: "REP-001",
      status: "Unread",
      priority: "High Priority",
      category: "Incorrect Information",
      title: "DNA Percentage Discrepancy",
      description: "The DNA breakdown percentages listed don't match the breed characteristics shown in the...",
      reporterName: "John Anderson",
      reporterEmail: "john.anderson@email.com",
      dogName: "Max Thunder",
      dogId: "#PCR-LR-009876",
      ownerName: "Michael Chen",
      ownerId: "#OW-008765",
      date: "11/28/2024"
    },
    {
      id: "REP-002",
      status: "Read",
      priority: "High Priority",
      category: "Suspicious Activity",
      title: "Multiple Ownership Claims",
      description: "I believe this dog is also listed under a different owner on another platform. This might be a case...",
      reporterName: "Emily Williams",
      reporterEmail: "emily.w@email.com",
      dogName: "Bella Rose",
      dogId: "#PCR-LR-009876",
      ownerName: "Emma Davis",
      ownerId: "#OW-007654",
      date: "11/27/2024"
    },
    {
      id: "REP-003",
      status: "Resolved",
      priority: "Health Concerns",
      category: "Health Concerns",
      title: "Undisclosed Health Issues",
      description: "I recently purchased a puppy from this dog's litter and discovered genetic health issues that were...",
      reporterName: "David Martinez",
      reporterEmail: "d.martinez@email.com",
      dogName: "Luna Belle",
      dogId: "#PCR-LR-009876",
      ownerName: "Sarah Johnson",
      ownerId: "#OW-009876",
      date: "11/26/2024"
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-[#F8FAFC]">
      {/* Header Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input 
            className="pl-10 w-64 h-10 border-slate-200 rounded-xl bg-white" 
            placeholder="Search report" 
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-32 h-10 border-slate-200 bg-white rounded-xl cursor-pointer">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <ReportManagementCard key={report.id} {...report} />
        ))}
      </div>
    </div>
  );
};

export default ReportManagement;