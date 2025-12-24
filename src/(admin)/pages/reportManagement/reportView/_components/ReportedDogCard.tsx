import { Button } from "@/components/ui/button";
import { LuDog } from "react-icons/lu";
import dog from "@/assets/dogSearchPage/dog1.jpg"

export const ReportedDogCard = () => (
  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
    <div className="flex items-center gap-2 mb-4 text-[#C10007]">
       <span className="text-xl"><LuDog size={22} /></span> <h3 className="font-bold text-gray-900">Reported Dog</h3>
    </div>
    <div className="rounded-lg overflow-hidden mb-4">
      <img src={dog} alt="Max Thunder" className="w-full h-48 object-cover" />
    </div>
    <div className="space-y-3">
      <div>
        <p className="text-[11px] text-gray-400 uppercase">Dog Name</p>
        <p className="font-bold text-gray-900">Max Thunder</p>
      </div>
      <div>
        <p className="text-[11px] text-gray-400 uppercase">PCR ID</p>
        <div className="bg-white p-2 rounded-md text-sm font-bold mt-1">PCR-DG-001234</div>
      </div>
      <Button variant="outline" className="w-full text-[#E7000B] border-[#E7000B] hover:bg-white cursor-pointer">View Dog Profile</Button>
    </div>
  </div>
);