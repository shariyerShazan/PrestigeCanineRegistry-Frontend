import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { X } from "lucide-react";

interface EditProps {
  isOpen: boolean;
  onClose: () => void;
  dogData: any;
}

const EditDogRegistryDialog: React.FC<EditProps> = ({ isOpen, onClose, dogData }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 border-none rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <DialogTitle className="text-xl font-bold">Edit Dog Registry</DialogTitle>
          {/* <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="size-5" />
          </button> */}
        </div>

        <div className="px-5 py-2 grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-2">
            <Label className="font-bold">Dog Name</Label>
            <Input defaultValue={dogData?.name} className="h-12 border-slate-200 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold">Breed</Label>
            <Input defaultValue={dogData?.breed} className="h-12 border-slate-200 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold">PCR ID</Label>
            <Input defaultValue={dogData?.pcrId} className="h-12 border-slate-200 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold">Assign Tier</Label>
            <Select defaultValue={dogData?.tier}>
              <SelectTrigger className="!h-12 border-slate-200 rounded-xl w-full">
                <SelectValue placeholder="Select Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Blue">Blue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 space-y-2">
            <Label className="font-bold">Owner Name</Label>
            <Input defaultValue={dogData?.owner} className="h-12 border-slate-200 rounded-xl" />
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t flex flex-row justify-between sm:justify-between bg-white">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-32 h-10 border-[#2B4C8A] text-[#2B4C8A] font-bold rounded-md cursor-pointer"
          >
            Back
          </Button>
          <Button className="w-32 h-10 bg-[#D4A035] hover:bg-[#b88a2e] text-white font-bold rounded-md cursor-pointer">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDogRegistryDialog;