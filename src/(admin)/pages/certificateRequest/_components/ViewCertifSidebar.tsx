
import { Button } from "@/components/ui/button";
import dog from "@/assets/dogSearchPage/dog1.jpg"
import DP from "@/assets/ownerDetails/profile.jpg"

const ViewCertifSidebar = () => {
  const canineData = {
    name: "Max Thunder",
    pcrId: "PCR-DG-001234",
    image: dog, 
  };

  const ownerData = {
    name: "Michael Chen",
    pcrId: "PCR-OW-008765",
    image:  DP , 
  };

  const cardContainerStyle = "bg-gray-50 border border-[#E5E7EB] rounded-[14px] p-5 shadow-sm mb-5";
  const labelStyle = "text-[13px] text-gray-400 font-medium mb-1 block";
  const nameStyle = "text-[18px] font-bold text-[#1C1C1C] mb-4";
  const idBoxStyle = "bg-white border border-[#F3F4F6] rounded-xl py-2 px-4 mb-4 text-[15px] font-bold text-[#2B4C8A]";
  const btnStyle = "w-full h-12 rounded-xl border-[#2B4C8A] text-[#2B4C8A] font-semibold hover:bg-blue-50 transition-colors cursor-pointer";

  return (
    <div className="w-[380px] p-4 bg-gray-50 min-h-screen">

      <div className={cardContainerStyle}>
        <div className="relative w-full h-[180px] rounded-xl overflow-hidden mb-4">
          <img 
            src={canineData.image} 
            alt="Canine" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div >
          <span className={labelStyle}>Canine Name</span>
          <h3 className={nameStyle}>{canineData.name}</h3>
          
          <span className={labelStyle}>PCR ID</span>
          <div className={idBoxStyle}>
            {canineData.pcrId}
          </div>
          
          <Button variant="outline" className={btnStyle}>
            View Canine Profile
          </Button>
        </div>
      </div>

      {/* --- OWNER SECTION --- */}
      <div className={cardContainerStyle}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100">
            <img 
              src={ownerData.image} 
              alt="Owner" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className={labelStyle}>Owner Name</span>
            <h3 className="text-[18px] font-bold text-[#1C1C1C]">{ownerData.name}</h3>
          </div>
        </div>
        
        <div>
          <span className={labelStyle}>Owner ID</span>
          <div className={idBoxStyle}>
            {ownerData.pcrId}
          </div>
          
          <Button variant="outline" className={btnStyle}>
            View Owner Profile
          </Button>
        </div>
      </div>

    </div>
  );
};

export default ViewCertifSidebar;