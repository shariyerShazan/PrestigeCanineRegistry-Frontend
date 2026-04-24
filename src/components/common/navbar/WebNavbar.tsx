
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LucideUserRound,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router";
import logo from "@/assets/login/logo.png";
import { useGetMeQuery, useLogoutMutation } from "@/redux/features/auth/authApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "react-toastify";


const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-[#D4AF37] font-medium"
    : "hover:text-[#D4AF37] transition-colors";

const WebNavbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  // 1. Auth Hooks
  const { data: userData } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();
  
  const user = userData?.data;
  const isLoggedIn = !!user;

  // 2. Logic: Determine Dashboard Link
  const getDashboardLink = () => {
    if (user?.roleType === "SUPER_ADMIN" || user?.roleType === "ADMIN") {
      return "/admin/dashboard";
    }
    return "/owner/dashboard";
  };

  // 3. Logout Handler
  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-[#2B4C8A] text-white px-6 border-b-2 border-[#D4AF37] relative">
      <div className="container mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <div className="h-14 w-14 overflow-hidden">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="scale-175 object-contain" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          {/* <NavLink to="/breed-archive" className={navLinkClass}>
            Breed Archive
          </NavLink> */}
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </div>

        {/* Auth Section */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer outline-none">
                  <Avatar className="h-10 w-10 border-2 border-[#D4AF37]">
                    <AvatarImage src={user?.profileImage?.url} />
                    <AvatarFallback className="bg-[#1e3a72] text-white">
                      {user?.fullName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-sm font-medium truncate max-w-[120px]">
                      {user?.fullName}
                    </span>
                    <span className="text-[10px] text-slate-300 capitalize">
                      {user?.roleType?.toLowerCase().replace("_", " ")}
                    </span>
                  </div>
                  <ChevronDown size={14} className="text-slate-300" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate(getDashboardLink())}
                  className="cursor-pointer"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavLink to="/login">
              <Button
                variant="ghost"
                className="text-white border border-white/20 hover:bg-white/10"
              >
                Login to Dashboard
                <LucideUserRound className="w-4 h-4 ml-2" />
              </Button>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#2B4C8A] border-t border-white/10 z-50 py-6 px-6 flex flex-col gap-4">
          <NavLink
            to="/"
            end
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/search-dogs"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Breed Archive
          </NavLink>
          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Contact
          </NavLink>

          <div className="pt-4 border-t border-white/10">
            {isLoggedIn ? (
              <div className="space-y-3">
                <button
                  onClick={() => {
                    navigate(getDashboardLink());
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left py-2"
                >
                  <LayoutDashboard size={18} /> Dashboard
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left py-2 text-red-400"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" onClick={() => setOpen(false)}>
                <Button className="w-full bg-[#D4AF37] text-[#2B4C8A] hover:bg-[#b8962d]">
                  Login to Dashboard
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default WebNavbar;