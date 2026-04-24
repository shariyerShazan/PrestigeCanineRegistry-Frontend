/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  User,
  Phone,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

export const RegisterFields = ({ onSubmit, isLoading }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    // Backend RegisterUserDto expects fullName, email, password, etc.
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-1 block">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            name="fullName"
            placeholder="Enter your full name"
            className="pl-10 h-11 focus:!ring-[#D4AF37]"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Ownership Transfer Code (Internal Logic) */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1 block text-xs">
            OTTC Code (Optional)
          </Label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              name="ottcCode"
              placeholder="OTTC Code"
              className="pl-10 h-11 focus:!ring-[#D4AF37]"
            />
          </div>
        </div>
        {/* Phone */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1 block">
            Phone (Optional)
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              name="phoneNumber"
              placeholder="Enter number"
              className="pl-10 h-11 focus:!ring-[#D4AF37]"
            />
          </div>
        </div>
      </div>

      <p className="text-[10px] text-[#D4AF37] font-medium">
        Note: OTTC code should be valid and initiated by a registered PCR user
        to get ownership of canine.
      </p>

      {/* Email */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-1 block">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10 h-11 focus:!ring-[#D4AF37]"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-1 block">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pl-10 pr-10 h-11 focus:!ring-[#D4AF37]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        disabled={isLoading}
        type="submit"
        className="w-full cursor-pointer h-12 bg-[#D4AF37] hover:bg-[#C39138] text-white font-semibold rounded-lg mt-2"
      >
        {isLoading ? "Creating Account..." : "Register Now"}
        {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
      </Button>
    </form>
  );
};
