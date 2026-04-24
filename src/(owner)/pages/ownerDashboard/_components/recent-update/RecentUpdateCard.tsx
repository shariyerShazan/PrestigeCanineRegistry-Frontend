
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { PiClockCountdownLight } from "react-icons/pi";
import { useUpdateHealthRequestStatusMutation } from "@/redux/features/health-request/healthRequest.api";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import domtoimage from "dom-to-image-more";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import PrestigeAmbassador from "@/(admin)/pages/certificate/PrestigeAmbassador";
import PedigreeCertificate from "@/(admin)/pages/certificate/PedigreeCertificate";
import PCRCertificate from "@/(admin)/pages/certificate/PCRCertificate";
import { useGetMySingleCertificateRequestQuery } from "@/redux/features/certificate-request/certificate.req.api";

type RecentUpdate = {
  id: string;
  type: "registration" | "certificate" | "health";
  dogName: string; // Used for UI display primarily
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
  breed?: string;
  color?: string;
  owner?: string;
  kennel?: string;
  dob?: string;
  tier?: string;
};

type Props = {
  data: RecentUpdate;
  variant: "gray" | "yellow" | "green";
};

export default function RecentUpdateCard({ data, variant }: Props) {
  const { data: userData } = useGetMeQuery(undefined);
  const user = userData?.data;

  const [shouldDownload, setShouldDownload] = useState(false);
  const { data: singleDetails, isFetching } = useGetMySingleCertificateRequestQuery(
    data.id,
    { skip: !shouldDownload }
  );
    console.log(singleDetails?.canine)
  const [updateStatus, { isLoading: isUpdating }] = useUpdateHealthRequestStatusMutation();
  const certificateRef = useRef<HTMLDivElement>(null);

  const variantStyles = {
    gray: "bg-[#E2E2E2] border-[#E2E2E2]",
    yellow: "bg-[#FEF9E7] border-[#D4AF37]",
    green: "bg-[#E8F5ED] border-[#00A63E]",
  };

  useEffect(() => {
    if (!isFetching && singleDetails && shouldDownload) {
      executeDownload();
    }
  }, [isFetching, singleDetails, shouldDownload]);

  const executeDownload = async () => {
    setTimeout(async () => {
      const element = certificateRef.current;
      if (!element) return;

      try {
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

        pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
        pdf.save(`${data.dogName || "Canine"}_Certificate.pdf`);
        toast.success("Downloaded Successfully");
      } catch (error) {
        toast.error("PDF generation failed.");
      } finally {
        setShouldDownload(false);
      }
    }, 500);
  };

  const handleDownloadClick = () => {
    if (singleDetails) {
      executeDownload();
    } else {
      setShouldDownload(true);
      toast.info("Fetching certificate details...");
    }
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

  const renderCertificate = () => {
    const finalData = singleDetails || {};
    const canine = finalData?.canine || {};
    const ownerData = finalData?.owner || {};

    // selectedTier logic from schema enum
    const selectedTier = canine?.tier === "GOLD" ? "GOLD" : "BLUE";

    const canineLocation = [canine?.city, canine?.country]
      .filter(Boolean)
      .join(", ") || "N/A";

      const rawDate = finalData?.issuedDate || finalData?.createdAt || data.submittedAt;
      const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) : "N/A";

              const formatteDOB = rawDate
        ? new Date(canine?.dateOfBirth ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A";

    const certProps = {
      name: canine?.name || data.dogName, // schema uses 'name'
      pcrId: canine?.pcrId || data.pcrId,
      breed: canine?.breedRelation?.name || data.breed || "N/A",
      sex: canine?.gender || "N/A", // schema uses 'gender'
      dateOfBirth: formatteDOB || data.dob || "N/A", // schema uses 'dateOfBirth'
      owner: ownerData?.fullName || ownerData?.name || data.owner || "N/A",
      color: canine?.color || data.color || "N/A",
      microchip: canine?.microchipId || data.microchipId,
      tier: selectedTier,
      kennel: canineLocation,
      issueDate: formattedDate,
    };

    // User's pcrPrefix check for Prestige Ambassador
    if (user?.pcrPrefix === "PA") {
      return <PrestigeAmbassador data={certProps as any} s={1} />;
    }

    if (finalData?.certificateType === "PEDIGREE") {
      return <PedigreeCertificate data={certProps as any} s={1} />;
    }

    return <PCRCertificate data={certProps as any} s={1} />;
  };

  return (
    <div className={`rounded-2xl w-full p-5 border transition-all ${variantStyles[variant]} relative overflow-hidden`}>
      {/* Hidden Certificate Canvas */}
      <div 
        style={{ position: "fixed", top: "200vh", left: 0, zIndex: -9999, opacity: 0.01 }}
        id="pdf-cert-wrapper"
      >
        <style dangerouslySetInnerHTML={{ __html: `
          #pdf-cert-wrapper * {
            border-style: none !important;
            border-width: 0 !important;
            box-shadow: none !important;
          }
        `}} />
        <div ref={certificateRef}>
          {renderCertificate()}
        </div>
      </div>

      <div className="flex gap-4 relative z-10">
        <div className="shrink-0">
          <div className="w-42.5 h-42.5 rounded-xl overflow-hidden shadow-sm">
            <img
              src={data.image || "/placeholder.svg"}
              alt={data.dogName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-lg font-semibold text-black">{data.dogName}</h4>
              <p className="text-sm text-gray-600 capitalize">
                {data.type === "registration" ? "New Registration" : `${data.type} request`}
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1 border border-gray-200 shadow-sm">
              {data.status === "PENDING" ? (
                <>
                  <PiClockCountdownLight className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Pending</span>
                </>
              ) : (
                <span className={`text-sm font-bold ${data.status === "APPROVED" ? "text-green-600" : "text-red-600"}`}>
                  {data.status}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
            <div><p className="text-xs text-gray-500 mb-1">PCR ID:</p><p className="text-sm font-semibold text-black truncate">{data.pcrId}</p></div>
            <div><p className="text-xs text-gray-500 mb-1">Microchip</p><p className="text-sm font-semibold text-black truncate">{data.microchipId}</p></div>
            <div><p className="text-xs text-gray-500 mb-1">Submitted</p><p className="text-sm font-semibold text-black">{data.submittedAt}</p></div>
          </div>

          {data.type === "certificate" && (
            <div className="space-y-3">
              <div className={`rounded-lg p-3 border ${data.status === "APPROVED" ? "bg-green-50 border-green-100 text-green-800" : "bg-amber-50 border-amber-100 text-amber-800"}`}>
                <p className="text-sm">
                  {data.status === "APPROVED" 
                    ? "Congratulations! Your certificate is ready for download." 
                    : "Your request is currently under review."}
                </p>
              </div>

              {data.status === "APPROVED" && (
                <Button 
                   onClick={handleDownloadClick}
                   disabled={isFetching || (shouldDownload && isFetching)}
                   className="bg-[#D4AF37] hover:bg-[#C19B28] cursor-pointer text-black font-semibold rounded-lg h-10 px-6 flex items-center gap-2 active:scale-95 transition-all"
                >
                  {(isFetching || shouldDownload) ? <Loader2 className="animate-spin w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>Download Certificate</span>
                </Button>
              )}
            </div>
          )}

          {data.type === "health" && (
            <div className="space-y-3 pt-2">
              <div className="flex gap-2">
                <Button
                  disabled={isUpdating || data.status !== "PENDING"}
                  onClick={() => handleStatusUpdate("APPROVED")}
                  className={`font-medium rounded-lg h-10 px-8 cursor-pointer ${
                    data.status === "APPROVED" ? "bg-green-100 text-green-700" : "bg-[#00A63E] text-white"
                  }`}
                >
                  {isUpdating ? <Loader2 className="animate-spin" /> : data.status === "APPROVED" ? "Accepted" : "Approve"}
                </Button>
                <Button
                  disabled={isUpdating || data.status !== "PENDING"}
                  onClick={() => handleStatusUpdate("REJECTED")}
                  className={`font-medium rounded-lg h-10 px-8 cursor-pointer ${
                    data.status === "REJECTED" ? "bg-red-100 text-red-700" : "bg-[#E7000B] text-white"
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