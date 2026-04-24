import PrestigeCertificate from "../../certificate/Certificate";
import CertificateReqField from "./CertificateReqFileld";
import ViewCertifSidebar from "./ViewCertifSidebar";

const CertificateReqDetails = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-5">
      
      {/* LEFT SECTION */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full flex justify-center pb-8 border-b border-gray-300">
          <div className="w-full max-w-[1000px]">
            <PrestigeCertificate width={1000} />
          </div>
        </div>

        <div className="w-full px-4 mt-8">
          <CertificateReqField />
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="flex-none w-full lg:w-[30%] lg:sticky  self-start">
        <ViewCertifSidebar />
      </div>
    </div>
  );
};

export default CertificateReqDetails;
