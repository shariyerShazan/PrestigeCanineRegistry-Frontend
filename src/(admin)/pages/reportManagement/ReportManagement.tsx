/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiSearch } from "react-icons/fi";
import ReportManagementCard from "./_components/ReportManagementCard";
import {
  useGetAllReportsQuery,
  type ReportStatus,
} from "@/redux/features/report-api/report.api";
import { Skeleton } from "@/components/ui/skeleton";

const ReportManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all");

  // Redux Hook for fetching data
  const { data: reportsData, isLoading } = useGetAllReportsQuery({
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  // Client-side search logic
  const filteredReports = reportsData?.data?.filter(
    (report) =>
      report.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporterName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6 bg-[#F8FAFC] min-h-screen">
      {/* Header Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            className="pl-10 w-64 h-10 border-slate-200 rounded-xl bg-white"
            placeholder="Search report..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as any)}
        >
          <SelectTrigger className="w-40 h-10 border-slate-200 bg-white rounded-xl cursor-pointer">
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

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? // Skeleton loaders during fetching
            Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[400px] w-full rounded-3xl" />
              ))
          : filteredReports?.map((report) => (
              <ReportManagementCard
                key={report.id}
                id={report.id}
                reportId={report.reportId}
                status={report.status}
                priority={report.priority}
                subject={report.subject}
                description={report.description}
                reporterName={report.reporterName}
                reporterEmail={report.reporterEmail}
                dogName={report.canine?.name || report.litter?.name || "N/A"}
                dogId={report.canine?.pcrId || report.litter?.pcrId || "N/A"}
                ownerName={report.canine?.ownerId || "System"} // API should ideally include owner name
                ownerId={report.canine?.ownerId || "N/A"}
                date={new Date(report.createdAt).toLocaleDateString()}
              />
            ))}
      </div>

      {!isLoading && filteredReports?.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          No reports found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ReportManagement;
