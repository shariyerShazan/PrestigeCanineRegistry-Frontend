// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   FiAlertCircle,
//   FiUser,
//   FiMail,
//   FiCalendar,
//   FiTarget,
// } from "react-icons/fi";
// import {
//   useGetSingleReportQuery,
//   useResolveReportActionMutation,
//   useDeleteReportMutation,
// } from "@/redux/features/report-api/report.api";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";

// interface Props {
//   id: string | null;
//   open: boolean;
//   setOpen: (open: boolean) => void;
// }

// const ReportDetailsDialog: React.FC<Props> = ({ id, open, setOpen }) => {
//   const {
//     data: report,
//     isLoading,
//     isError,
//   } = useGetSingleReportQuery(id!, {
//     skip: !id,
//   });

//   const [resolveReport] = useResolveReportActionMutation();
//   const [deleteReport] = useDeleteReportMutation();

//   if (!id) return null;

//   const handleResolve = async () => {
//     if (!report) return;
//     try {
//       await resolveReport({ id: report.id, status: "RESOLVED" }).unwrap();
//       toast.success("Report marked as RESOLVED!");
//       setOpen(false);
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to resolve report");
//     }
//   };

//   const handleDelete = async () => {
//     if (!report) return;
//     try {
//       await deleteReport(report.id).unwrap();
//       toast.success("Report deleted successfully!");
//       setOpen(false);
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Delete failed");
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden border-none shadow-2xl">
//         {/* Header */}
//         <div className="bg-[#2B4C8A] p-6 text-white relative">
//           <div className="absolute top-0 right-0 p-4 opacity-10">
//             <FiAlertCircle size={80} />
//           </div>
//           <DialogHeader>
//             <DialogTitle className="text-white flex items-center gap-2 text-2xl font-bold">
//               <FiAlertCircle className="text-[#D4AF37]" />
//               Report Details
//             </DialogTitle>
//             <p className="text-blue-100/70 text-sm mt-1">
//               ID: {report?.reportId || "—"}
//             </p>
//           </DialogHeader>
//         </div>

//         <ScrollArea className="max-h-[70vh] bg-white">
//           <div className="p-6 space-y-6">
//             {isLoading && (
//               <p className="text-center text-slate-500">Loading...</p>
//             )}
//             {isError && (
//               <p className="text-center text-red-500">Failed to load report</p>
//             )}

//             {report && (
//               <>
//                 {/* Meta */}
//                 <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border">
//                   <DetailItem
//                     icon={<FiTarget />}
//                     label="Priority"
//                     value={
//                       <Badge
//                         className={
//                           report.priority === "HIGH"
//                             ? "bg-red-500"
//                             : "bg-blue-500"
//                         }
//                       >
//                         {report.priority}
//                       </Badge>
//                     }
//                   />
//                   <DetailItem
//                     icon={<FiCalendar />}
//                     label="Date"
//                     value={new Date(report.createdAt).toLocaleDateString()}
//                   />
//                   <DetailItem
//                     icon={<FiUser />}
//                     label="Reporter"
//                     value={report.reporter?.fullName}
//                   />
//                   <DetailItem
//                     icon={<FiMail />}
//                     label="Email"
//                     value={report.reporter?.email}
//                   />
//                 </div>

//                 {/* Target */}
//                 {(report.canine || report.litter) && (
//                   <div className="space-y-3">
//                     <p className="text-xs font-bold text-slate-400 uppercase">
//                       Linked Asset
//                     </p>
//                     <div className="p-4 border rounded-xl bg-[#F8FAFC] space-y-2">
//                       <p className="font-black text-[#2B4C8A]">
//                         {report.canine?.name || report.litter?.name}
//                       </p>
//                       <p className="text-xs text-[#D4AF37] font-mono font-bold">
//                         {report.canine?.pcrId || report.litter?.pcrId}
//                       </p>
//                       <p className="text-xs text-slate-500">
//                         Breed:{" "}
//                         {report.canine?.breedRelation?.name ||
//                           report.litter?.breedRelation?.name ||
//                           "—"}
//                       </p>
//                       <p className="text-xs text-slate-500">
//                         Owner:{" "}
//                         {report.canine?.owner?.fullName ||
//                           report.litter?.owner?.fullName ||
//                           "—"}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Content */}
//                 <div className="space-y-3">
//                   <p className="text-xs font-bold text-slate-400 uppercase">
//                     Content
//                   </p>
//                   <h4 className="font-bold text-lg text-slate-800">
//                     {report.subject}
//                   </h4>
//                   <div className="p-4 bg-slate-50 rounded-xl border text-sm text-slate-600 leading-relaxed">
//                     {report.description}
//                   </div>
//                 </div>

//                 {/* Status */}
//                 <div className="flex justify-between items-center mt-2">
//                   <span className="text-xs font-bold text-slate-400 uppercase">
//                     Status
//                   </span>
//                   <Badge>{report.status}</Badge>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-2 mt-4">
//                   {report.status !== "RESOLVED" && (
//                     <Button
//                       variant="outline"
//                       className="cursor-pointer"
//                       onClick={handleResolve}
//                     >
//                       Mark as Resolved
//                     </Button>
//                   )}
//                   <Button
//                     variant="destructive"
//                     className="cursor-pointer"
//                     onClick={handleDelete}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </>
//             )}
//           </div>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ReportDetailsDialog;

// const DetailItem = ({ icon, label, value }: any) => (
//   <div className="flex items-start gap-2">
//     <div className="mt-1 text-[#2B4C8A]">{icon}</div>
//     <div className="flex flex-col">
//       <span className="text-[10px] text-slate-400 uppercase font-bold">
//         {label}
//       </span>
//       <span className="text-sm font-semibold text-slate-700">
//         {value || "—"}
//       </span>
//     </div>
//   </div>
// );
