/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, UserPlus } from "lucide-react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { toast } from "react-toastify";

import logo from "@/assets/login/logo.png";
import { LoginFields } from "./LoginFields";
import { RegisterFields } from "./RegisterFields";
import { useLoginMutation, useRegisterMutation } from "@/redux/features/auth/authApi";


const LoginForm = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"owner" | "admin" | "register">("owner");

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  // Handle Login (Admin & Owner)
const handleLoginSubmit = async (data: any) => {
  try {
    const res = await login(data).unwrap();

    // 1. Show success message
    toast.success(res.message || "Login successful");

    const user = res.user;
    const userRole = user?.roleType;
    const hasMembership = !!user?.membershipId; // Boolean check for membership

    // 2. logic: Role-based Navigation with Membership Check
    if (userRole === "ADMIN" || userRole === "SUPER_ADMIN") {
      navigate("/admin/dashboard");
    } else if (userRole === "OWNER") {
      // Check if Owner has a membership plan
      if (hasMembership) {
        navigate("/owner/dashboard");
      } else {
        toast.info("Please choose a membership plan to activate your account.");
        navigate("/become-member");
      }
    } else if (userRole === "USER") {
      // Logic for regular users
      if (hasMembership) {
        navigate("/");
      } else {
        navigate("/become-member");
      }
    } else {
      navigate("/");
    }
  } catch (err: any) {
    toast.error(err?.data?.message || "Login failed");
  }
};

// Handle Register
const handleRegisterSubmit = async (data: any) => {
  try {
    const res = await register(data).unwrap();
    toast.success(res.message || "Verification code sent to your email");

    navigate("/verify-otp", { state: { email: data.email } });
  } catch (err: any) {
    toast.error(err?.data?.message[0] || "Registration failed");
  }
};

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-[500px] mx-auto">
      <div className="rounded-lg mb-6 text-center">
        <div className="flex justify-center mb-2">
          <div className="w-32 h-32 overflow-hidden flex items-center justify-center">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain scale-[2]"
            />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {role === "register" ? "Create Account" : "Welcome Back"}
        </h1>
      </div>

      <Tabs
        value={role}
        onValueChange={(v) => setRole(v as any)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full mb-8 bg-gray-100/50 p-1">
          <TabsTrigger
            value="owner"
            className="flex gap-2 cursor-pointer text-xs md:text-sm"
          >
            <User className="w-4 h-4" /> Owner Login
          </TabsTrigger>
          <TabsTrigger
            value="admin"
            className="flex gap-2 cursor-pointer text-xs md:text-sm"
          >
            <MdOutlineAdminPanelSettings className="w-4 h-4" /> Admin Login
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="flex gap-2 cursor-pointer text-xs md:text-sm"
          >
            <UserPlus className="w-4 h-4" /> New Register
          </TabsTrigger>
        </TabsList>

        <TabsContent value="owner">
          <LoginFields
            onSubmit={handleLoginSubmit}
            isLoading={isLoginLoading}
          />
        </TabsContent>
        <TabsContent value="admin">
          <LoginFields
            onSubmit={handleLoginSubmit}
            isLoading={isLoginLoading}
          />
        </TabsContent>
        <TabsContent value="register">
          <RegisterFields
            onSubmit={handleRegisterSubmit}
            isLoading={isRegisterLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginForm;
