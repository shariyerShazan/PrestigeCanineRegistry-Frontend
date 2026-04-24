import bgImg from "@/assets/login/Vector.svg"
import LoginForm from "./_components/LoginForm"
import { Button } from "@/components/ui/button"
import { GoHome } from "react-icons/go";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-[110vh] bg-[#2B4C8A] relative flex items-center justify-center ">

      <div
        className="absolute inset-0 bg-cover mt-[] bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full px-4">

           <div onClick={()=> navigate("/")} className="flex justify-center items-center mb-8">
                <Button className="bg-transparent text-white border border-white hover:backdrop-blur-md cursor-pointer">
                   <GoHome />  Back to Home
                </Button>
           </div>
        <LoginForm />

         <footer className="absolute -bottom-20 left-0 right-0 text-center text-white text-sm">
        <p className="mb-2">© 2025 PCR Dogs Registry. All rights reserved.</p>
        <div className="flex items-center justify-center gap-4 text-xs">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </footer>
      </div>

      {/* Footer */}
     
    </div>
  )
}

export default Login
