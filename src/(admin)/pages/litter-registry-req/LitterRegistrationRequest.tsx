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
import { FiSearch, FiDownload, FiEye, FiTrash2, FiEdit } from "react-icons/fi";
import CommonTable, { type Column } from "@/(admin)/_components/CommonTable";
import {
  useDeleteAdminLitterMutation,
  useGetAdminLittersQuery,
  useUpdateAdminLitterMutation,
} from "@/redux/features/admin-litter/admin.litter.api";
import { toast } from "react-toastify";
import CommonPagination from "@/components/common/pagination/CommonPagination";
import Swal from "sweetalert2";
import LitterViewDialog from "./_components/LitterViewDialog";
import LitterEditDialog from "./_components/LitterEditDialog";

const LitterRegistrationRequest: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewId, setViewId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any | null>(null);
  const limit = 10;

  // 1. RTK Query hooks
  const { data, isLoading } = useGetAdminLittersQuery({
    page: currentPage,
    limit,
    search: searchTerm,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const [updateLitter] = useUpdateAdminLitterMutation();
  const [deleteLitter] = useDeleteAdminLitterMutation();

  // 3. Handlers
  const handleUpdate = async (id: string, payload: any) => {
    try {
      await updateLitter({ id, data: payload }).unwrap();
      toast.success("Successfully updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update.");
    }
  };

  const handleDelete = async (id: string) => {
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
        await deleteLitter(id).unwrap();
        Swal.fire("Deleted!", "Litter record has been removed.", "success");
      } catch (err: any) {
        toast.error(err.data?.message || "Delete failed");
      }
    }
  };

  // 4. Column Definitions
  const columns: Column<any>[] = [
    {
      header: "PCR ID",
      render: (row) => <span className="font-medium">{row.pcrId}</span>,
    },
    {
      header: "Litter Name",
      render: (row) => (
        <div>
          <p className="font-bold text-slate-800">{row.name}</p>
          <p className="text-xs text-slate-400">
            {row.breedRelation?.name || "Unknown Breed"} ({row.generation})
          </p>
        </div>
      ),
    },
    {
      header: "Owner",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-800">{row.owner?.fullName}</p>
          <p className="text-xs text-slate-400">{row.owner?.email}</p>
        </div>
      ),
    },
    {
      header: "Puppies",
      render: (row) => (
        <span className="font-medium bg-slate-100 px-2 py-1 rounded text-xs">
          {row._count?.puppies || 0} Puppies
        </span>
      ),
    },
    {
      header: "Assign Tier",
      render: (row) => {
        const getTierStyles = (tier: string) => {
          switch (tier) {
            case "GOLD":
              return "text-[#D4AF37] bg-yellow-50 border-yellow-100";
            case "BLUE":
              return "text-blue-600 bg-blue-50 border-blue-100";
            default:
              return "text-slate-600 bg-slate-50";
          }
        };

        return (
          <Select
            defaultValue={row.tier}
            onValueChange={(val) => handleUpdate(row.id, { tier: val })}
          >
            <SelectTrigger
              className={`h-8 px-3 cursor-pointer rounded-md text-[11px] font-bold border shadow-none focus:ring-0 transition-colors ${getTierStyles(row.tier)}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GOLD" className="text-[#D4AF37] font-bold">
                GOLD
              </SelectItem>
              <SelectItem value="BLUE" className="text-[#2B4C8A] font-bold">
                BLUE
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      header: "Status",
      render: (row) => {
        const getStatusStyles = (status: string) => {
          switch (status) {
            case "APPROVED":
              return "text-green-600 bg-green-50 border-green-100";
            case "PENDING":
              return "text-amber-600 bg-amber-50 border-amber-100";
            case "UNDER_REVIEW":
              return "text-blue-600 bg-blue-50 border-blue-100";
            case "DECLINE":
              return "text-red-600 bg-red-50 border-red-100";
            default:
              return "text-slate-600 bg-slate-50 border-slate-100";
          }
        };

        return (
          <Select
            defaultValue={row.status}
            onValueChange={(val) => handleUpdate(row.id, { status: val })}
          >
            <SelectTrigger
              className={`h-8 px-3 rounded-md cursor-pointer text-[11px] font-bold border shadow-none focus:ring-0 transition-colors ${getStatusStyles(row.status)}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING" className="text-amber-600 font-bold">
                PENDING
              </SelectItem>
              <SelectItem
                value="UNDER_REVIEW"
                className="text-blue-600 font-bold"
              >
                UNDER REVIEW
              </SelectItem>
              <SelectItem value="APPROVED" className="text-green-600 font-bold">
                APPROVE
              </SelectItem>
              <SelectItem value="DECLINE" className="text-red-600 font-bold">
                DECLINE
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-3">
          <FiEye
            className="text-[#155DFC] cursor-pointer size-4 hover:scale-110 transition-transform"
            onClick={() => setViewId(row.id)}
          />
          <FiEdit
            className="text-slate-600 cursor-pointer size-4 hover:scale-110 transition-transform"
            onClick={() => setEditData(row)}
          />
          <FiTrash2
            className="text-[#E7000B] cursor-pointer size-4 hover:scale-110 transition-transform"
            onClick={() => handleDelete(row.id)}
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
              className="pl-10 w-full md:w-64 h-10 border-[#2B4C8A] focus-visible:ring-[#2B4C8A]/30"
              placeholder="Search by name/pcrId..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Select
            onValueChange={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-32 h-10 border-[#2B4C8A] text-[#2B4C8A] font-medium">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="DECLINE">Decline</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          className="border-[#2B4C8A] text-[#2B4C8A] hover:bg-[#2B4C8A]/5 gap-2 h-10"
        >
          <FiDownload /> Export
        </Button>
      </div>

      <CommonTable
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
      />

      <CommonPagination
        currentPage={currentPage}
        totalPages={data?.meta?.totalPages || 1}
        onPageChange={(p) => setCurrentPage(p)}
      />

      <LitterViewDialog
        id={viewId}
        open={!!viewId}
        onOpenChange={(open: any) => !open && setViewId(null)}
      />
      <LitterEditDialog
        litter={editData}
        open={!!editData}
        onOpenChange={(open: any) => !open && setEditData(null)}
      />
    </div>
  );
};

export default LitterRegistrationRequest;
