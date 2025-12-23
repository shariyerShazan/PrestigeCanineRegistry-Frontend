import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FiSearch, FiDownload } from "react-icons/fi";
import type { Column } from '@/(admin)/_components/CommonTable';
import CommonTable from '@/(admin)/_components/CommonTable';

interface LogEntry {
  time: string;
  user: string;
  role: string;
  action: "Approved" | "Assigned" | "Created" | "Submitted" | "Updated";
  target: string;
  details: string;
}

const ActivityLog: React.FC = () => {
  const logData: LogEntry[] = [
    { time: "11/28/2024, 9:45:00 AM", user: "Admin User", role: "Admin", action: "Approved", target: "Verification Request VR004", details: "Approved DNA retest for Rocky" },
    { time: "11/27/2024, 3:30:00 PM", user: "Jane Reviewer", role: "Reviewer", action: "Assigned", target: "Verification Request VR002", details: "Self-assigned tier upgrade request" },
    { time: "11/26/2024, 11:20:00 AM", user: "Admin User", role: "Admin", action: "Created", target: "User Account U005", details: "Created new reviewer account" },
    { time: "11/27/2024, 10:30:00 AM", user: "Michael Chen", role: "Owner", action: "Submitted", target: "Verification Request VR001", details: "New gold tier registration" },
    { time: "11/25/2024, 2:15:00 PM", user: "Admin User", role: "Admin", action: "Updated", target: "Dog Profile DOG-002", details: "Updated health records" },
  ];

  const columns: Column<LogEntry>[] = [
    { header: "TIME", key: "time" },
    { 
      header: "USER", 
      render: (row) => (
        <div>
          <p className="font-bold text-slate-800">{row.user}</p>
          <p className="text-xs text-slate-400">{row.role}</p>
        </div>
      )
    },
    { 
      header: "ACTION", 
      render: (row) => (
        <span className="bg-blue-100 text-[#2B4C8A] px-6 py-1 rounded-full text-[11px] font-semibold border border-blue-200">
          {row.action}
        </span>
      )
    },
    { header: "TARGET", key: "target" },
    { header: "DETAILS", key: "details" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input className="pl-10 w-64 h-10 border-[#2B4C8A]/20" placeholder="Search user" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-32 h-10 border-[#2B4C8A]/20 text-slate-700 font-medium cursor-pointer">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="border-[#2B4C8A] text-[#2B4C8A] gap-2 h-10 cursor-pointer">
          <FiDownload /> Export
        </Button>
      </div>
      <CommonTable columns={columns} data={logData} />
    </div>
  );
};

export default ActivityLog;