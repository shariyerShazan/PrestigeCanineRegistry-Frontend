
import { Lock, Bell, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGetMeQuery } from '@/redux/features/auth/authApi';
import { useChangePasswordMutation, useUpdateSettingsMutation } from '@/redux/features/owner-profile/ownner-profile.api';
import { toast } from 'react-toastify';

const PasswordAndNotification = () => {
  const { data: response } = useGetMeQuery();
  const userData = response?.data;

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [updateSettings] = useUpdateSettingsMutation();

  // 1. Password Update Logic
  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) return toast.error("Passwords mismatch!");

    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      toast.success("Password changed successfully!");
      e.currentTarget.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update password");
    }
  };

  // 2. Toggle Notification Settings
  const handleToggle = async (key: string, value: boolean) => {
    try {
      await updateSettings({ [key]: value }).unwrap();
      toast.success("Notification settings updated!");
    } catch (err) {
      toast.error("Failed to update settings");
    }
  };

  return (
    <div className="mx-auto space-y-6">
      {/* Password Management Form */}
      <form onSubmit={handlePasswordUpdate} className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-red-50 rounded-lg">
            <Lock className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Change Password</h2>
            <p className="text-sm text-muted-foreground">Keep your account secure by updating password</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="grid gap-2 relative">
            <Label>Old Password</Label>
            <Input name="oldPassword" type={showOldPassword ? "text" : "password"} required />
            <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-3 top-8 cursor-pointer">
              {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid gap-2 relative">
            <Label>New Password</Label>
            <Input name="newPassword" type={showNewPassword ? "text" : "password"} required />
            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-8 cursor-pointer">
              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid gap-2 relative">
            <Label>Confirm Password</Label>
            <Input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} required />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-8 cursor-pointer">
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-lg mb-6">
          <p className="text-sm font-bold text-orange-800 mb-2 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-orange-800 flex items-center justify-center text-[10px]">!</span>
            Requirements: At least 6 characters long.
          </p>
        </div>

        <div className="flex justify-end">
          <Button disabled={isChangingPassword} className="bg-[#D4AF37] hover:bg-[#b8962f] text-black font-medium cursor-pointer">
            <Lock className="w-4 h-4 mr-2" /> {isChangingPassword ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>

      {/* Notification Settings Section */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-2 bg-green-50 rounded-lg">
            <Bell className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Notification Settings</h2>
            <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border p-3 rounded-md border-gray-300">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch 
              checked={(userData as any)?.emailNotifications || false} 
              onCheckedChange={(checked) => handleToggle("emailNotifications", checked)}
              className="data-[state=checked]:bg-[#D4AF37]" 
            />
          </div>

          {/* <div className="flex items-center justify-between border p-3 rounded-md border-gray-300">
            <div className="space-y-0.5">
              <Label className="text-base">System Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified about critical system updates</p>
            </div>
            <Switch 
              defaultChecked 
              className="data-[state=checked]:bg-[#D4AF37]" 
            />
          </div> */}
        </div>

        {/* <div className="flex justify-end mt-8">
          <Button className="bg-[#D4AF37] hover:bg-[#b8962f] text-black font-medium px-8 cursor-pointer">
            Save Settings
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default PasswordAndNotification;