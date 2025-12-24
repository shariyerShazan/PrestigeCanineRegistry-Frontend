import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FiSearch, FiDownload } from "react-icons/fi";
import DashboardDRCard from './_components/DashboardDRCard';
import EditDogRegistryDialog from './_components/EditDogRegistryDialog';
import dog1 from "@/assets/home/allblueDog/dog1.jpg"
import dog2 from "@/assets/home/allblueDog/dog2.jpg"
import dog3 from "@/assets/home/allblueDog/dog3.jpg"

const DogRegistryPage = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState<any>(null);

  const dogs = [
    { name: "Bella Daisy", breed: "Golden Retriever", pcrId: "PCR-GR-2024-001234", owner: "Sarah Johnson", location: "San Diego, CA", tier: "Gold", image: dog1 },
    { name: "Max Thunder", breed: "German Shepherd", pcrId: "PCR-GS-2024-002345", owner: "Michael Chen", location: "Austin, TX", tier: "Gold", image: dog2},
    { name: "Charlie", breed: "French Bulldog", pcrId: "PCR-FB-2024-003456", owner: "Emma Davis", location: "Brooklyn, NY", tier: "Blue", image: dog3 },
  ];

  const handleEditClick = (dog: any) => {
    setSelectedDog(dog);
    setIsEditOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input className="pl-10 w-64 h-10 border-slate-200 focus-visible:ring-[#2B4C8A]/20" placeholder="Search user" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-32 h-10 border-slate-200 cursor-pointer">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="border-[#2B4C8A] text-[#2B4C8A] gap-2 h-10 font-medium cursor-pointer">
          <FiDownload /> Export
        </Button>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dogs.map((dog, idx) => (
          <DashboardDRCard
            key={idx} 
            {...dog as any} 
            onEdit={() => handleEditClick(dog)} 
          />
        ))}
      </div>

      {/* Modal */}
      <EditDogRegistryDialog
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        dogData={selectedDog}
      />
    </div>
  );
};

export default DogRegistryPage;