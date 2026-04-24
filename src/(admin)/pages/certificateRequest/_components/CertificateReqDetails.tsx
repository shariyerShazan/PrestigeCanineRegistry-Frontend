import { useParams } from "react-router";
import { Loader2 } from "lucide-react";
import { useAdminGetCertificateRequestByIdQuery } from "@/redux/features/certificate-request/certificate.req.api";

import PrestigeAmbassador from "../../certificate/PrestigeAmbassador";
import PedigreeCertificate from "../../certificate/PedigreeCertificate";
import PCRCertificate from "../../certificate/PCRCertificate";

import { useRef } from "react";

const CertificateReqDetails = () => {
  const { requestId } = useParams();
  if (!requestId) return null;

  const { data: response, isLoading } =
    useAdminGetCertificateRequestByIdQuery(requestId);

  const data = response;

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();

    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;

    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col w-full gap-5 p-4">

      {/* ✅ SCROLL + DRAG WRAPPER */}
  <div
  ref={scrollRef}
  onMouseDown={handleMouseDown}
  onMouseLeave={handleMouseLeave}
  onMouseUp={handleMouseUp}
  onMouseMove={handleMouseMove}
  className="w-full overflow-x-auto cursor-grab active:cursor-grabbing"
>
  <div className="w-[300px]  sm:w-[500px] md-[800px] lg:w-[1000px] xl:w-[1200px] mx-auto">
    {(() => {
      const canine = data?.canine || {};
      const owner = data?.owner || {};

      const selectedTier =
        canine?.tier === "GOLD" ? "GOLD" : "BLUE";

      const rawDate = data?.issuedDate || data?.createdAt;

      const formattedDate = rawDate
        ? new Date(rawDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A";

        
      const formatteDOB = rawDate
        ? new Date(canine?.dateOfBirth ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A";


      const certProps = {
        name: canine?.name || "N/A",
        pcrId: canine?.pcrId || "N/A",
        breed: canine?.breedRelation?.name || "N/A",
        sex: canine?.gender || "N/A",
        dateOfBirth: formatteDOB || "N/A",
        owner: owner?.fullName || owner?.name || "N/A",
        color: canine?.color || "N/A",
        microchip: canine?.microchipId || "N/A",
        tier: selectedTier,
        kennel:
          `${canine?.city || ""}, ${canine?.country || ""}` || "N/A",
        issueDate: formattedDate,
      };

      if (owner?.pcrPrefix === "PA") {
        return <PrestigeAmbassador data={certProps as any} s={1} />;
      }

      if (data?.certificateType === "PEDIGREE") {
        return <PedigreeCertificate data={certProps as any} s={1} />;
      }

      return <PCRCertificate data={certProps as any} s={1} />;
    })()}
  </div>
</div>

    </div>
  );
};

export default CertificateReqDetails;