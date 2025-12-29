import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router" 
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

import { User, UserPlus } from "lucide-react"
import logo from "@/assets/login/logo.png"
import { LoginFields } from "./LoginFields"
import { RegisterFields } from "./RegisterFields"
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const LoginForm = () => {
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"owner" | "admin" | "register">("owner")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (role === "owner") {
      console.log("Owner Logging in...");
      navigate("/owner/dashboard"); 
    } 
    else if (role === "admin") {
      console.log("Admin Logging in...");
      navigate("/admin/dashboard");
    } 
    else if (role === "register") {
      console.log("Registration Successful!");
      setRole("owner"); 
      alert("Registration Successful! Please login.");
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-[500px] mx-auto">
      {/* Header */}
      <div className="rounded-lg mb-6 text-center">
        <div className="flex justify-center mb-2">
          <img src={logo} alt="Logo" className="w-32 h-32 object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {role === "register" ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-sm text-gray-600">
          {role === "register" ? "Create your account to continue" : "Sign in to your account to continue"}
        </p>
      </div>

      <Tabs
        value={role}
        onValueChange={(value) => setRole(value as any)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full mb-8 bg-gray-100/50 p-1">
          <TabsTrigger value="owner" className="flex gap-2 cursor-pointer text-xs md:text-sm">
            <User className="w-4 h-4" />
            Owner Login
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex gap-2 cursor-pointer text-xs md:text-sm">
            <MdOutlineAdminPanelSettings className="w-4 h-4" />
            Admin Login
          </TabsTrigger>
          <TabsTrigger value="register" className="flex gap-2 cursor-pointer text-xs md:text-sm">
            <UserPlus className="w-4 h-4" />
            New Register
          </TabsTrigger>
        </TabsList>

        <TabsContent value="owner">
          <LoginFields
            email={email}
            password={password}
            showPassword={showPassword}
            setEmail={setEmail}
            setPassword={setPassword}
            setShowPassword={setShowPassword}
            onSubmit={handleSubmit}
          />
        </TabsContent>

        <TabsContent value="admin">
          <LoginFields
            email={email}
            password={password}
            showPassword={showPassword}
            setEmail={setEmail}
            setPassword={setPassword}
            setShowPassword={setShowPassword}
            onSubmit={handleSubmit}
          />
        </TabsContent>

        <TabsContent value="register">
          <RegisterFields onSubmit={handleSubmit} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LoginForm