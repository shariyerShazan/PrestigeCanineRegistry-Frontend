/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FiAlertCircle,
  FiUser,
  FiMail,
  FiCalendar,
  FiTarget,
  FiHash,
  FiShield,
  FiCheckCircle,
  FiTrash2,
  FiInfo,
} from "react-icons/fi";
import {
  useGetSingleReportQuery,
  useResolveReportActionMutation,
  useDeleteReportMutation,
} from "@/redux/features/report-api/report.api";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface Props {
  id: string | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ReportDetailsDialog: React.FC<Props> = ({ id, open, setOpen }) => {
  const {
    data: report,
    isLoading,
    isError,
  } = useGetSingleReportQuery(id!, {
    skip: !id,
  });

  const [resolveReport, { isLoading: isResolving }] =
    useResolveReportActionMutation();
  const [deleteReport, { isLoading: isDeleting }] = useDeleteReportMutation();

  if (!id) return null;

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

  const targetAsset = report?.canine || report?.litter;
  const assetType = report?.canine ? "CANINE" : "LITTER";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[750px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl">
        {/* Header with Background Pattern */}
        <div className="bg-[#2B4C8A] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <FiShield size={200} />
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <Badge className="bg-[#D4AF37] hover:bg-[#D4AF37] text-white font-bold px-3 py-1 rounded-full border-none">
                {report?.reportId || "LOADING..."}
              </Badge>
              <div className="flex gap-2">
                <Badge
                  className={`${report?.priority === "HIGH" ? "bg-red-500/20" : "bg-white/10"} text-white border-white/20 backdrop-blur-md`}
                >
                  {report?.priority} PRIORITY
                </Badge>
              </div>
            </div>

            <DialogHeader>
              <DialogTitle className="text-white text-3xl font-black tracking-tight flex items-center gap-3 leading-tight">
                {report?.subject || "Fetching Details..."}
              </DialogTitle>
              <div className="flex items-center gap-4 text-blue-100/60 mt-2 font-medium">
                <span className="flex items-center gap-1.5 text-xs">
                  <FiCalendar className="text-[#D4AF37]" />{" "}
                  {report
                    ? new Date(report.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "—"}
                </span>
                <span className="flex items-center gap-1.5 text-xs">
                  <FiHash className="text-[#D4AF37]" /> {report?.status}
                </span>
              </div>
            </DialogHeader>
          </div>
        </div>

        <ScrollArea className="max-h-[75vh] bg-white">
          <div className="p-8 space-y-8">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-[#2B4C8A] rounded-full animate-spin"></div>
                <p className="text-slate-400 font-bold text-sm tracking-widest">
                  GATHERING EVIDENCE...
                </p>
              </div>
            )}

            {report && (
              <>
                {/* Asset Snapshot Card */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center bg-slate-50 p-6 rounded-[2rem] border border-slate-100 relative overflow-hidden group">
                  <div className="md:col-span-2 relative aspect-square md:aspect-auto h-40 w-full rounded-2xl overflow-hidden shadow-lg">
                    {(targetAsset as any)?.images?.[0] ? (
                      <img
                        src={(targetAsset as any)?.images[0]}
                        className="w-full h-full object-cover"
                        alt="Asset"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-bold text-[10px] tracking-tighter italic">
                        NO IMAGE
                      </div>
                    )}
                    <Badge className="absolute bottom-3 left-3 bg-[#2B4C8A]">
                      {assetType}
                    </Badge>
                  </div>

                  <div className="md:col-span-3 space-y-3">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <FiTarget className="text-[#2B4C8A]" /> Reported Asset
                    </h4>
                    <div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-1">
                        {targetAsset?.name}
                      </h3>
                      <p className="text-sm font-mono font-bold text-[#D4AF37]">
                        {targetAsset?.pcrId}
                      </p>
                    </div>
                    <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200/60">
                      <div className="text-[11px]">
                        <span className="text-slate-400 font-bold">BREED:</span>{" "}
                        <span className="text-slate-700 font-bold">
                          {(targetAsset as any)?.breedRelation?.name || "—"}
                        </span>
                      </div>
                      <div className="text-[11px]">
                        <span className="text-slate-400 font-bold">OWNER:</span>{" "}
                        <span className="text-slate-700 font-bold">
                          {(targetAsset as any)?.owner?.fullName || "SYSTEM"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <FiInfo className="text-[#2B4C8A]" /> Report Description
                  </h4>
                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-amber-200 rounded-full" />
                    <p className="text-slate-600 text-base leading-relaxed font-medium italic">
                      "{report.description}"
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className="rounded-lg text-[10px] font-bold py-1 px-3 bg-slate-50 border-slate-200 text-slate-500"
                    >
                      REASON: {report.reason}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                  {/* Reporter Info */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <FiUser className="text-[#2B4C8A]" /> Reporter Information
                    </h4>
                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl">
                      <DetailRow
                        icon={<FiUser />}
                        label="Full Name"
                        value={report.reporter?.fullName}
                      />
                      <DetailRow
                        icon={<FiMail />}
                        label="Email Address"
                        value={report.reporter?.email}
                      />
                      <DetailRow
                        icon={<FiHash />}
                        label="User ID"
                        value={report.reporter?.pcrId}
                      />
                    </div>
                  </div>

                  {/* Quick Metadata */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <FiShield className="text-[#2B4C8A]" /> Verification
                      Status
                    </h4>
                    <div className="p-4 rounded-2xl border-2 border-dashed border-slate-100 flex flex-col justify-center gap-3 h-[130px]">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500">
                          Current Status:
                        </span>
                        <Badge
                          className={`${report.status === "RESOLVED" ? "bg-emerald-500" : "bg-slate-700"} text-white`}
                        >
                          {report.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-500">
                          Process Action:
                        </span>
                        <span className="text-[10px] text-slate-400 italic">
                          Manual Admin Intervention Required
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sticky Footer for Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  {report.status !== "RESOLVED" && (
                    <Button
                      className="flex-1 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black h-14 shadow-lg shadow-emerald-200/50 transition-all hover:-translate-y-1 active:scale-95"
                      onClick={handleResolve}
                      disabled={isResolving}
                    >
                      <FiCheckCircle className="mr-2" size={20} />
                      {isResolving ? "RESOLVING..." : "MARK AS RESOLVED"}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="flex-1 rounded-2xl border-red-100 bg-red-50 hover:bg-red-100 text-red-600 font-bold h-14 shadow-sm transition-all hover:border-red-200"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    <FiTrash2 className="mr-2" size={18} />
                    {isDeleting ? "DELETING..." : "PERMANENT DELETE"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: any;
}) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-white rounded-lg text-[#2B4C8A] shadow-sm border border-slate-100">
      {React.cloneElement(icon, { size: 14 })}
    </div>
    <div className="flex flex-col">
      <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-none mb-0.5">
        {label}
      </span>
      <span className="text-xs font-bold text-slate-700 truncate max-w-[180px]">
        {value || "NOT PROVIDED"}
      </span>
    </div>
  </div>
);

export default ReportDetailsDialog;
