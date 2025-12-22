
import { Camera, Upload } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ownerCoverImg from "@/assets/ownerProfile/cover.jpg"
import profilePic from "@/assets/ownerDetails/profile.jpg"

export function OwnerProfileSection() {
  return (
    <div className=" mx-auto p-6 bg-white rounded-xl shadow-sm border">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Owner Profile</h2>
        <p className="text-sm text-muted-foreground">Update your profile information and avatar</p>
      </div>

      {/* Cover Photo */}
      <div className="relative h-48 w-full rounded-xl  mb-12 bg-gray-100">
        <img 
          src={ownerCoverImg} 
          alt="Cover" 
          className="w-full h-full object-cover -z-10"
        />
        <Button 
          variant="secondary" 
          className="absolute top-4 right-4 bg-[#D4AF37] hover:bg-[#b8962f] text-white border-none cursor-pointer"
        >
          <Upload className="w-4 h-4 mr-2" />
          Update Cover Photo
        </Button>
        
        {/* Avatar */}
        <div className="absolute -bottom-10 z-50 left-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
              <img src={profilePic} alt="Avatar" />
            </div>
            <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white border-2 border-white">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 mt-16">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" defaultValue="Saeah Johnson" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="sarah.johnson@gmail.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" defaultValue="+123 456789" />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" defaultValue="San Diego, CA" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="about">About</Label>
          <Textarea 
            id="about" 
            className="min-h-[100px]"
            defaultValue="At the forefront of the UAE's construction evolution..." 
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button className="bg-[#D4AF37] hover:bg-[#b8962f] text-black font-medium px-8">
            Save Profile Changes
          </Button>
        </div>
      </div>
    </div>
  );
}