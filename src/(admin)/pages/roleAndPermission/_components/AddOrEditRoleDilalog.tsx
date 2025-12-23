import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Role } from './RPtypes';


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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-[#2B4C8A]">
            {initialData ? "Edit Role" : "Add New Role"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>User Name</Label>
            <Input 
              value={formData.name || ""} 
              placeholder="e.g. Michael Chen"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Role Type</Label>
            <Input 
              value={formData.roleType || ""} 
              placeholder="e.g. Admin"
              onChange={(e) => setFormData({...formData, roleType: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input 
              type="email" 
              value={formData.email || ""} 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <DialogFooter>
          <Button className='cursor-pointer' variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-[#E17100] hover:bg-[#c96500] cursor-pointer">
            {initialData ? "Update Role" : "Save Role"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewRoleDialog;