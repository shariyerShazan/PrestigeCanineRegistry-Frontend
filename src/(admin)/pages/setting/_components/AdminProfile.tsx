import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, User } from "lucide-react";

const AdminProfile: React.FC = () => {
  return (
    <Card className=" border-none shadow-sm rounded-md mb-6  overflow-hidden bg-white">
      <CardContent className="p-8 space-y-8">

        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-[#155DFC]">
            <User className="size-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Admin Profile</h2>
            <p className="text-sm text-slate-500 font-medium">
              Update your profile information and avatar
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 pt-4">
          <div className="relative">
            <Avatar className="h-28 w-28 border-3 border-slate-2    00 shadow-sm">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250" className='object-cover' />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-9 cursor-pointer right-1 p-2 bg-[#2B4C8A] rounded-full text-white border-4 border-white shadow-lg hover:scale-105 transition-transform">
              <Camera className="size-4" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-slate-800">Full Name</Label>
              <Input 
                className="h-10 border-slate-200 rounded-md bg-white text-slate-600 focus-visible:ring-blue-100" 
                placeholder="e.g. John Doe" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-slate-800">Email</Label>
              <Input 
                className="h-10 border-slate-200 rounded-md bg-white text-slate-600 focus-visible:ring-blue-100" 
                placeholder="johndoe@gmail.com" 
                type="email"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-4">
          <Button 
            className="h-10 cursor-pointer px-8 bg-[#D4A035] hover:bg-[#b88a2e] text-[#1a1a1a] font-bold rounded-xl shadow-sm transition-all"
          >
            Save Profile Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProfile;