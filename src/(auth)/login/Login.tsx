import bgImg from "@/assets/login/Vector.svg"
import LoginForm from "./_components/LoginForm"

const Login = () => {
  return (
    <div className="min-h-screen bg-[#2B4C8A] relative flex items-center justify-center overflow-hidden">

      <div
        className="absolute inset-0 bg-cover mt-[] bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <LoginForm />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-16 left-0 right-0 text-center text-white text-sm">
        <p className="mb-2">© 2025 PCR Dogs Registry. All rights reserved.</p>
        <div className="flex items-center justify-center gap-4 text-xs">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </footer>
    </div>
  )
}

export default Login
