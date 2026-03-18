/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { PiClockCountdownLight } from "react-icons/pi";
import { useUpdateHealthRequestStatusMutation } from "@/redux/features/health-request/healthRequest.api";
import { toast } from "react-toastify";

type RecentUpdate = {
  id: string;
  type: "registration" | "certificate" | "health";
  dogName: string;
  image: string;
  pcrId: string;
  microchipId: string;
  submittedAt: string;
  status?: "PENDING" | "APPROVED" | "REJECTED" | "REVOKED";
  requester?: string;
};

type Props = {
  data: RecentUpdate;
  variant: "gray" | "yellow" | "green";
};

export default function RecentUpdateCard({ data, variant }: Props) {
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateHealthRequestStatusMutation();

  const variantStyles = {
    gray: "bg-[#E2E2E2] border-[#E2E2E2]",
    yellow: "bg-[#FEF9E7] border-[#D4AF37]",
    green: "bg-[#E8F5ED] border-[#00A63E]",
  };

  const handleStatusUpdate = async (newStatus: "APPROVED" | "REJECTED") => {
    try {
      await updateStatus({
        requestId: data.id,
        status: newStatus,
      }).unwrap();
      toast.success(`Health request ${newStatus.toLowerCase()} successfully!`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  return (
    <div
      className={`rounded-2xl w-full p-5 border transition-all ${variantStyles[variant]}`}
    >
      <div className="flex gap-4">
        {/* Dog Image */}
        <div className="shrink-0">
          <div className="w-42.5 h-42.5 rounded-xl overflow-hidden shadow-sm">
            <img
              src={data.image || "/placeholder.svg"}
              alt={data.dogName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-lg font-semibold text-black">
                {data.dogName}
              </h4>
              <p className="text-sm text-gray-600 capitalize">
                {data.type === "registration"
                  ? "New Registration"
                  : `${data.type} request`}
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1 border border-gray-200 shadow-sm">
              {data.status === "PENDING" ? (
                <>
                  <PiClockCountdownLight className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Pending
                  </span>
                </>
              ) : (
                <span
                  className={`text-sm font-bold ${
                    data.status === "APPROVED"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {data.status}
                </span>
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">PCR ID:</p>
              <p className="text-sm font-semibold text-black truncate">
                {data.pcrId}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Microchip</p>
              <p className="text-sm font-semibold text-black truncate">
                {data.microchipId}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Submitted</p>
              <p className="text-sm font-semibold text-black">
                {data.submittedAt}
              </p>
            </div>
          </div>

          {/* Requester Message */}
          {data.type === "health" && data.requester && (
            <div className="mb-3 bg-[#DBEAFE] rounded-lg p-3 border border-blue-100">
              <p className="text-sm text-gray-700">
                User{" "}
                <span className="font-bold text-blue-700 underline">
                  {data.requester}
                </span>{" "}
                requested for the health information of your dog.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {data.type === "health" && (
              <div className="flex gap-2">
                <Button
                  disabled={isUpdating || data.status !== "PENDING"}
                  onClick={() => handleStatusUpdate("APPROVED")}
                  className={`font-medium rounded-lg h-10 px-8 shadow-sm transition-colors ${
                    data.status === "APPROVED"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-[#00A63E] hover:bg-[#008C34] text-white disabled:bg-gray-200 disabled:text-gray-400"
                  }`}
                >
                  {isUpdating ? (
                    <Loader2 className="animate-spin" />
                  ) : data.status === "APPROVED" ? (
                    "Accepted"
                  ) : (
                    "Approve"
                  )}
                </Button>

                <Button
                  disabled={isUpdating || data.status !== "PENDING"}
                  onClick={() => handleStatusUpdate("REJECTED")}
                  className={`font-medium rounded-lg h-10 px-8 shadow-sm transition-colors ${
                    data.status === "REJECTED"
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "bg-[#E7000B] hover:bg-[#C10009] text-white disabled:bg-gray-200 disabled:text-gray-400"
                  }`}
                >
                  {data.status === "REJECTED" ? "Rejected" : "Decline"}
                </Button>
              </div>
            )}

            {data.type === "certificate" && (
              <Button className="bg-[#D4AF37] hover:bg-[#C19B28] text-black font-semibold rounded-lg h-10 px-6 flex items-center gap-2 shadow-sm">
                <span>Download Certificate</span>
                <Download className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
