import { Lock, Bell, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function OwnerAccountSettings() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className=" mx-auto space-y-6 ">
      
      {/* Password Management */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-red-50 rounded-lg">
            <Lock className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Password Management</h2>
            <p className="text-sm text-muted-foreground">Update passwords for admin and other roles</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="grid gap-2 relative">
            <Label>New Password</Label>
            <Input type={showNewPassword ? 'text' : 'password'} placeholder="Enter new password" />
            <button
              type="button"
              aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
              onClick={() => setShowNewPassword((s) => !s)}
              className="absolute right-3 top-8 text-muted-foreground cursor-pointer"
            >
              {!showNewPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
          <div className="grid gap-2 relative">
            <Label>Confirm Password</Label>
            <Input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm new password" />
            <button
              type="button"
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="absolute right-3 top-8 text-muted-foreground cursor-pointer"
            >
              {!showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-lg mb-6">
          <p className="text-sm font-bold text-orange-800 mb-2 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-orange-800 flex items-center justify-center text-[10px]">!</span>
            Password Requirements:
          </p>
          <ul className="text-xs text-orange-700 space-y-1 ml-6 list-disc">
            <li>At least 8 characters long</li>
            <li>Include uppercase and lowercase letters</li>
            <li>Include at least one number</li>
            <li>Include at least one special character</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <Button className="bg-[#D4AF37] hover:bg-[#b8962f] text-black font-medium cursor-pointer">
            <Lock className="w-4 h-4 mr-2" /> Update Password
          </Button>
        </div>
      </div>

      {/* Notification Settings */}
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
            <Switch className="data-[state=checked]:bg-[#D4AF37]" defaultChecked />
          </div>

          <div className="flex items-center justify-between border p-3 rounded-md border-gray-300">
            <div className="space-y-0.5">
              <Label className="text-base">Show Owner ID</Label>
              <p className="text-sm text-muted-foreground">Allow platform to show your owner id for public?</p>
            </div>
            <Switch className="data-[state=checked]:bg-[#D4AF37]" />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button className="bg-[#D4AF37] hover:bg-[#b8962f] text-black font-medium px-8 cursor-pointer">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}