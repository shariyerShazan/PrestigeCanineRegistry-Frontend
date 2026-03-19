import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiEye, FiTrash2, FiSearch, FiDownload } from "react-icons/fi";
import CommonTable, { type Column } from "@/(admin)/_components/CommonTable";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CommonPagination from "@/components/common/pagination/CommonPagination";
import {
  useAdminDeleteCertificateRequestMutation,
  useAdminGetAllCertificateRequestsQuery,
  useAdminUpdateCertificateStatusMutation,
} from "@/redux/features/certificate-request/certificate.req.api";

const CertificateRequest: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // 2. API Hooks
  const { data: response, isLoading } = useAdminGetAllCertificateRequestsQuery({
    page,
    limit: 10,
    search: search || undefined,
  });

  const [updateStatus] = useAdminUpdateCertificateStatusMutation();
  const [deleteRequest] = useAdminDeleteCertificateRequestMutation();

  // 3. Handlers
  const handleStatusUpdate = async (
    id: string,
    status: "APPROVED" | "REJECTED",
  ) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Request marked as ${status}`);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently remove the request record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E7000B",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteRequest(id).unwrap();
        Swal.fire("Deleted!", "Request has been removed.", "success");
      } catch (err: any) {
        toast.error(err.data?.message || "Delete failed");
      }
    }
  };

  // 4. Table Columns
  const columns: Column<any>[] = [
    { header: "REQUEST ID", key: "requestId" },
    {
      header: "DOG NAME",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage
              src={row.canine?.images?.[0]?.url || row.litter?.images?.[0]?.url}
              className="object-cover"
            />
            <AvatarFallback>DG</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-slate-800">
              {row.canine?.name || "Litter Request"}
            </p>
            <p className="text-xs text-slate-400">
              {row.canine?.pcrId || row.litter?.pcrId}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "OWNER",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage
              src={row.owner?.profileImage?.url}
              className=" object-cover"
            />
            <AvatarFallback>OW</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-slate-800">{row.owner?.fullName}</p>
            <p className="text-xs text-slate-400">{row.owner?.pcrId}</p>
          </div>
        </div>
      ),
    },
    {
      header: "REQUEST DATE",
      render: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A",
    },
    {
      header: "STATUS",
      render: (row) => {
        const getStatusStyles = (status: string) => {
          switch (status) {
            case "APPROVED":
              return "text-green-600 bg-green-50";
            case "DECLINE":
              return "text-red-600 bg-red-50";
            case "UNDER_REVIEW":
              return "text-blue-600 bg-blue-50";
            case "PENDING":
              return "text-amber-600 bg-amber-50";
            default:
              return "text-slate-600 bg-slate-50";
          }
        };

        return (
          <Select
            defaultValue={row.status}
            onValueChange={(val: any) => handleStatusUpdate(row.id, val)}
          >
            <SelectTrigger
              className={`w-36 h-8 text-xs cursor-pointer font-bold border-none shadow-none focus:ring-0 ${getStatusStyles(row.status)}`}
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
                value="UNDER_REVIEW"
                className="text-blue-600 font-medium focus:text-blue-600"
              >
                UNDER REVIEW
              </SelectItem>
              <SelectItem
                value="APPROVED"
                className="text-green-600 font-medium focus:text-green-600"
              >
                APPROVE
              </SelectItem>
              <SelectItem
                value="DECLINE"
                className="text-red-600 font-medium focus:text-red-600"
              >
                DECLINE
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      header: "ACTIONS",
      render: (row) => (
        <div className="flex items-center gap-3">
          <FiEye
            onClick={() =>
              navigate(`/admin/dashboard/Certificate-Requests/${row.id}`)
            }
            className="text-[#155DFC] cursor-pointer size-4 hover:scale-110 transition-transform"
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
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Certificate Requests
          </h2>
          <p className="text-sm text-slate-500">
            Review and approve certificate requests
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10 w-64 h-10 border-[#2B4C8A]/20"
              placeholder="Search by Request ID or Name..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="border-[#2B4C8A] text-[#2B4C8A] gap-2 h-10"
          >
            <FiDownload /> Export
          </Button>
        </div>
      </div>

      <CommonTable
        columns={columns}
        data={response?.data || []}
        loading={isLoading}
      />

      <CommonPagination
        currentPage={page}
        totalPages={response?.meta?.totalPages || 1}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
};

export default CertificateRequest;
