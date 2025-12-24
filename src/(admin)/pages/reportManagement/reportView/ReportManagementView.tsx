
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportStatusSection } from "./_components/ReportStatusSection";
import ReporterInfoSection from "./_components/ReporterInfoSection";
import ReportContentSection from "./_components/ReportContentSection";
import { ActionRequiredAlert } from "./_components/ActionRequiredAlert";
import { ReportedDogCard } from "./_components/ReportedDogCard";
import DogOwnerCard from "./_components/DogOwnerCard";
import { LuCheckCheck } from "react-icons/lu";
import { GrFlag } from "react-icons/gr";


const ReportManagementView = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm border cursor-pointer">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center justify-center gap-4">
            <div className="p-2 bg-[#FEF2F2] text-[#E7000B] rounded-md ">
                <GrFlag size={25}/>
             </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Report Details</h1>
                <p className="text-sm text-gray-500 font-medium uppercase">Report ID: <span className="text-gray-900">REP-001</span></p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#00A63E] hover:bg-[#008a34] text-white flex gap-2 cursor-pointer" >
            <LuCheckCheck size={18} /> Mark as Resolved
          </Button>
          <Button className="bg-[#E7000B] hover:bg-[#C10007] text-white flex gap-2 cursor-pointer">
            <Trash2 size={18} /> Delete Report
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <ReportStatusSection />
          <ReporterInfoSection />
          <ReportContentSection />
          <ActionRequiredAlert />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ReportedDogCard />
          <DogOwnerCard />
        </div>
      </div>
    </div>
  );
};

export default ReportManagementView;