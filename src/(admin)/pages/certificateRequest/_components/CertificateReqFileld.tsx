import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const CertificateReqField = () => {
  // formData state definition
  const [formData, setFormData] = useState({
    pcrId: "PCR-G25-004-001",
    microchipId: "2654 65145",
    canineName: "Max Thunder",
    breed: "german-shepard",
    sex: "Male",
    dob: "2025 JAN 16",
    colorMarking: "Golden/Black",
    ties: "golden",
    ownerName: "Micheal Chan",
    kennelName: "PAWHALLA KENNELS LLC",
  });

  // Helper function to update state
  const updateFormData = (newData : any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const labelStyle = "text-[14px] font-bold text-[#1C1C1C] mb-2 block";
  const inputStyle = "h-12 rounded-xl border-[#D1D5DB] focus:ring-1 focus:ring-gray-400";

  return (
    <div className="w-full mx-auto p-8 bg-white border border-gray-100 rounded-[14px] shadow-sm">

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-5">
        <h2 className="text-[22px] font-bold text-[#1C1C1C]">Update Information</h2>
        
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        
        {/* PCR ID */}
        <div>
          <Label className={labelStyle}>PCR ID:</Label>
          <Input 
            className={inputStyle} 
            value={formData.pcrId} 
            onChange={(e) => updateFormData({ pcrId: e.target.value })} 
          />
        </div>

        {/* Microchip ID */}
        <div>
          <Label className={labelStyle}>Microchip ID:</Label>
          <Input 
            className={inputStyle} 
            value={formData.microchipId} 
            onChange={(e) => updateFormData({ microchipId: e.target.value })} 
          />
        </div>

        {/* Canine's Name */}
        <div>
          <Label className={labelStyle}>Canine's Name:</Label>
          <Input 
            className={inputStyle} 
            value={formData.canineName} 
            onChange={(e) => updateFormData({ canineName: e.target.value })} 
          />
        </div>

        {/* Breed */}
        <div>
          <Label className={labelStyle}>Breed:</Label>
          <Select 
            value={formData.breed} 
            onValueChange={(val) => updateFormData({ breed: val })}
          >
            <SelectTrigger className={`${inputStyle} w-full rounded-xl !h-11`}>
              <SelectValue placeholder="Select Breed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="german-shepard">German Shepard</SelectItem>
              <SelectItem value="american-bully">American Bully</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sex Selection */}
        <div>
          <Label className={labelStyle}>Sex:</Label>
          <div className="flex gap-4">
             <button
                  type="button"
                  onClick={() => updateFormData({ sex: "Male" })}
                  className={`flex-1 px-4 py-2 rounded-xl h-12 font-medium transition-colors cursor-pointer ${
                    formData.sex === "Male" 
                    ? "bg-[#C69C31] text-white" 
                    : "border-gray-300 border text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => updateFormData({ sex: "Female" })}
                  className={`flex-1 px-4 py-2 rounded-xl h-12 font-medium transition-colors cursor-pointer ${
                    formData.sex === "Female"
                    ? "bg-[#C69C31] text-white"
                    : "border-gray-300 border text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Female
                </button>
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <Label className={labelStyle}>Date of Birth:</Label>
          <div className="relative">
            <Input 
                className={inputStyle} 
                value={formData.dob} 
                onChange={(e) => updateFormData({ dob: e.target.value })} 
            />
            <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Color/Marking */}
        <div>
          <Label className={labelStyle}>Color/Marking:</Label>
          <Input 
            className={inputStyle} 
            value={formData.colorMarking} 
            onChange={(e) => updateFormData({ colorMarking: e.target.value })} 
          />
        </div>

        {/* Ties */}
        <div>
          <Label className={labelStyle}>Ties:</Label>
          <Select 
            value={formData.ties} 
            onValueChange={(val) => updateFormData({ ties: val })}
          >
            <SelectTrigger className={`${inputStyle} w-full rounded-xl !h-11`}>
              <SelectValue placeholder="Select Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="golden">Golden</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Owner Name */}
        <div>
          <Label className={labelStyle}>Owner Name:</Label>
          <Input 
            className={inputStyle} 
            value={formData.ownerName} 
            onChange={(e) => updateFormData({ ownerName: e.target.value })} 
          />
        </div>

        {/* Kennel/House Name */}
        <div>
          <Label className={labelStyle}>Kennel/House Name:</Label>
          <Input 
            className={inputStyle} 
            value={formData.kennelName} 
            onChange={(e) => updateFormData({ kennelName: e.target.value })} 
          />
        </div>
      </div>
      <Button className="bg-[#C69C31] text-white hover:bg-[#e3b030] mt-6 cursor-pointer ">
         Save Changes
      </Button>
    </div>
  );
};

export default CertificateReqField;