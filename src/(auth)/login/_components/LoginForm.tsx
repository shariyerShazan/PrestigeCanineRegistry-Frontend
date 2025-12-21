import type React from "react"
import { useState } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

import { User } from "lucide-react"
import logo from "@/assets/login/logo.png"
import { LoginFields } from "./LoginFields"
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"owner" | "admin">("owner")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { email, role })
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl p-5 w-full">
      {/* Header */}
      <div className="  rounded-lg mb-6 text-center">
        <div className="flex justify-center ">
          <img src={logo} alt="Logo" className="w-42 h-40 object-cover" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Welcome <span className="">Back</span>
        </h1>
        <p className="text-sm text-gray-600">
          Sign in to your account to continue
        </p>
      </div>

      {/* Role Tabs */}
      <Tabs
        defaultValue="owner"
        className="mb-6"
        onValueChange={(value) => setRole(value as "owner" | "admin")}
      >
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="owner" className="flex gap-2 cursor-pointer">
            <User className="w-4 h-4" />
            Owner Login
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex gap-2 cursor-pointer">
            <MdOutlineAdminPanelSettings className="w-4 h-4" />
            Admin Login
          </TabsTrigger>
        </TabsList>

        {/* Shared Form (same UI, different role) */}
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
      </Tabs>
    </div>
  )
}

export default LoginForm
