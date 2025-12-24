import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface DogCardProps {
  name: string;
  breed: string;
  pcrId: string;
  owner: string;
  location: string;
  tier: "Gold" | "Blue";
  image: string;
  onEdit: () => void;
}

const DashboardDRCard: React.FC<DogCardProps> = ({ 
  name, breed, pcrId, owner, location, tier, image, onEdit 
}) => {
  const isGold = tier === "Gold";

  return (
    <Card className="border-none !py-0 shadow-sm rounded-xl overflow-hidden">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12 rounded-full border border-slate-100">
              <AvatarImage src={image} className="object-cover" />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{name}</h3>
              <p className="text-md text-slate-500">{breed}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
            isGold ? 'bg-orange-100 text-[#973C00]' : 'bg-blue-100 text-[#193CB8]'
          }`}>
            {tier}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">PCR ID:</span>
            <span className="text-slate-700 font-medium">{pcrId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Owner:</span>
            <span className="text-slate-700 font-medium">{owner}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Location:</span>
            <span className="text-slate-700 font-medium">{location}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="ghost" className="bg-blue-50 text-[#155DFC] hover:bg-blue-100 cursor-pointer rounded-md font-bold">
            View
          </Button>
          <Button 
            variant="ghost" 
            onClick={onEdit}
            className="bg-slate-100 text-slate-500 hover:bg-slate-100 rounded-md cursor-pointer font-bold"
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardDRCard;