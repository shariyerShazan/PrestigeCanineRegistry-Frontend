import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FiSearch, FiDownload, FiEye, FiTrash2 } from "react-icons/fi";
import CommonTable, { type Column } from "@/(admin)/_components/CommonTable";

// 1. Define the Data Interface
interface DogRequest {
  id: string;
  dog: string;
  dogId: string;
  owner: string;
  ownerId: string;
  type: string;
  submitted: string;
  status: "Pending" | "Under Review" | "Decline" | "Approve";
}

const DogRegistrationRequest: React.FC = () => {

const statusStyles: Record<DogRequest["status"], string> = {
  Pending: "bg-slate-100 text-slate-600",
  "Under Review": "bg-blue-100 text-[#2B4C8A]",
  Decline: "bg-orange-100 text-[#E17100]",
  Approve: "bg-green-100 text-[#00A63E]",
}
  // 2. Sample Data
  const tableData: DogRequest[] = [
    { id: "VR001", dog: "Max Thunder", dogId: "#PCR-LR-009876", owner: "Michael Chen", ownerId: "PCR-OW-008765", type: "New Registration", submitted: "11/27/2024", status: "Pending" },
    { id: "VR002", dog: "Luna Star", dogId: "#PCR-LR-009876", owner: "James Wilson", ownerId: "PCR-OW-006543", type: "Tier Upgrade", submitted: "11/26/2024", status: "Under Review" },
    { id: "VR003", dog: "Buddy", dogId: "#PCR-LR-009876", owner: "Sarah Johnson", ownerId: "PCR-OW-009876", type: "New Registration", submitted: "11/28/2024", status: "Decline" },
    { id: "VR004", dog: "Rocky", dogId: "#PCR-LR-009876", owner: "Emma Davis", ownerId: "PCR-OW-007654", type: "DNA Retest", submitted: "11/25/2024", status: "Approve" },
  ];

  // 3. Define Column Configurations with Type Safety
  const columns: Column<DogRequest>[] = [
    { header: "Request ID", key: "id" },
    { 
      header: "Dog Name", 
      render: (row : any) => (
        <div>
          <p className="font-bold text-slate-800">{row.dog}</p>
          <p className="text-xs text-slate-400">{row.dogId}</p>
        </div>
      )
    },
    { 
      header: "Owner", 
      render: (row : any) => (
        <div>
          <p className="font-bold text-slate-800">{row.owner}</p>
          <p className="text-xs text-slate-400">{row.ownerId}</p>
        </div>
      )
    },
    { header: "Request Type", key: "type" },
{
  header: "Assign Tier",
  render: () => (
    <Select defaultValue="gold">
      <SelectTrigger
        className="
          h-7 px-3 rounded-full text-xs font-medium
          bg-slate-100 text-slate-700
          border-none ring-0 focus:ring-0
        "
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="gold">Gold</SelectItem>
        <SelectItem value="blue">Blue</SelectItem>
        {/* <SelectItem value="silver">Silver</SelectItem> */}
      </SelectContent>
    </Select>
  ),
},
    { header: "Submitted", key: "submitted" },
    {
  header: "Status",
  render: (row: DogRequest) => (
    <Select
      defaultValue={row.status}
      onValueChange={(value) => {
        console.log("New status:", value, "for", row.id)
        // future API call here
      }}
    >
      <SelectTrigger
        className={`
          h-7 px-3 rounded-full text-xs font-medium w-fit
          border-none ring-0 focus:ring-0
          ${statusStyles[row.status]}
        `}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent className=" cursor-pointer">
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="Under Review">Under Review</SelectItem>
        <SelectItem value="Approve">Approve</SelectItem>
        <SelectItem value="Decline">Decline</SelectItem>
      </SelectContent>
    </Select>
  ),
},
    { 
      header: "Actions", 
      render: () => (
        <div className="flex items-center gap-3">
          <FiEye className="text-[#155DFC] cursor-pointer size-4 hover:opacity-70 transition-opacity" />
          <FiTrash2 className="text-[#E7000B] cursor-pointer size-4 hover:opacity-70 transition-opacity" />
        </div>
      )
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input 
              className="pl-10 w-full md:w-64 h-10 border-[#2B4C8A] focus-visible:ring-[#2B4C8A]/30" 
              placeholder="Search requests..." 
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-32 h-10 border-[#2B4C8A] text-[#2B4C8A] font-medium cursor-pointer">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="border-[#2B4C8A] text-[#2B4C8A] hover:bg-[#2B4C8A]/5 gap-2 h-10 cursor-pointer">
          <FiDownload /> Export
        </Button>
      </div>

      {/* Main Table */}
      <CommonTable columns={columns} data={tableData} />
    </div>
  );
};

export default DogRegistrationRequest;