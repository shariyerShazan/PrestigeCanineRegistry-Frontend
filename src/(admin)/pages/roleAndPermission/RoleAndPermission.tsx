import React, { useState } from 'react';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiSearch, FiEye, FiEdit3, FiTrash2 } from "react-icons/fi";
import { LuShieldPlus } from "react-icons/lu";
import type { Role } from './_components/RPtypes';
import type { Column } from '@/(admin)/_components/CommonTable';
import CommonTable from '@/(admin)/_components/CommonTable';
import AddNewRoleDialog from './_components/AddOrEditRoleDilalog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const RoleAndPermission: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

const rolesData: Role[] = [
  {
    id: "1",
    name: "Michael Chen",
    roleType: "Admin",
    email: "micheal.chen@gmail.com",
    password: "Hff6*****",
    lastLogin: "11/26/2024",
    permissions: [
      { category: "Users", actions: ["view", "create", "edit"], extra: 2 },
      { category: "Dogs", actions: ["view", "create", "edit"], extra: 2 }
    ]
  },

  {
    id: "2",
    name: "Sarah Johnson",
    roleType: "Moderator",
    email: "sarah.johnson@gmail.com",
    password: "Xk92*****",
    lastLogin: "11/25/2024",
    permissions: [
      { category: "Users", actions: ["view", "edit"], extra: 1 },
      { category: "Dogs", actions: ["view", "create"], extra: 1 }
    ]
  },

  {
    id: "3",
    name: "David Wilson",
    roleType: "Support",
    email: "david.wilson@gmail.com",
    password: "Pq77*****",
    lastLogin: "11/24/2024",
    permissions: [
      { category: "Users", actions: ["view"], extra: 0 },
      { category: "Dogs", actions: ["view"], extra: 0 }
    ]
  }
]


  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedRole(null);
    setIsDialogOpen(true);
  };

  const columns: Column<Role>[] = [
    {
      header: "User",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.name}`} />
            <AvatarFallback>{row.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-slate-800">{row.name}</p>
            <p className="text-xs text-slate-400">{row.roleType}</p>
          </div>
        </div>
      )
    },
    { header: "Email", key: "email" },
    { header: "Password", key: "password" },
    {
      header: "Permissions",
      render: (row) => (
        <div className="space-y-2 py-2">
          {row.permissions.map((p, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[13px]">
              <span className="text-slate-500 min-w-[45px]">{p.category}:</span>
              {p.actions.map(action => (
                <span key={action} className="bg-blue-50 text-[#2B4C8A] px-2 py-0.5 rounded text-[11px] font-medium">
                  {action}
                </span>
              ))}
              <span className="text-slate-400 text-[11px]">+{p.extra}</span>
            </div>
          ))}
          <p className="text-[11px] italic text-slate-400">+4 more categories</p>
        </div>
      )
    },
    { header: "Last Login", key: "lastLogin" },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-3">
           <FiEye className="text-[#155DFC] cursor-pointer size-4 hover:opacity-70 transition-opacity" />
          <FiEdit3 
            className="text-[#155DFC] cursor-pointer size-4" 
            onClick={() => handleEdit(row)}
          />
            <FiTrash2 className="text-[#E7000B] cursor-pointer size-4 hover:opacity-70 transition-opacity" />
        </div>
      )
    }
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
        
        
        <Button 
          onClick={handleAddNew}
          className="bg-[#D4AF37] hover:bg-[#dfb62d] text-white gap-2 h-10 px-4 rounded-lg cursor-pointer"
        >
          <LuShieldPlus className="size-5" />
          Add New Role
        </Button>

      </div>

      <CommonTable columns={columns} data={rolesData} />

      <AddNewRoleDialog
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        initialData={selectedRole}
      />
    </div>
  );
};

export default RoleAndPermission;