
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useUpdateProfileMutation } from "@/redux/features/owner-profile/ownner-profile.api";
import { Camera, Upload } from "lucide-react";
import ownerCoverImg from "@/assets/ownerProfile/cover.jpg";
import profilePic from "@/assets/ownerDetails/profile.jpg";
import { toast } from "react-toastify";

export function OwnerProfileSection() {
  const { data: userData, isLoading } = useGetMeQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  // Local state for image previews and files
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>("");
  const [coverPreview, setCoverPreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') {
          setProfileFile(file);
          setProfilePreview(reader.result as string);
        } else {
          setCoverFile(file);
          setCoverPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData();

    // Text fields add kora
    formData.append("fullName", (form.elements.namedItem("fullName") as HTMLInputElement).value);
    formData.append("phoneNumber", (form.elements.namedItem("phone") as HTMLInputElement).value);
    formData.append("city", (form.elements.namedItem("city") as HTMLInputElement).value);
    formData.append("state", (form.elements.namedItem("state") as HTMLInputElement).value);
    formData.append("zipCode", (form.elements.namedItem("zipCode") as HTMLInputElement).value);
    formData.append("country", (form.elements.namedItem("country") as HTMLInputElement).value);
    formData.append("about", (form.elements.namedItem("about") as HTMLTextAreaElement).value);

    // Files add kora (Jodi user select kore thake)
    if (profileFile) formData.append("profileImage", profileFile);
    if (coverFile) formData.append("coverImage", coverFile);

    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed!");
    }
  };

  if (isLoading) return <div className="p-6 text-center">Loading Profile...</div>;

  return (
    <form
      onSubmit={handleSaveProfile}
      className="mx-auto p-6 bg-white rounded-xl shadow-sm border"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold">Owner Profile</h2>
        <p className="text-sm text-muted-foreground">
          Update your profile information and avatar
        </p>
      </div>

      {/* Cover Photo */}
      <div className="relative h-48 w-full rounded-xl mb-12 bg-gray-100">
        <img
          src={
            coverPreview ||
            (userData as any)?.data?.coverImage?.url ||
            ownerCoverImg
          }
          alt="Cover"
          className="w-full h-full object-cover rounded-xl"
        />
        <input
          type="file"
          id="coverUpload"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "cover")}
        />
        <Button
          type="button"
          onClick={() => document.getElementById("coverUpload")?.click()}
          variant="secondary"
          className="absolute top-4 right-4 bg-[#D4AF37] hover:bg-[#b8962f] text-white border-none cursor-pointer"
        >
          <Upload className="w-4 h-4 mr-2" />
          Update Cover Photo
        </Button>

        {/* Avatar */}
        <div className="absolute -bottom-10 z-10 left-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
              <img
                src={
                  profilePreview ||
                  (userData as any)?.data?.profileImage?.url ||
                  profilePic
                }
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              id="profileUpload"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "profile")}
            />
            <button
              type="button"
              onClick={() => document.getElementById("profileUpload")?.click()}
              className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white border-2 border-white cursor-pointer"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 mt-16">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            defaultValue={userData?.data?.fullName || ""}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={userData?.data?.email || ""}
              disabled
              className="bg-gray-50 cursor-not-allowed"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              defaultValue={userData?.data?.phoneNumber || ""}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              defaultValue={userData?.data?.city || ""}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">State / Province</Label>
            <Input
              id="state"
              name="state"
              defaultValue={userData?.data?.state || ""}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              defaultValue={userData?.data?.zipCode || ""}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              defaultValue={userData?.data?.country || ""}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="about">About</Label>
          <Textarea
            id="about"
            name="about"
            className="min-h-[100px]"
            defaultValue={(userData as any)?.data?.about || ""}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isUpdating}
            className="bg-[#D4AF37] cursor-pointer hover:bg-[#b8962f] text-black font-medium px-8"
          >
            {isUpdating ? "Saving..." : "Save Profile Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}