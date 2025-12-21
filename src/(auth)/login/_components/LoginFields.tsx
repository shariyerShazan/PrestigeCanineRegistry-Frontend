import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Link } from "react-router"


export const LoginFields = ({
  email,
  password,
  showPassword,
  setEmail,
  setPassword,
  setShowPassword,
  onSubmit,
}: any) => (
  <form onSubmit={onSubmit}>
    <div className="mb-4">
      <Label className="text-sm font-medium text-gray-700 mb-2 block">
        Email Address
      </Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 h-12 bg- focus:!ring-1 focus:!ring-[#D4AF37]"
          required
        />
      </div>
    </div>

    <div className="mb-6">
      <Label className="text-sm font-medium text-gray-700 mb-2 block">
        Password
      </Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pl-10 pr-10 h-12 bg- focus:!ring-1 focus:!ring-[#D4AF37]"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>

    <Button
      type="submit"
      className="w-full h-12 bg-[#D4AF37] hover:bg-[#C39138] cursor-pointer text-white font-semibold rounded-lg"
    >
      Login
      <ArrowRight className="ml-2 w-4 h-4" />
    </Button>

    <p className="text-center text-sm text-gray-600 mt-4">
      Forgot Password?{" "}
      <Link to={"/forgot-password"} className="text-[#2B4C8A] font-medium">Contact PCRI</Link>
    </p>
  </form>
)
