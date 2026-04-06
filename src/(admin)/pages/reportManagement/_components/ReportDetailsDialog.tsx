import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, User, Hash, Target, Loader2, Info, Calendar } from "lucide-react";
import { useGetSingleReportQuery, useResolveReportActionMutation, useDeleteReportMutation } from "@/redux/features/report-api/report.api";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export const DataBox = ({ label, value, valueColor, icon: Icon }: any) => (
  <div className="bg-slate-50 p-4 rounded-xl border shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
        {label}
      </p>
      {Icon && <Icon className="text-slate-400" size={16} />}
    </div>
    <p className={`text-sm md:text-base font-bold truncate ${valueColor}`}>{value || "N/A"}</p>
  </div>
);

interface Props {
  id: string | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ReportDetailsDialog: React.FC<Props> = ({ id, open, setOpen }) => {
  const { data: report, isLoading } = useGetSingleReportQuery(id!, { skip: !id });
  const [resolveReport, { isLoading: isResolving }] = useResolveReportActionMutation();
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
      <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden border-0 shadow-xl bg-white rounded-2xl w-[95vw]">
        {isLoading ? (
          <div className="h-[50vh] flex flex-col items-center justify-center gap-4 bg-white">
            <Loader2 className="w-10 h-10 animate-spin text-red-500" />
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Loading Case Data...</p>
          </div>
        ) : (
          <ScrollArea className="max-h-[85vh]">
            <div className="p-6 md:p-10 space-y-10">
              
              <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-red-50 bg-red-100 shrink-0 flex items-center justify-center">
                     <AlertTriangle size={40} className="text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{report?.subject || "Unknown Report"}</h1>
                      <Badge className={report?.status === "RESOLVED" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-red-100 text-red-700 hover:bg-red-100"}>
                        {report?.status}
                      </Badge>
                      <Badge className={report?.priority === "HIGH" ? "bg-red-500 text-white" : "bg-slate-200 text-slate-800"}>
                        {report?.priority} PRIORITY
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm font-medium text-slate-500">
                       <p className="flex items-center gap-1.5"><Hash size={16} /> ID: {report?.reportId}</p>
                       <p className="flex items-center gap-1.5"><Calendar size={16} /> Created: {report ? new Date(report.createdAt).toLocaleDateString() : "N/A"}</p>
                    </div>
                  </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
                 <DataBox label="Target Asset" value={targetAsset?.name} valueColor="text-blue-600" icon={Target} />
                 <DataBox label="Asset Type" value={assetType} valueColor="text-slate-800" icon={Info} />
                 <DataBox label="Asset PCR ID" value={targetAsset?.pcrId} valueColor="text-slate-800 font-mono" icon={Hash} />
                 <DataBox label="ReasonCode" value={report?.reason} valueColor="text-red-600" icon={AlertTriangle} />
              </div>

              {/* Layout for Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Left: Reporter */}
                 <div>
                    <div className="mb-4 border-b pb-2">
                      <h3 className="text-sm font-semibold tracking-wide text-slate-700 uppercase flex items-center gap-2">
                         <User size={16} /> Reporter Info
                      </h3>
                    </div>
                    <div className="bg-slate-50 border rounded-xl p-5 space-y-4">
                       <div className="flex justify-between border-b border-slate-200/60 pb-2">
                          <span className="text-xs font-bold text-slate-400">FULL NAME</span>
                          <span className="text-sm font-bold text-slate-700">{report?.reporter?.fullName || "SYSTEM"}</span>
                       </div>
                       <div className="flex justify-between border-b border-slate-200/60 pb-2">
                          <span className="text-xs font-bold text-slate-400">EMAIL</span>
                          <span className="text-sm font-bold text-slate-700">{report?.reporter?.email || "N/A"}</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-xs font-bold text-slate-400">USER PCR ID</span>
                          <span className="text-sm font-bold text-blue-600 font-mono">{report?.reporter?.pcrId || "N/A"}</span>
                       </div>
                    </div>
                 </div>

                 {/* Right: Description */}
                 <div>
                    <div className="mb-4 border-b pb-2">
                      <h3 className="text-sm font-semibold tracking-wide text-slate-700 uppercase flex items-center gap-2">
                         <Info size={16} /> Case Description
                      </h3>
                    </div>
                    <div className="bg-white border rounded-xl p-5 shadow-sm">
                       <div className="relative border-l-4 border-amber-300 pl-4">
                         <p className="text-slate-600 text-sm leading-relaxed italic min-h-[80px]">
                           {report?.description || "No description provided."}
                         </p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Sticky Footer */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-12 mb-2">
                 {report?.status !== "RESOLVED" && (
                    <Button
                      onClick={handleResolve}
                      disabled={isResolving}
                      className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 shadow cursor-pointer"
                    >
                      {isResolving ? "Resolving..." : "Mark as Resolved"}
                    </Button>
                 )}
                 <Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    variant="outline"
                    className="flex-1 rounded-xl border-red-200 text-red-600 font-bold hover:bg-red-50 h-12 cursor-pointer"
                 >
                    {isDeleting ? "Deleting..." : "Permanently Delete Report"}
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
