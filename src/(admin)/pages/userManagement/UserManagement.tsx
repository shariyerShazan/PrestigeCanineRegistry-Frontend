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
import { FiSearch, FiDownload, FiEye, FiTrash2 } from "react-icons/fi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CommonTable, { type Column } from '@/(admin)/_components/CommonTable';
import AddUserDialog from './_components/AddUserDialog';
import userPic from "@/assets/ownerDetails/profile.jpg"

interface User {
  name: string;
  email: string;
  avatar: string;
  location: string;
  ownerId: string;
  dogs: string;
  userTier: "Gold" | "Blue";
  membership: "Free" | "PA";
  status: "Active" | "Pending";
}

const UserManagement: React.FC = () => {
  const data: User[] = [
    {
      name: "Michael Chen",
      email: "mchen@email.com",
      avatar: userPic, 
      location: "San Diego, CA",
      ownerId: "OW-001",
      dogs: "02",
      userTier: "Gold",
      membership: "Free",
      status: "Active",
    },
    {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: userPic,
      location: "New San Diego, CA",
      ownerId: "OW-001",
      dogs: "01",
      userTier: "Blue",
      membership: "PA",
      status: "Pending",
    },
    {
      name: "Emma Davis",
      email: "emma.davis@email.com",
      avatar: userPic,
      location: "San Diego, CA",
      ownerId: "OW-001",
      dogs: "01",
      userTier: "Gold",
      membership: "Free",
      status: "Active",
    }
  ];

  const columns: Column<User>[] = [
    {
      header: "User",
      render: (row : any) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-slate-100">
            <AvatarImage src={row.avatar} />
            <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-slate-800">{row.name}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    { header: "Location", key: "location" },
    { header: "Owner ID", key: "ownerId" },
    { header: "Dogs", key: "dogs" },
    { header: "User Tier", key: "userTier" },
    { header: "Membership", key: "membership" },
    {
      header: "Status",
      render: (row : any) => (
        <span className={`px-4 py-1 rounded-full text-xs font-medium ${
          row.status === 'Active' 
          ? 'bg-green-100 text-[#00A63E]' 
          : 'bg-slate-100 text-slate-500'
        }`}>
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-3">
            <FiEye className="text-[#155DFC] cursor-pointer size-4 hover:opacity-70 transition-opacity" />
            <FiTrash2 className="text-[#E7000B] cursor-pointer size-4 hover:opacity-70 transition-opacity" />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input 
              className="pl-10 w-64 h-10 border-[#2B4C8A]/20 focus-visible:ring-[#2B4C8A]/30" 
              placeholder="Search user..." 
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-32 h-10 border-[#2B4C8A]/20 text-slate-700 font-medium cursor-pointer">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#2B4C8A] text-[#2B4C8A] hover:bg-[#2B4C8A]/5 gap-2 h-10 cursor-pointer">
            <FiDownload /> Export
          </Button>
          <AddUserDialog />
        </div>
      </div>

      {/* Common Table */}
      <CommonTable columns={columns} data={data} />
    </div>
  );
};

export default UserManagement;