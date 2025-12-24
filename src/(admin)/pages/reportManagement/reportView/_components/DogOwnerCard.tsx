import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const DogOwnerCard = () => (
  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
    <div className="flex items-center gap-2 mb-4 text-[#C10007]">
      <Users size={20} />
      <h3 className="font-bold text-gray-900">Dog Owner</h3>
    </div>
    
    <div className="flex items-center gap-3 mb-4">
      <div className="h-12 w-12 rounded-full overflow-hidden border">
        <img 
          src="https://randomuser.me/api/portraits/men/32.jpg" 
          alt="Owner" 
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <p className="text-[11px] text-gray-400 uppercase font-semibold">Owner Name</p>
        <p className="font-bold text-gray-900 leading-none">Michael Chen</p>
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <p className="text-[11px] text-gray-400 uppercase font-semibold">Owner ID</p>
        <div className="bg-white  p-2 rounded-md text-sm font-bold mt-1">
          PCR-OW-008765
        </div>
      </div>
      <Button 
        variant="outline" 
        className="w-full text-[#E7000B] border-[#E7000B] hover:bg-white hover:text-[#C10007] cursor-pointer"
      >
        View Owner Profile
      </Button>
    </div>
  </div>
);

export default DogOwnerCard;