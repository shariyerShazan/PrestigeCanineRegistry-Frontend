/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  Mail,
  Lock,
  ShieldCheck,
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPasswordMutation, useResetPasswordMutation } from "@/redux/features/auth/authApi";


const ForgotPasswordFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [forgotPassword, { isLoading: isForgotLoading }] =
    useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetLoading }] =
    useResetPasswordMutation();

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message || "OTP sent to your email");
      setStep(2); 
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const handleResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const otp = formData.get("otp") as string;
    const password = formData.get("password") as string;

    try {
      const res = await resetPassword({ email, otp, password }).unwrap();
      console.log(res.message)
      toast.success(res.message || "Password reset successful!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message[0] || "Reset failed. Check your OTP.");
    }
  };

  return (
    <div className="min-h-screen bg-[#2B4C8A] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-[450px] relative overflow-hidden">
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#D4AF37]"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-[#f0f4f8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-8 h-8 text-[#2B4C8A]" />
          </div>
          <h2 className="text-2xl font-bold text-[#2B4C8A]">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {step === 1
              ? "Enter your email and we'll send you a 6-digit reset code."
              : `Enter the code sent to ${email} and your new password.`}
          </p>
        </div>

        {/* STEP 1: Request OTP */}
        {step === 1 && (
          <form onSubmit={handleForgotSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 focus:!ring-[#D4AF37] border-gray-200"
                  placeholder="Enter your registered email"
                  required
                />
              </div>
            </div>
            <Button
              disabled={isForgotLoading}
              className="w-full h-12 cursor-pointer bg-[#2B4C8A] hover:bg-[#1e3561] text-white font-bold rounded-lg transition-all"
            >
              {isForgotLoading ? "Sending Code..." : "Send Reset Code"}
            </Button>
          </form>
        )}

        {/* STEP 2: Verify & Reset */}
        {step === 2 && (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">
                6-Digit OTP Code
              </Label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  name="otp"
                  maxLength={6}
                  className="pl-10 h-12 tracking-[8px] text-center font-bold focus:!ring-[#D4AF37] border-gray-200"
                  placeholder="000000"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  name="password"
                  type={showPass ? "text" : "password"}
                  className="pl-10 h-12 focus:!ring-[#D4AF37] border-gray-200"
                  placeholder="Create new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2B4C8A]"
                >
                  {showPass ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              disabled={isResetLoading}
              className="w-full cursor-pointer h-12 bg-[#D4AF37] hover:bg-[#C39138] text-white font-bold rounded-lg shadow-lg mt-4"
            >
              {isResetLoading ? "Resetting..." : "Update Password"}
            </Button>
          </form>
        )}

        {/* Navigation Link */}
        <button
          onClick={() => (step === 2 ? setStep(1) : navigate("/login"))}
          className="flex cursor-pointer items-center justify-center gap-2 w-full mt-8 text-sm text-[#2B4C8A] font-semibold hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordFlow;
