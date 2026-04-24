// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { FiSearch } from "react-icons/fi";
// import ReportManagementCard from "./_components/ReportManagementCard";
// import {
//   useGetAllReportsQuery,
//   type ReportStatus,
// } from "@/redux/features/report-api/report.api";
// import { Skeleton } from "@/components/ui/skeleton";

// const ReportManagement = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all");

//   // Redux Hook for fetching data
//   const { data: reportsData, isLoading } = useGetAllReportsQuery({
//     status: statusFilter === "all" ? undefined : statusFilter,
//   });
// // console.log(reportsData)
//   // Client-side search logic
//   const filteredReports = reportsData?.data?.filter(
//     (report) =>
//       report.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       report.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       report.reporterName.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   return (
//     <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-screen">
//       {/* Header Search & Filter */}
//       <div className="flex items-center gap-3">
//         <div className="relative">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//           <Input
//             className="pl-10 w-64 h-10 border-slate-200 rounded-xl bg-white"
//             placeholder="Search report..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <Select
//           value={statusFilter}
//           onValueChange={(value) => setStatusFilter(value as any)}
//         >
//           <SelectTrigger className="w-40 h-10 border-slate-200 bg-white rounded-xl cursor-pointer">
//             <SelectValue placeholder="Filter Status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Status</SelectItem>
//             <SelectItem value="UNREAD">Unread</SelectItem>
//             <SelectItem value="READ">Read</SelectItem>
//             <SelectItem value="RESOLVED">Resolved</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Grid of Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {isLoading
//           ? // Skeleton loaders during fetching
//             Array(6)
//               .fill(0)
//               .map((_, i) => (
//                 <Skeleton key={i} className="h-[400px] w-full rounded-3xl" />
//               ))
//           : filteredReports?.map((report) => (
//               <ReportManagementCard
//                 key={report.id}
//                 id={report.id}
//                 reportId={report.reportId}
//                 status={report.status}
//                 priority={report.priority}
//                 subject={report.subject}
//                 description={report.description}
//                 reporterName={report.reporterName}
//                 reporterEmail={report.reporterEmail}
//                 dogName={report.canine?.name || report.litter?.name || "N/A"}
//                 dogId={report.canine?.pcrId || report.litter?.pcrId || "N/A"}
//                 ownerName={report.canine?.ownerId || "System"} // API should ideally include owner name
//                 ownerId={report.canine?.ownerId || "N/A"}
//                 date={new Date(report.createdAt).toLocaleDateString()}
//               />
//             ))}
//       </div>

//       {!isLoading && filteredReports?.length === 0 && (
//         <div className="text-center py-20 text-slate-400">
//           No reports found matching your criteria.
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReportManagement;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiSearch, FiEye, FiTrash2 } from "react-icons/fi";
import CommonTable, { type Column } from "@/(admin)/_components/CommonTable";
import {
  useGetAllReportsQuery,
  useDeleteReportMutation,
  useResolveReportActionMutation,
} from "@/redux/features/report-api/report.api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CommonPagination from "@/components/common/pagination/CommonPagination";
import ReportDetailsDialog from "./_components/ReportDetailsDialog";
import { useNavigate } from "react-router";
// import { ReportDetailsDialog } from "./_components/ReportDetailsDialog";

const ReportManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewId, setViewId] = useState<string | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  console.log(search);
  // 1. Logic to clear viewId when dialog closes to prevent stale data
  useEffect(() => {
    if (!isViewOpen) {
      setViewId(null);
    }
  }, [isViewOpen]);

  const { data: reportsResponse, isLoading } = useGetAllReportsQuery({
    page,
    status: statusFilter === "all" ? undefined : (statusFilter as any),
  });

  const [resolveReport] = useResolveReportActionMutation();
  const [deleteReport] = useDeleteReportMutation();

  const handleStatusUpdate = async (id: string, status: any) => {
    try {
      await resolveReport({ id, status }).unwrap();
      toast.success(`Report marked as ${status}`);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This report will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E7000B",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteReport(id).unwrap();
        Swal.fire("Deleted!", "Report has been removed.", "success");
      } catch (err: any) {
        toast.error(err.data?.message || "Delete failed");
      }
    }
  };

  // 2. Function to handle opening the dialog
  const handleViewDetails = (id: string) => {
    setViewId(id);
    setIsViewOpen(true);
  };
  const navigate = useNavigate();
  const handleUserClick = (pcrId: string) => {
    if (!pcrId) return;
    //  setOpen(false);
    navigate(`/admin/dashboard/user-management?pcrId=${pcrId}`);
  };

  const columns: Column<any>[] = [
    { header: "REPORT ID", key: "reportId" },
    {
      header: "REPORTER",
      render: (row) => (
        <div
          onClick={() => handleUserClick(row.reporter?.pcrId)}
          className="group"
        >
          <p className="font-bold text-slate-800 group-hover:text-[#D4AF37] group-hover:cursor-pointer">
            {row.reporterName}
          </p>
          <p className="text-xs text-slate-400 group-hover:text-[#D4AF37] group-hover:cursor-pointer">
            {row.reporterEmail}
          </p>
        </div>
      ),
    },
    {
      header: "SUBJECT",
      render: (row) => <span className="font-medium">{row.subject}</span>,
    },
    {
      header: "PRIORITY",
      render: (row) => {
        const colors: any = {
          HIGH: "bg-red-100 text-red-700",
          MEDIUM: "bg-amber-100 text-amber-700",
          LOW: "bg-blue-100 text-blue-700",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold ${colors[row.priority]}`}
          >
            {row.priority}
          </span>
        );
      },
    },
    {
      header: "STATUS",
      render: (row) => {
        const styles: any = {
          RESOLVED: "text-green-600 bg-green-50",
          READ: "text-blue-600 bg-blue-50",
          UNREAD: "text-amber-600 bg-amber-50",
        };
        return (
          <Select
            defaultValue={row.status}
            onValueChange={(val) => handleStatusUpdate(row.id, val)}
          >
            <SelectTrigger
              className={`w-32 h-8 text-xs font-bold border-none focus:ring-0 cursor-pointer ${styles[row.status]}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UNREAD">UNREAD</SelectItem>
              <SelectItem value="READ">READ</SelectItem>
              <SelectItem value="RESOLVED">RESOLVED</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      header: "DATE",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "ACTIONS",
      render: (row) => (
        <div className="flex items-center gap-3">
          <FiEye
            onClick={() => handleViewDetails(row.id)}
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
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10 w-64 h-10 border-slate-200"
              placeholder="Search reports..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 h-10 border-slate-200 bg-white cursor-pointer">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="UNREAD">Unread</SelectItem>
              <SelectItem value="READ">Read</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <CommonTable
        columns={columns}
        data={reportsResponse?.data || []}
        loading={isLoading}
      />

      <CommonPagination
        currentPage={page}
        totalPages={reportsResponse?.meta?.totalPages || 1}
        onPageChange={setPage}
      />

      <ReportDetailsDialog
        open={isViewOpen}
        setOpen={setIsViewOpen}
        id={viewId}
      />
    </div>
  );
};

export default ReportManagement;
