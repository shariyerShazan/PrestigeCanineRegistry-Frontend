import React from 'react';
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FiSearch } from "react-icons/fi";
import CommonTable, { type Column } from '@/(admin)/_components/CommonTable';


interface OwnershipTransferData {
  dogName: string;
  dogId: string;
  oldOwner: string;
  oldOwnerId: string;
  newOwner: string;
  newOwnerId: string;
  requestType: string;
  requestCode: string;
  codeStatus: "Verified" | "Invalid";
  submitted: string;
  actionStatus: "Pending" | "Decline" | "Approve";
}

const TransferOwnerShip: React.FC = () => {
  // Sample data from screenshot
  const data: OwnershipTransferData[] = [
    {
      dogName: "Buddy",
      dogId: "#PCR-LR-009876",
      oldOwner: "Sarah Johnson",
      oldOwnerId: "PCR-OW-009876",
      newOwner: "Michael Chen",
      newOwnerId: "PCR-OW-008765",
      requestType: "Ownership Transfer",
      requestCode: "Code: 10562",
      codeStatus: "Verified",
      submitted: "11/28/2024",
      actionStatus: "Pending",
    },
    {
      dogName: "Buddy",
      dogId: "#PCR-LR-009876",
      oldOwner: "Sarah Johnson",
      oldOwnerId: "PCR-OW-009876",
      newOwner: "Emma Davis",
      newOwnerId: "PCR-OW-007654",
      requestType: "Ownership Transfer",
      requestCode: "Code: 10562",
      codeStatus: "Invalid",
      submitted: "11/28/2024",
      actionStatus: "Decline",
    },
    {
      dogName: "Rocky",
      dogId: "#PCR-LR-009876",
      oldOwner: "Emma Davis",
      oldOwnerId: "PCR-OW-007654",
      newOwner: "Sarah Johnson",
      newOwnerId: "PCR-OW-009876",
      requestType: "Ownership Transfer",
      requestCode: "Code: 10562",
      codeStatus: "Verified",
      submitted: "11/25/2024",
      actionStatus: "Approve",
    },
  ];

  const columns: Column<OwnershipTransferData>[] = [
    {
      header: "Dog Name",
      render: (row : any) => (
        <div>
          <p className="font-bold text-slate-800">{row.dogName}</p>
          <p className="text-xs text-slate-400">{row.dogId}</p>
        </div>
      ),
    },
    {
      header: "Old Owner",
      render: (row : any) => (
        <div>
          <p className="font-semibold text-slate-700">{row.oldOwner}</p>
          <p className="text-xs text-slate-400">{row.oldOwnerId}</p>
        </div>
      ),
    },
    {
      header: "New Owner",
      render: (row : any) => (
        <div>
          <p className="font-semibold text-slate-700">{row.newOwner}</p>
          <p className="text-xs text-slate-400">{row.newOwnerId}</p>
        </div>
      ),
    },
    {
      header: "Request Type",
      render: (row : any) => (
        <div>
          <p className="text-slate-700 font-medium">{row.requestType}</p>
          <p className="text-xs text-slate-400">{row.requestCode}</p>
        </div>
      ),
    },
    {
      header: "Code Status",
      render: (row : any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          row.codeStatus === 'Verified' 
          ? 'bg-green-100 text-green-600' 
          : 'bg-red-100 text-red-600'
        }`}>
          {row.codeStatus}
        </span>
      ),
    },
    {
      header: "Submitted",
      key: "submitted",
    },
    {
      header: "Action",
      render: (row) => {
        // Status styling for the Select trigger
        const statusStyles = {
          Pending: "bg-slate-100 text-slate-600",
          Decline: "bg-orange-100 text-[#E17100]",
          Approve: "bg-green-100 text-[#00A63E]",
        };

        return (
          <Select defaultValue={row.actionStatus}>
            <SelectTrigger className={`w-[110px] h-8 text-xs font-medium rounded-full border-none cursor-pointer ${statusStyles[row.actionStatus]}`}>
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approve">Approve</SelectItem>
              <SelectItem value="Decline">Decline</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input 
            className="pl-10 w-64 h-10 border-[#2B4C8A] focus-visible:ring-[#2B4C8A]/30 cursor-pointer" 
            placeholder="Search requests..." 
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-32 h-10 cursor-pointer border-[#2B4C8A] text-slate-700 font-medium">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="invalid">Invalid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table Section */}
      <CommonTable columns={columns} data={data} />
    </div>
  );
};

export default TransferOwnerShip;