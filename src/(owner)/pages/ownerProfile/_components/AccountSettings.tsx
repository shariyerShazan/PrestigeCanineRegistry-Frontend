import { Lock, Bell, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import {
  useChangePasswordMutation,
  useUpdateSettingsMutation,
} from "@/redux/features/owner-profile/ownner-profile.api";
import { toast } from "react-toastify";

export function OwnerAccountSettings() {
  const { data: userData } = useGetMeQuery();
  const [updateSettings] = useUpdateSettingsMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggle = async (key: string, value: boolean) => {
    try {
      await updateSettings({ [key]: value }).unwrap();
      toast.success("Settings updated!");
    } catch (err) {
      toast.error("Failed to update settings");
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      // DTO structure: { oldPassword, newPassword }
      await changePassword({ oldPassword, newPassword }).unwrap();
      toast.success("Password changed successfully!");
      e.currentTarget.reset();
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="mx-auto space-y-6">
      <form
        onSubmit={handlePasswordUpdate}
        className="bg-white p-6 rounded-xl border shadow-sm"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-red-50 rounded-lg">
            <Lock className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Password Management</h2>
            <p className="text-sm text-muted-foreground">
              Update passwords for account security
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {/* Old Password */}
          <div className="grid gap-2 relative">
            <Label htmlFor="oldPassword">Current Password</Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type={showOldPassword ? "text" : "password"}
              placeholder="Current password"
              required
            />
            <button
              type="button"
              onClick={() => setShowOldPassword((s) => !s)}
              className="absolute cursor-pointer right-3 top-8 text-muted-foreground"
            >
              {showOldPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* New Password */}
          <div className="grid gap-2 relative">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="New password"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((s) => !s)}
              className="absolute cursor-pointer right-3 top-8 text-muted-foreground"
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="grid gap-2 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="absolute cursor-pointer right-3 top-8 text-muted-foreground"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-lg mb-6">
          <p className="text-sm font-bold text-orange-800 mb-2 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-orange-800 flex items-center justify-center text-[10px]">
              !
            </span>
            Password Requirements:
          </p>
          <ul className="text-xs text-orange-700 space-y-1 ml-6 list-disc">
            <li>At least 6 characters long</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isChangingPassword}
            className="bg-[#D4AF37] cursor-pointer hover:bg-[#b8962f] text-black font-medium"
          >
            <Lock className="w-4 h-4 mr-2" />
            {isChangingPassword ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>

      {/* Notification Settings */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-2 bg-green-50 rounded-lg">
            <Bell className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Notification Settings</h2>
            <p className="text-sm text-muted-foreground">
              Manage your notification preferences
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border p-3 rounded-md border-gray-300">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={(userData as any)?.data?.emailNotifications}
              onCheckedChange={(checked) =>
                handleToggle("emailNotifications", checked)
              }
              className="data-[state=checked]:bg-[#D4AF37]"
            />
          </div>

          <div className="flex items-center justify-between border p-3 rounded-md border-gray-300">
            <div className="space-y-0.5">
              <Label className="text-base">Show Owner ID</Label>
              <p className="text-sm text-muted-foreground">
                Allow platform to show your owner id for public?
              </p>
            </div>
            <Switch
              checked={(userData as any)?.data?.showOwnerId}
              onCheckedChange={(checked) =>
                handleToggle("showOwnerId", checked)
              }
              className="data-[state=checked]:bg-[#D4AF37]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
