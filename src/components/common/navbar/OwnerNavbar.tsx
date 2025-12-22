import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  LucideUserRound,
} from "lucide-react"
import { NavLink, Link } from "react-router"
import logo from "@/assets/login/logo.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ownerDP from "@/assets/ownerDetails/profile.jpg"


const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-[#D4AF37] font-medium"
    : "hover:text-[#D4AF37] transition-colors"

const OwnerNavbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-[#2B4C8A] text-white px-6 border-b-2 border-[#D4AF37] relative">
      <div className="container mx-auto flex items-center justify-between h-">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="h-18 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/owner/dashboard" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/owner/dashboard/breed-archive" className={navLinkClass}>
            Breed Archive
          </NavLink>
          <NavLink to="/owner/dashboard/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/owner/dashboard/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </div>

       <div className="hidden md:block">
          <div className="flex justify-center items-center gap-2">
                 <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10 mt-2 cursor-pointer w-min"
                   >
                    Logout
                    <LucideUserRound className="w-4 h-4 mr-2" />
                 </Button>

                  <div className="relative">
                  <Avatar className="h-10 w-10 border-1 border-white shadow-xl">
                                <AvatarImage src={ownerDP}  className=' object-cover'/>
                                <AvatarFallback className="bg-[#2B4C8A] text-white text-xl">SJ</AvatarFallback>
                            </Avatar>
                  </div>
           </div>
        </div>


        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#2B4C8A] border-t border-white/10 z-50">
          <div className="flex flex-col px-6 py-6 gap-4">
            <NavLink
              to="/owner/dashboard"
              end
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/owner/dashboard/breed-archive"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Breed Archive
            </NavLink>

            <NavLink
              to="/owner/dashboard/about"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              About
            </NavLink>

            <NavLink
              to="/owner/dashboard/contact"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Contact
            </NavLink>

             <div className="flex  items-center  gap-2">
                                  <div className="relative">
                  <Avatar className="h-10 w-10 border-1 border-white shadow-xl">
                                <AvatarImage src={ownerDP}  className=' object-cover'/>
                                <AvatarFallback className="bg-[#2B4C8A] text-white text-xl">SJ</AvatarFallback>
                            </Avatar>
                  </div>
                 <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10 mt-2 cursor-pointer w-min"
                   >
                    Logout
                    <LucideUserRound className="w-4 h-4 mr-2" />
                 </Button>
               </div>

          </div>
        </div>
      )}
    </nav>
  )
}

export default OwnerNavbar
