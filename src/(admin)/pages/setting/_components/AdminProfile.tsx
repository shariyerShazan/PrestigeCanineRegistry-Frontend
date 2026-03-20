
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, User } from "lucide-react";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useUpdateProfileMutation } from "@/redux/features/owner-profile/ownner-profile.api";
import { toast } from "react-toastify";

const AdminProfile: React.FC = () => {
  const { data: response } = useGetMeQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const userData = response?.data;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (file) formData.append("profileImage", file);

    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <Card className="border-none shadow-sm rounded-md mb-6 overflow-hidden bg-white">
      <CardContent className="p-8 space-y-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-[#155DFC]">
            <User className="size-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Admin Profile</h2>
            <p className="text-sm text-slate-500 font-medium">Update your profile information and avatar</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="flex flex-col md:flex-row gap-12 pt-4">
          <div className="relative">
            <Avatar className="h-28 w-28 border-3 border-slate-200 shadow-sm">
              <AvatarImage src={preview || (userData as any)?.profileImage?.url} className='object-cover' />
              <AvatarFallback>{userData?.fullName?.slice(0, 2).toUpperCase() || 'AD'}</AvatarFallback>
            </Avatar>
            <input type="file" id="adminImg" className="hidden" accept="image/*" onChange={handleImageChange} />
            <button 
              type="button"
              onClick={() => document.getElementById('adminImg')?.click()}
              className="absolute -top-1 right-1 p-2 bg-[#2B4C8A] rounded-full text-white border-4 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform"
            >
              <Camera className="size-4" />
            </button>
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-slate-800">Full Name</Label>
              <Input 
                name="fullName"
                defaultValue={userData?.fullName || ""}
                className="h-10 border-slate-200 rounded-md bg-white text-slate-600" 
                placeholder="e.g. John Doe" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-slate-800">Email</Label>
              <Input 
                value={userData?.email || ""} 
                disabled
                className="h-10 border-slate-200 rounded-md bg-gray-50 text-slate-400 cursor-not-allowed" 
                type="email"
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <Button 
                disabled={isUpdating}
                className="h-10 cursor-pointer px-8 bg-[#D4A035] hover:bg-[#b88a2e] text-[#1a1a1a] font-bold rounded-xl shadow-sm transition-all"
              >
                {isUpdating ? "Saving..." : "Save Profile Changes"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminProfile