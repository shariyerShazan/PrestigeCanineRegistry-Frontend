import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { PiClockCountdownLight } from "react-icons/pi";
import { useUpdateHealthRequestStatusMutation } from "@/redux/features/health-request/healthRequest.api";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import domtoimage from "dom-to-image-more";
import PrestigeCertificate from "@/(admin)/pages/certificate/Certificate";

type RecentUpdate = {
  id: string;
  type: "registration" | "certificate" | "health";
  dogName: string;
  image: string;
  pcrId: string;
  microchipId: string;
  submittedAt: string;
  status?:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "REVOKED"
    | "UNDER_REVIEW"
    | "DECLINE";
  requester?: string;
  // Make these optional since they may or may not come from the API payload for the card
  breed?: string;
  color?: string;
  owner?: string;
  kennel?: string;
  dob?: string;
};

type Props = {
  data: RecentUpdate;
  variant: "gray" | "yellow" | "green";
};

export default function RecentUpdateCard({ data, variant }: Props) {
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateHealthRequestStatusMutation();

  const certificateRef = useRef<HTMLDivElement>(null);

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

  const handleDownload = async () => {
    const element = certificateRef.current;
    if (!element) return;

    // Toast feedback that download is starting
    toast.info("Generating your certificate...", { autoClose: 2000 });

    try {
      // Create a cloned off-screen node if necessary, but dom-to-image usually works fine.
      const scale = 2;
      const imgData = await domtoimage.toPng(element, {
        height: element.offsetHeight * scale,
        width: element.offsetWidth * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${element.offsetWidth}px`,
          height: `${element.offsetHeight}px`,
        },
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // A4 landscape dimensions: 297 x 210 mm
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save(`${data.dogName}_Certificate.pdf`);
      toast.success("Downloaded Successfully");
    } catch (error: any) {
      toast.error(`Failed to generate PDF: ${error?.message || "Unknown error"}`);
      console.error("PDF Gen Error:", error);
    }
  };

  return (
    <div
      className={`rounded-2xl w-full p-5 border transition-all ${variantStyles[variant]} relative overflow-hidden`}
    >
      <div 
        style={{ 
          position: "fixed", 
          top: "200vh", 
          left: 0, 
          zIndex: -9999, 
          opacity: 0.01 
        }}
        id="pdf-cert-wrapper"
      >
        {/* Anti-Tailwind-Preflight fix for DOM capturers: strips phantom gray borders */}
        <style dangerouslySetInnerHTML={{ __html: `
          #pdf-cert-wrapper * {
            border-style: none !important;
            border-width: 0 !important;
            border-color: transparent !important;
            box-shadow: none !important;
          }
        `}} />
        <div ref={certificateRef}>
          <PrestigeCertificate
            width={1200}
            data={{
              name: data.dogName,
              pcrId: data.pcrId,
              breed: data.breed || "N/A",
              color: data.color || "N/A",
              sex: "N/A", 
              microchip: data.microchipId,
              dob: data.dob || "N/A",
              tier: "Gold",
              owner: data.owner || "N/A",
              kennel: data.kennel || "N/A",
              issueDate: data.submittedAt,
            }}
          />
        </div>
      </div>

      <div className="flex gap-4 relative z-10">
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

          {/* Certificate Specific Logic */}
          {data.type === "certificate" && (
            <div className="space-y-3">
              <div
                className={`rounded-lg p-3 border ${
                  data.status === "PENDING"
                    ? "bg-amber-50 border-amber-100 text-amber-800"
                    : data.status === "UNDER_REVIEW"
                      ? "bg-blue-50 border-blue-100 text-blue-800"
                      : data.status === "APPROVED"
                        ? "bg-green-50 border-green-100 text-green-800"
                        : "bg-red-50 border-red-100 text-red-800"
                }`}
              >
                <p className="text-sm">
                  {data.status === "PENDING" &&
                    "Your certificate request is currently under review by our team."}
                  {data.status === "UNDER_REVIEW" &&
                    "Your request is being processed. We are reviewing the dog's information."}
                  {data.status === "APPROVED" &&
                    "Congratulations! Your certificate has been approved and is ready for download."}
                  {(data.status === "DECLINE" || data.status === "REJECTED") &&
                    "Unfortunately, your certificate request was declined. Please check the details and try again."}
                </p>
              </div>

              {/* Download button ONLY shows when status is APPROVED */}
              {data.status === "APPROVED" && (
                <Button 
                   onClick={handleDownload}
                   className="bg-[#D4AF37] cursor-pointer hover:bg-[#C19B28] text-black font-semibold rounded-lg h-10 px-6 flex items-center gap-2 shadow-sm transition-transform active:scale-95"
                >
                  <span>Download Certificate</span>
                  <Download className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}

          {/* Health Specific Logic */}
          {data.type === "health" && (
            <div className="space-y-3">
              {data.requester && (
                <div className="bg-[#DBEAFE] rounded-lg p-3 border border-blue-100">
                  <p className="text-sm text-gray-700">
                    User{" "}
                    <span className="font-bold text-blue-700 underline">
                      {data.requester}
                    </span>{" "}
                    requested for the health information of your dog.
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  disabled={isUpdating || data.status !== "PENDING"}
                  onClick={() => handleStatusUpdate("APPROVED")}
                  className={`font-medium rounded-lg h-10 px-8 shadow-sm transition-colors cursor-pointer ${
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
                  className={`font-medium rounded-lg h-10 px-8 shadow-sm transition-colors cursor-pointer ${
                    data.status === "REJECTED"
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "bg-[#E7000B] hover:bg-[#C10009] text-white disabled:bg-gray-200 disabled:text-gray-400"
                  }`}
                >
                  {data.status === "REJECTED" ? "Rejected" : "Decline"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
