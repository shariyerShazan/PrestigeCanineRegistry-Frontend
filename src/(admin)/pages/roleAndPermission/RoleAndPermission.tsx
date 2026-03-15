/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiSearch, FiTrash2, FiEdit, FiEye, FiFilter } from "react-icons/fi";
import { LuShieldPlus } from "react-icons/lu";
import Swal from "sweetalert2";
import CommonTable, { type Column } from "@/(admin)/_components/CommonTable";
import AddNewRoleDialog from "./_components/AddOrEditRoleDilalog";
import ViewPermissionDialog from "./_components/ViewPermissionDialog";
import { useDeleteAllPermissionsMutation, useListAdminsQuery } from "@/redux/features/admin-permission/admin.permission";
import CommonPagination from "@/components/common/pagination/CommonPagination";
import { toast } from "react-toastify";

const RoleAndPermission: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: adminResponse, isLoading } = useListAdminsQuery({
    page,
    limit: 10,
    search,
  });

  const [deleteAllPermissions] = useDeleteAllPermissionsMutation();
  
  const handleDeleteAllPermissions = async (
    adminId: string,
    adminName: string,
  ) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `This will remove ALL assigned permissions for ${adminName}. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E7000B",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete all!",
      cancelButtonText: "Cancel",
    });
  
    if (result.isConfirmed) {
      try {
        const response = await deleteAllPermissions(adminId).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: response.message || "All permissions have been removed.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err: any) {
        toast.error(err.data?.message || "Failed to delete permissions");
      }
    }
  };

  const handleEdit = (admin: any) => {
    setSelectedAdmin(admin);
    setIsDialogOpen(true);
  };

  const handleView = (admin: any) => {
    setSelectedAdmin(admin);
    setIsViewOpen(true);
  };

  const handleAddNew = () => {
    setSelectedAdmin(null);
    setIsDialogOpen(true);
  };

const columns: Column<any>[] = [
  {
    header: "Account",
    render: (row) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9 border border-slate-100 shadow-sm">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.fullName}`}
          />
          <AvatarFallback>{row.fullName?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-bold text-slate-700 text-sm leading-tight">
            {row.fullName}
          </span>
          <span className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider">
            {row.roleType || "System Admin"}
          </span>
        </div>
      </div>
    ),
  },
  {
    header: "Email Address",
    key: "email",
  },
  {
    header: "PCR ID",
    key: "pcrId",
  },
  {
    header: "Last active",
    render: (row) => (
      <span className="text-slate-500 text-sm font-medium">
        {row.lastLogin
          ? new Date(row.lastLogin).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Never"}
      </span>
    ),
  },
  {
    header: "Resource Permissions",
    render: (row) => {
      const displayLimit = 2;
      const permissions = row.permissions || [];
      const displayPermissions = permissions.slice(0, displayLimit);
      // const remainingCount = permissions.length - displayLimit;

      return (
        <div className="flex flex-col gap-2 py-2 min-w-[250px]">
          {displayPermissions.map((p: any, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600 min-w-[60px] capitalize">
                {p.resource.replace("_", " ")}:
              </span>
              <div className="flex gap-1.5">
                {p.canView && (
                  <span className="bg-[#E8F0FE] text-[#1A73E8] px-2.5 py-0.5 rounded text-[12px] font-medium">
                    view
                  </span>
                )}
                {p.canCreate && (
                  <span className="bg-[#E8F0FE] text-[#1A73E8] px-2.5 py-0.5 rounded text-[12px] font-medium">
                    create
                  </span>
                )}
                {p.canEdit && (
                  <span className="bg-[#E8F0FE] text-[#1A73E8] px-2.5 py-0.5 rounded text-[12px] font-medium">
                    edit
                  </span>
                )}
                {p.canDelete && (
                  <span className="bg-[#E8F0FE] text-[#1A73E8] px-2.5 py-0.5 rounded text-[12px] font-medium">
                    delete
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    header: "Actions",
    render: (row) => (
      <div className="flex items-center gap-4">
        <FiEye
          onClick={() => handleView(row)}
          className="text-slate-400 hover:text-[#155DFC] cursor-pointer size-4 transition-all hover:scale-110"
          title="View Details"
        />
        <FiEdit
          onClick={() => handleEdit(row)}
          className="text-slate-400 hover:text-amber-500 cursor-pointer size-4 transition-all hover:scale-110"
          title="Edit Access"
        />
        <FiTrash2
          onClick={() => handleDeleteAllPermissions(row.id, row.fullName)}
          className="text-slate-400 hover:text-[#E7000B] cursor-pointer size-4 transition-all hover:scale-110"
          title="Delete Admin"
        />
      </div>
    ),
  },
];


  return (
    <div className="p-8 space-y-8 bg-[#F9FAFB] min-h-screen">


      {/* Filter & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10 w-72 h-10 border-slate-200 bg-white focus:ring-0 focus:border-slate-400 transition-all"
              placeholder="Search account name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="h-10 border-slate-200 text-slate-600 gap-2 font-medium"
          >
            <FiFilter className="size-4" /> Account status
          </Button>
        </div>

        <Button
          onClick={handleAddNew}
          className="bg-[#2B4C8A] cursor-pointer hover:bg-[#1a3563] text-white gap-2 h-10 px-5 rounded-lg shadow-sm font-semibold transition-all"
        >
          <LuShieldPlus className="size-4" />
          Connect new account
        </Button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <CommonTable
          columns={columns}
          data={adminResponse?.data || []}
          loading={isLoading}
        />

        <div className="p-4 border-t border-slate-50 bg-slate-50/30">
          <CommonPagination
            currentPage={adminResponse?.meta?.page || 1}
            totalPages={adminResponse?.meta?.lastPage || 1}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>

      <AddNewRoleDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialData={selectedAdmin}
      />

      <ViewPermissionDialog
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        adminData={selectedAdmin}
      />
    </div>
  );
};

export default RoleAndPermission;
