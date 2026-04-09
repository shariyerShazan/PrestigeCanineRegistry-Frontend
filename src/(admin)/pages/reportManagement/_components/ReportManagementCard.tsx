// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { FiEye, FiTrash2 } from "react-icons/fi";
// import { LuCheckCheck, LuClock3 } from "react-icons/lu";
// import { useNavigate } from "react-router";
// import { GrFlag } from "react-icons/gr";
// import {
//   useResolveReportActionMutation,
//   useDeleteReportMutation,
//   type PriorityLevel,
//   type ReportStatus,
// } from "@/redux/features/report-api/report.api";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";

// interface ReportProps {
//   id: string; // Internal UUID for actions
//   reportId: string; // Human-readable ID (REP-0001-XXXX)
//   status: ReportStatus;
//   priority: PriorityLevel;
//   subject: string;
//   description: string;
//   reporterName: string;
//   reporterEmail: string;
//   dogName: string;
//   dogId: string;
//   ownerName: string;
//   ownerId: string;
//   date: string;
// }

// const ReportManagementCard: React.FC<ReportProps> = ({
//   id,
//   reportId,
//   status,
//   priority,
//   subject,
//   description,
//   reporterName,
//   reporterEmail,
//   dogName,
//   dogId,
//   ownerName,
//   ownerId,
//   date,
// }) => {
//   const navigate = useNavigate();

//   // RTK Mutations
//   const [resolveReport, { isLoading: isResolving }] =
//     useResolveReportActionMutation();
//   const [deleteReport, { isLoading: isDeleting }] = useDeleteReportMutation();

//   // Status Styles mapping
//   const statusStyles: Record<ReportStatus, string> = {
//     UNREAD: "bg-red-50 text-[#9F0712]",
//     READ: "bg-blue-50 text-[#193CB8]",
//     RESOLVED: "bg-green-50 text-[#016630]",
//   };

//   const priorityStyles: Record<PriorityLevel, string> = {
//     HIGH: "bg-red-100 text-red-700",
//     MEDIUM: "bg-orange-100 text-orange-700",
//     LOW: "bg-blue-100 text-blue-700",
//   };

//   // Actions
//   const handleResolve = async () => {
//     try {
//       await resolveReport({
//         id,
//         status: "RESOLVED",
//         action: "MARK_AS_RESOLVED",
//       }).unwrap();
//       toast.success("Report marked as resolved");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Something went wrong");
//     }
//   };

//   const handleDelete = async () => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this report!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#EF4444", // red-500
//       cancelButtonColor: "#64748B", // slate-500
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//       customClass: {
//         popup: "rounded-3xl",
//         confirmButton: "rounded-xl px-6 py-2 font-bold",
//         cancelButton: "rounded-xl px-6 py-2 font-bold",
//       },
//     });

//     if (result.isConfirmed) {
//       try {
//         await deleteReport(id).unwrap();

//         // Success Alert
//         await Swal.fire({
//           title: "Deleted!",
//           text: "The report has been deleted.",
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false,
//           customClass: {
//             popup: "rounded-3xl",
//           },
//         });
//       } catch (err: any) {
//         Swal.fire({
//           title: "Error!",
//           text: err?.data?.message || "Failed to delete report.",
//           icon: "error",
//           confirmButtonColor: "#155DFC",
//           customClass: {
//             popup: "rounded-3xl",
//             confirmButton: "rounded-xl px-6 py-2 font-bold",
//           },
//         });
//       }
//     }
//   };
//   return (
//     <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
//       <CardContent className="p-6 space-y-4">
//         {/* Header Badges */}
//         <div className="flex justify-between items-start">
//           <div className="flex flex-col gap-2">
//             <div className="flex items-center gap-2 font-bold text-slate-700">
//               <GrFlag className="size-5 text-[#F54900]" />
//               <span>{reportId}</span>
//             </div>
//             <div className="flex gap-2">
//               <span
//                 className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${priorityStyles[priority] || "bg-slate-100"}`}
//               >
//                 {priority} PRIORITY
//               </span>
//             </div>
//           </div>
//           <span
//             className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${statusStyles[status]}`}
//           >
//             {status}
//           </span>
//         </div>

//         {/* Title Section */}
//         <div className="space-y-2">
//           <div className="flex">
//             <p className="px-3 py-1 mb-1 bg-slate-100 text-slate-500 text-[11px] font-medium rounded-full">
//               Issue Report
//             </p>
//           </div>
//           <h3 className="text-lg font-bold text-slate-800 leading-tight">
//             {subject}
//           </h3>
//           <p className="text-sm text-slate-600 line-clamp-2">{description}</p>
//         </div>

//         {/* Reporter Info */}
//         <div className="p-4 bg-[#F9FAFB] rounded-2xl border border-gray-100">
//           <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">
//             Reporter
//           </p>
//           <p className="font-bold text-slate-800 text-sm">{reporterName}</p>
//           <p className="text-xs text-slate-500">{reporterEmail}</p>
//         </div>

//         {/* Target Details */}
//         <div className="p-4 bg-[#F9FAFB] rounded-2xl border border-gray-100">
//           <p className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-wider">
//             Target Details
//           </p>
//           <div className="grid grid-cols-2 gap-2">
//             <div>
//               <p className="text-[10px] text-slate-400 uppercase">Dog/Litter</p>
//               <p className="font-bold text-slate-800 text-xs truncate">
//                 {dogName}
//               </p>
//               <p className="text-[9px] text-slate-500 truncate">{dogId}</p>
//             </div>
//             <div>
//               <p className="text-[10px] text-slate-400 uppercase">Owner</p>
//               <p className="font-bold text-slate-800 text-xs truncate">
//                 {ownerName}
//               </p>
//               <p className="text-[9px] text-slate-500 truncate">{ownerId}</p>
//             </div>
//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="flex flex-col gap-3 pt-2">
//           <div className="flex items-center gap-2 text-slate-400 text-xs">
//             <LuClock3 />
//             <span>{date}</span>
//           </div>

//           <div className="flex gap-2">
//             <Button
//               onClick={() =>
//                 navigate(`/admin/dashboard/Reports-Management/${id}`)
//               }
//               variant="ghost"
//               className="h-10 px-4 flex-1 cursor-pointer bg-blue-50 text-[#155DFC] hover:bg-blue-100 rounded-xl font-bold gap-2 text-sm"
//             >
//               <FiEye className="size-4" /> View Details
//             </Button>

//             {status !== "RESOLVED" && (
//               <Button
//                 onClick={handleResolve}
//                 disabled={isResolving}
//                 variant="ghost"
//                 className="size-10 p-0 bg-green-50 text-[#00A63E] hover:bg-green-100 rounded-xl cursor-pointer"
//                 title="Mark as Resolved"
//               >
//                 <LuCheckCheck
//                   className={`size-5 ${isResolving ? "animate-pulse" : ""}`}
//                 />
//               </Button>
//             )}

//             <Button
//               onClick={handleDelete}
//               disabled={isDeleting}
//               variant="ghost"
//               className="size-10 p-0 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl cursor-pointer"
//               title="Delete Report"
//             >
//               <FiTrash2
//                 className={`size-5 ${isDeleting ? "animate-pulse" : ""}`}
//               />
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ReportManagementCard;
