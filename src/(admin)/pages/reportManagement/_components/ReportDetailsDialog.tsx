/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertTriangle,
  User,
  Hash,
  Target,
  Loader2,
  Info,
  Calendar,
  ShieldAlert,
  ExternalLink,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import {
  useGetSingleReportQuery,
  useResolveReportActionMutation,
  useDeleteReportMutation,
} from "@/redux/features/report-api/report.api";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { format } from "date-fns";

// DataBox with Icon (Matching Canine Style)
export const DataBox = ({
  label,
  value,
  valueColor,
  icon: Icon,
  onClick,
}: any) => (
  <div
    onClick={onClick}
    className={`bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm transition-all ${
      onClick
        ? "cursor-pointer hover:border-blue-400 hover:bg-white hover:shadow-md active:scale-95"
        : ""
    }`}
  >
    <div className="flex justify-between items-start mb-2">
      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
        {label}
      </p>
      {Icon && <Icon className="text-slate-300" size={14} />}
    </div>
    <div className="flex items-center gap-2">
      <p
        className={`text-sm font-bold truncate ${valueColor || "text-slate-700"}`}
      >
        {value || "N/A"}
      </p>
      {onClick && <ExternalLink size={12} className="text-blue-400" />}
    </div>
  </div>
);

const SectionHeader = ({ title, icon: Icon }: any) => (
  <div className="flex items-center gap-2 mb-5 border-b border-slate-100 pb-3">
    {Icon && <Icon size={18} className="text-red-500" />}
    <h3 className="text-sm font-bold tracking-widest text-slate-700 uppercase italic">
      {title}
    </h3>
  </div>
);

interface Props {
  id: string | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ReportDetailsDialog: React.FC<Props> = ({ id, open, setOpen }) => {
  const navigate = useNavigate();
  const { data: report, isLoading } = useGetSingleReportQuery(id!, {
    skip: !id,
  });
  const [resolveReport, { isLoading: isResolving }] =
    useResolveReportActionMutation();
  const [deleteReport, { isLoading: isDeleting }] = useDeleteReportMutation();

  const handleResolve = async () => {
    if (!report) return;
    try {
      await resolveReport({ id: report.id, status: "RESOLVED" }).unwrap();
      toast.success("Case marked as RESOLVED");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to resolve");
    }
  };

  const handleDelete = async () => {
    if (!report) return;
    try {
      await deleteReport(report.id).unwrap();
      toast.success("Report permanently deleted");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const handleUserClick = (pcrId: string) => {
    if (!pcrId) return;
    setOpen(false);
    navigate(`/admin/dashboard/user-management?pcrId=${pcrId}`);
  };

  const handleAssetClick = (pcrId: string, type: string) => {
    if (!pcrId) return;
    setOpen(false);
    const path =
      type === "CANINE"
        ? "/admin/dashboard/canine-management"
        : "/admin/dashboard/litter-management";
    navigate(`${path}?pcrId=${pcrId}`);
  };

  const targetAsset = report?.canine || report?.litter;
  const assetType = report?.canine ? "CANINE" : "LITTER";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden border-0 rounded-3xl shadow-2xl bg-white w-[95vw]">
        {isLoading ? (
          <div className="h-[50vh] flex flex-col items-center justify-center gap-4 bg-slate-50/30">
            <Loader2 className="w-12 h-12 animate-spin text-red-500" />
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">
              Fetching Case Details...
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-[90vh]">
            <div className="p-6 md:p-10 space-y-10">
              {/* --- HEADER SECTION --- */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-red-50 bg-red-50 shrink-0 flex items-center justify-center shadow-sm">
                  <ShieldAlert
                    size={44}
                    strokeWidth={1.5}
                    className="text-red-500"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                      {report?.subject || "Incident Report"}
                    </h1>
                    <Badge
                      className={
                        report?.status === "RESOLVED"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-red-50 text-red-600 border-red-100"
                      }
                    >
                      {report?.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        report?.priority === "HIGH"
                          ? "border-red-500 text-red-500 font-bold"
                          : "text-slate-500"
                      }
                    >
                      {report?.priority} PRIORITY
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 text-xs font-bold text-slate-400 tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Hash size={14} /> CASE: {report?.reportId}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} /> FILED:{" "}
                      {report?.createdAt
                        ? format(new Date(report.createdAt), "PPP")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* --- TARGET ASSET GRID --- */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <DataBox
                  label="Target Asset"
                  value={targetAsset?.name}
                  valueColor="text-slate-900"
                  icon={Target}
                />
                <DataBox
                  label="Asset Type"
                  value={assetType}
                  valueColor="text-slate-900"
                  icon={Info}
                />
                <DataBox
                  label="Asset PCR ID"
                  value={targetAsset?.pcrId}
                  valueColor="text-blue-600 font-mono"
                  icon={Hash}
                  onClick={() =>
                    handleAssetClick((targetAsset as any)?.pcrId, assetType)
                  }
                />
                <DataBox
                  label="Violation Reason"
                  value={report?.reason}
                  valueColor="text-red-600"
                  icon={AlertTriangle}
                />
              </div>

              {/* --- REPORTER & DESCRIPTION --- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Reporter Card (Owner Style) */}
                <div className="space-y-4">
                  <SectionHeader title="Reporter Information" icon={User} />
                  <div
                    onClick={() => handleUserClick((report as any)?.reporter?.pcrId)}
                    className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                      <User size={60} />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-4">
                      Verification Required
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                        <span className="text-xs font-bold text-slate-500">
                          Full Name
                        </span>
                        <span className="text-sm font-black text-slate-800 group-hover:text-blue-600">
                          {report?.reporter?.fullName || "ANONYMOUS"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                        <span className="text-xs font-bold text-slate-500">
                          Contact
                        </span>
                        <span className="text-sm font-bold text-slate-700">
                          {report?.reporter?.email || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500">
                          PCR ID
                        </span>
                        <span className="text-sm font-mono font-black text-blue-600 underline underline-offset-4">
                          {report?.reporter?.pcrId || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description Box (Genetic Section Style) */}
                <div className="space-y-4">
                  <SectionHeader title="Incident Statement" icon={Info} />
                  <div className="bg-[#0F172A] text-white rounded-2xl p-6 min-h-[160px] relative overflow-hidden shadow-xl border border-slate-800">
                    <div className="absolute -right-4 -bottom-4 opacity-5">
                      <AlertTriangle size={120} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4 text-amber-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Verified Statement
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed italic">
                        "
                        {report?.description ||
                          "No official description was provided for this incident."}
                        "
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- ACTION FOOTER --- */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                {report?.status !== "RESOLVED" && (
                  <Button
                    onClick={handleResolve}
                    disabled={isResolving}
                    className="flex-1 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest h-14 shadow-lg shadow-emerald-200/50 transition-transform active:scale-95"
                  >
                    {isResolving ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : (
                      <CheckCircle2 size={18} className="mr-2" />
                    )}
                    Mark as Resolved
                  </Button>
                )}
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  variant="outline"
                  className="flex-1 rounded-2xl border-2 border-red-100 text-red-600 font-black uppercase tracking-widest h-14 hover:bg-red-50 hover:border-red-200 transition-all active:scale-95"
                >
                  {isDeleting ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    <Trash2 size={18} className="mr-2" />
                  )}
                  Delete Permanent Record
                </Button>
              </div>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailsDialog;
