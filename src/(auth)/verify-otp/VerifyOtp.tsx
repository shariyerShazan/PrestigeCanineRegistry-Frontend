/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { ShieldCheck, ArrowLeft, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/authApi";


const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return toast.warning("Please enter a 6-digit code");

    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      toast.success(res.message || "Account verified successfully!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid or expired OTP");
    }
  };

  const handleResend = async () => {
    try {
      const res = await resendOtp({ email }).unwrap();
      toast.success(res.message || "New OTP sent to your email");
      setTimer(60);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to resend OTP");
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-[#2B4C8A] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl text-center">
          <p className="text-red-500 mb-4">
            No email found. Please register again.
          </p>
          <Button onClick={() => navigate("/login")}>Go to Register</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2B4C8A] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-[450px]">
        {/* Branding & Header */}
        <div className="text-center mb-8">
          <div className="bg-[#f8f9fa] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#D4AF37]">
            <ShieldCheck className="w-8 h-8 text-[#2B4C8A]" />
          </div>
          <h2 className="text-2xl font-bold text-[#2B4C8A]">
            Verify Your Email
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            We've sent a 6-digit code to <br />
            <span className="font-semibold text-gray-700">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">
              Enter Verification Code
            </Label>
            <Input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} // শুধু নাম্বার নিবে
              className="h-14 text-center text-2xl font-bold tracking-[12px] focus:!ring-[#D4AF37] border-2"
              placeholder="000000"
              required
            />
          </div>

          <Button
            disabled={isVerifying}
            type="submit"
            className="w-full cursor-pointer h-12 bg-[#2B4C8A] hover:bg-[#1e3561] text-white font-bold rounded-lg shadow-lg"
          >
            {isVerifying ? "Verifying..." : "Verify Account"}
          </Button>
        </form>

        {/* Resend OTP Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">Didn't receive the code?</p>
          <button
            disabled={timer > 0 || isResending}
            onClick={handleResend}
            className={`flex cursor-pointer items-center justify-center gap-2 mx-auto font-semibold transition-colors
              ${timer > 0 ? "text-gray-400 cursor-not-allowed" : "text-[#D4AF37] hover:text-[#C39138] cursor-pointer"}`}
          >
            <RotateCw
              className={`w-4 h-4 ${isResending ? "animate-spin" : ""}`}
            />
            {timer > 0 ? `Resend Code in ${timer}s` : "Resend OTP Now"}
          </button>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center justify-center gap-2 w-full mt-8 text-sm text-gray-400 hover:text-[#2B4C8A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
