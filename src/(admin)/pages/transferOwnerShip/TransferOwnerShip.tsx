/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiSearch, FiEye } from "react-icons/fi";
import CommonTable, { type Column } from "@/(admin)/_components/CommonTable";
import Swal from "sweetalert2";
import {
  useApproveTransferMutation,
  useDeclineTransferMutation,
  useGetAllTransfersQuery,
  useGetTransferByIdQuery,
} from "@/redux/features/admin-ow-transfer/adminOwnerTransferApi";
import { Button } from "@/components/ui/button";
import CommonPagination from "@/components/common/pagination/CommonPagination";
import TransferDetailsModal from "./_components/TransferDetailsModal";

const DTransferOwnerShip: React.FC = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedTransferId, setSelectedTransferId] = useState<string | null>(
    null,
  );

  const limit = 10;

  // List Query
  const { data: response, isLoading } = useGetAllTransfersQuery({
    search,
    status: status === "all" ? undefined : status,
    page,
    limit,
  });

  // Single Detail Query
  const { data: detailsResponse, isLoading: isDetailsLoading } =
    useGetTransferByIdQuery(selectedTransferId as string, {
      skip: !selectedTransferId,
    });

  const details = detailsResponse;

  const [approveTransfer] = useApproveTransferMutation();
  const [declineTransfer] = useDeclineTransferMutation();

  // Approve Logic
  const handleApprove = async (userId: string, userName: string) => {
    const modalElement =
      document.querySelector('[role="dialog"]') || document.body;
    const result = await Swal.fire({
      title: `Approve for ${userName}?`,
      text: "Ownership will be transferred permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00A63E",
      confirmButtonText: "Yes, Approve",
      target: modalElement as HTMLElement,
      willOpen: () => {
        const container = Swal.getContainer();
        if (container) {
          container.style.zIndex = "99999";
          container.style.position = "absolute";
        }
      },
    });

    if (result.isConfirmed && selectedTransferId) {
      try {
        await approveTransfer({
          id: selectedTransferId,
          selectedUserId: userId,
        }).unwrap();
        Swal.fire("Success", "Ownership transferred!", "success");
        setSelectedTransferId(null);
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Action failed", "error");
      }
    }
  };

  // Decline Logic
  const handleDeclineTransfer = async (transferId: string) => {
    const result = await Swal.fire({
      title: "Reject Transfer?",
      text: "This will invalidate this transfer code for everyone.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Reject All",
    });

    if (result.isConfirmed) {
      try {
        await declineTransfer(transferId).unwrap();
        Swal.fire(
          "Rejected",
          "The transfer request has been cancelled.",
          "success",
        );
        setSelectedTransferId(null);
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Failed to cancel transfer", "error");
      }
    }
  };

  const columns: Column<any>[] = [
    {
      header: "Asset / Code",
      render: (row) => (
        <div className="py-1">
          <p className="font-bold text-slate-800 text-[14px]">
            {row.canine?.name || row.litter?.name || "N/A"}
          </p>
          <p className="text-[12px] font-mono text-blue-600 font-bold uppercase tracking-wider">
            {row.canine?.pcrId || row.litter?.pcrId || "N/A"}
          </p>
        </div>
      ),
    },
    {
      header: "Owner Details",
      render: (row) => (
        <div className="py-1">
          <p className="text-[10px] uppercase text-slate-400 font-black tracking-tighter">
            {row.status === "APPROVE" ? "Previous Owner" : "Current Owner"}
          </p>
          <p className="font-bold text-slate-700 text-[13px] leading-tight">
            {row.currentOwner?.fullName || "N/A"}
          </p>
          <p className="text-[11px] text-blue-600/70 font-medium mt-0.5">
            {row.currentOwner?.pcrId || "No ID"}
          </p>
        </div>
      ),
    },
    {
      header: "New Owner",
      render: (row) => (
        <div className="py-1">
          {row.status === "APPROVE" && row.newOwner ? (
            <div>
              <p className="text-[10px] uppercase text-green-600 font-black tracking-tighter">
                Transfer Complete
              </p>
              <p className="font-extrabold text-slate-900 text-[13px] leading-tight">
                {row.newOwner?.fullName}
              </p>
              <p className="text-[11px] text-green-700/70 font-medium mt-0.5">
                {row.newOwner?.pcrId}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-300 italic">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
              <span className="text-[12px]">Pending Approval</span>
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Requests",
      render: (row) => (
        <span className="bg-blue-50 text-[#2B4C8A] px-3 py-1 rounded-md text-[11px] font-bold border border-blue-100">
          {row.requesters?.length || 0} Claimants
        </span>
      ),
    },
    {
      header: "Security Code",
      render: (row) => (
        <span className="bg-blue-50 text-[#2B4C8A] px-3 py-1 rounded-md text-[11px] font-bold border border-blue-100 font-mono">
          {row.transferCode}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row) => {
        const getStatusStyles = (status: string) => {
          switch (status) {
            case "APPROVE":
              return "text-green-600 bg-green-50 border-green-100";
            case "PENDING":
              return "text-amber-600 bg-amber-50 border-amber-100";
            case "DECLINE":
              return "text-red-600 bg-red-50 border-red-100";
            default:
              return "text-slate-600 bg-slate-50 border-slate-100";
          }
        };
        return (
          <span
            className={`px-3 py-1 rounded-md text-[11px] font-bold border ${getStatusStyles(row.status)}`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: "Action",
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-4 cursor-pointer border-[#2B4C8A] text-[#2B4C8A] hover:bg-blue-50 font-bold flex gap-2 transition-all active:scale-95"
          onClick={() => setSelectedTransferId(row.id)}
        >
          <FiEye size={16} /> View Claims
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4 space-y-6 min-h-[600px]">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10 w-full md:w-72 h-10 border-[#2B4C8A] focus-visible:ring-[#2B4C8A]/30 text-[13px]"
              placeholder="Search code or owner..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Select
            value={status}
            onValueChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-36 h-10 border-[#2B4C8A] text-[#2B4C8A] font-bold text-[13px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="APPROVE">Approved</SelectItem>
              <SelectItem value="DECLINE">Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
            Total Transfers
          </p>
          <p className="text-2xl font-black text-[#2B4C8A]">
            {response?.meta?.total || 0}
          </p>
        </div>
      </div>

      {/* Table Section */}
      <CommonTable
        columns={columns}
        data={response?.data || []}
        loading={isLoading}
      />

      {/* Pagination */}
      <CommonPagination
        currentPage={page}
        totalPages={response?.meta?.lastPage || 1}
        onPageChange={(p) => setPage(p)}
      />

      {/* Details Modal */}
      <TransferDetailsModal
        isOpen={!!selectedTransferId}
        onClose={() => setSelectedTransferId(null)}
        isLoading={isDetailsLoading}
        details={details}
        onApprove={handleApprove}
        onDeclineTransfer={handleDeclineTransfer}
      />
    </div>
  );
};

export default DTransferOwnerShip;
