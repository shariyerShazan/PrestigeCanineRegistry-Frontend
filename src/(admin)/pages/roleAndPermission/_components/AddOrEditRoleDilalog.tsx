import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { Role } from './RPtypes';
import { Checkbox } from '@/components/ui/checkbox';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Role | null;
}

const AddNewRoleDialog: React.FC<Props> = ({ isOpen, onClose, initialData }) => {
  const [formData, setFormData] = useState<Partial<Role>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({});
    }
  }, [initialData, isOpen]);

  const permissionList = ["View", "Create", "Edit", "Approve", "Export", "Delete"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none rounded-2xl">
        {/* Custom Header to match Figma Close Icon style */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-slate-900">
            {initialData ? "Edit Role" : "Create New Role"}
          </h2>
          {/* <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="size-5" />
          </button> */}
        </div>

        <div className="px-6 py-2 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Form Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Name</Label>
              <Input 
                className="h-12 border-slate-200"
                value={formData.name || ""} 
                placeholder="e.g. John Doe"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2 w-full">
              <Label className="font-bold text-slate-700">Assign Role</Label>
              <Select defaultValue="Admin" >
                <SelectTrigger className="!h-12 border-slate-200 w-full cursor-pointer">
                  <SelectValue placeholder="Admin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Reviewer">Reviewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Username:</Label>
              <Input 
                className="h-12 border-slate-200"
                value={formData.email || ""} 
                placeholder="johndoe@gmail.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700">password:</Label>
              <Input 
                type="password"
                className="h-12 border-slate-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Permissions Section */}
          <div className="space-y-4">
            <Label className="text-lg font-bold text-slate-700">Permissions</Label>
            <Select defaultValue="user-management">
              <SelectTrigger className="!h-12 border-slate-200 w-full cursor-pointer">
                <SelectValue placeholder="User management" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user-management">User management</SelectItem>
                <SelectItem value="dog-management">Dog management</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-3 gap-y-4 pt-2 w-full sm:w-[60%]">
              {permissionList.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox id={permission} className="border-slate-300 data-[state=checked]:bg-[#2B4C8A]" />
                  <label htmlFor={permission} className="text-sm font-medium text-slate-600 cursor-pointer">
                    {permission}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="text-[#155DFC] border-none bg-blue-50 cursor-pointer hover:bg-blue-100 h-10 gap-2">
                <Plus className="size-4" /> Add More Permission
              </Button>
              <Button variant="outline" className="text-[#E7000B] border border-[#E7000B] cursor-pointer hover:bg-red-50 h-10 gap-2">
                <Trash2 className="size-4" /> Remove Permission
              </Button>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <Label className="text-lg font-bold text-slate-700">Description</Label>
            <Textarea 
              placeholder="Describe what this role can do" 
              className="min-h-[100px] border-slate-200 resize-none"
            />
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t flex flex-row justify-between sm:justify-between items-center bg-white">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-32 h-10 border-[#2B4C8A] text-[#2B4C8A] hover:bg-blue-50 font-bold rounded-md cursor-pointer"
          >
            Back
          </Button>
          <Button 
            className="w-32 h-10 bg-[#D4AF37] hover:bg-[#b88a2e] text-white font-bold rounded-md cursor-pointer"
          >
            Save Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewRoleDialog;