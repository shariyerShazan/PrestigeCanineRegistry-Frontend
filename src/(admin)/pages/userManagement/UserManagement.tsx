/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FiSearch,
  FiDownload,
  FiEye,
  FiTrash2,
  FiEdit,
  FiUserPlus,
} from "react-icons/fi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CommonTable, { type Column } from "@/(admin)/_components/CommonTable";
import UserDialog from "./_components/AddUserDialog";
import { UserDetailsDialog } from "./_components/UserDetailsDialog";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
} from "@/redux/features/admin-user/admin.user.api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CommonPagination from "@/components/common/pagination/CommonPagination";


const UserManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [viewUserId, setViewUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { data: usersResponse, isLoading } = useGetAllUsersQuery({
    page,
    search: search || undefined,
  });

  const { data: detailData } = useGetUserByIdQuery(viewUserId, {
    skip: !viewUserId,
  });
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();



  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const handleStatusUpdate = async (userId: string, status: string) => {
    try {
      await updateUser({ id: userId, status }).unwrap();
      toast.success(`Status updated to ${status}`);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (userId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E7000B",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(userId).unwrap();
        Swal.fire("Deleted!", "User has been removed.", "success");
      } catch (err: any) {
        toast.error(err.data?.message || "Delete failed");
      }
    }
  };

  const columns: Column<any>[] = [
    {
      header: "User",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-slate-100">
            <AvatarImage src={row.profileImage?.url} />
            <AvatarFallback className="bg-slate-200">
              {row.fullName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-slate-800">{row.fullName}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    { header: "Location", render: (row) => row.city || "N/A" },
    { header: "Role", render: (row) => row.roleType || "N/A" },
    { header: "Owner ID", key: "pcrId" },
    { header: "Dogs", render: (row) => row?.canines?.length || 0 },
    {
      header: "Status",
      render: (row) => {
        const getStatusStyles = (status: string) => {
          switch (status) {
            case "ACTIVE":
              return "text-green-600 bg-green-50";
            case "PENDING":
              return "text-amber-600 bg-amber-50";
            case "REJECTED":
              return "text-red-600 bg-red-50";
            case "SUSPENDED":
              return "text-purple-600 bg-purple-50";
            case "DEACTIVATED":
              return "text-slate-500 bg-slate-50";
            default:
              return "text-slate-600 bg-slate-50";
          }
        };

        return (
          <Select
            defaultValue={row.status}
            onValueChange={(val) => handleStatusUpdate(row.id, val)}
          >
            <SelectTrigger
              className={`w-36 h-9 text-xs cursor-pointer font-bold border-none shadow-none focus:ring-0 ${getStatusStyles(row.status)}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="PENDING"
                className="text-amber-600 font-medium focus:text-amber-600"
              >
                PENDING
              </SelectItem>
              <SelectItem
                value="ACTIVE"
                className="text-green-600 font-medium focus:text-green-600"
              >
                ACTIVE
              </SelectItem>
              <SelectItem
                value="REJECTED"
                className="text-red-600 font-medium focus:text-red-600"
              >
                REJECTED
              </SelectItem>
              <SelectItem
                value="SUSPENDED"
                className="text-purple-600 font-medium focus:text-purple-600"
              >
                SUSPENDED
              </SelectItem>
              <SelectItem
                value="DEACTIVATED"
                className="text-slate-500 font-medium focus:text-slate-500"
              >
                DEACTIVATED
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      header: "Email Verification",
      render: (row) => (
        <span
          className={`px-4 py-1 rounded-full text-xs font-medium ${
            row.isVerified
              ? "bg-green-100 text-[#00A63E]"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {row.isVerified ? "Verified" : "Not Verified"}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-3">
          <FiEye
            onClick={() => {
              setViewUserId(row.id);
              setIsViewOpen(true);
            }}
            className="text-[#155DFC] cursor-pointer size-4 hover:scale-110 transition-transform"
          />
          <FiEdit
            onClick={() => handleEdit(row)}
            className="text-amber-500 cursor-pointer size-4 hover:scale-110 transition-transform"
          />
          <FiTrash2
            onClick={() => handleDelete(row.id)}
            className="text-[#E7000B] cursor-pointer size-4 hover:scale-110 transition-transform"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10 w-64 h-10 border-[#2B4C8A]/20"
              placeholder="Search user..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-[#2B4C8A] text-[#2B4C8A] gap-2 h-10"
          >
            <FiDownload /> Export
          </Button>
          <Button
            onClick={handleAddNew}
            className="bg-[#E17100] cursor-pointer hover:bg-[#c96500] text-white gap-2 h-10 px-4 rounded-lg"
          >
            <FiUserPlus className="size-5" /> Add New User
          </Button>
        </div>
      </div>

      <CommonTable
        columns={columns}
        data={usersResponse?.data || []}
        loading={isLoading}
      />
      <CommonPagination
        currentPage={page}
        totalPages={usersResponse?.meta?.totalPages || 1}
        onPageChange={(p) => setPage(p)}
      />

      {/* Add/Edit Modal */}
      <UserDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        editData={selectedUser}
      />

      {/* View Details Modal */}
      <UserDetailsDialog
        open={isViewOpen}
        setOpen={setIsViewOpen}
        user={detailData?.data}
      />
    </div>
  );
};

export default UserManagement;
