
import { useLocation } from 'react-router'
import { LuCircleCheck, LuDog, LuShield, LuUsers } from "react-icons/lu";
import { FaRegChartBar } from "react-icons/fa6";
// import { CiCircleCheck } from "react-icons/ci";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { PiMedal } from 'react-icons/pi';
import { GrFlag } from "react-icons/gr";
import { FiActivity } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { Home, LogOut } from 'lucide-react';


// Menu items.
const items = [
  {
    title: "Overview",
    url: "/admin/dashboard",
    icon: FaRegChartBar,
  },
  {
    title: "Registration Requests",
    url: "/admin/dashboard/Registration-Requests",
    icon: LuCircleCheck
,
  },
  {
    title: "User Management",
    url: "/admin/dashboard/User-Management",
    icon: LuUsers,
  },
  {
    title: "Dog Registry",
    url: "/admin/dashboard/Dog-Registry",
    icon: LuDog,
  },
  {
    title: "Transfer Ownership",
    url: "/admin/dashboard/Transfer-Ownership",
    icon: AiOutlineUserSwitch,
  },
   {
    title: "Certificate Requests",
    url: "/admin/dashboard/Certificate-Requests",
    icon: PiMedal,
  },
  {
    title: "Reports Management",
    url: "/admin/dashboard/Reports-Management",
    icon: GrFlag,
  },
  {
    title: "Roles & Permissions",
    url: "/admin/dashboard/Roles-Permissions",
    icon: LuShield,
  },
  {
    title: "Activity Logs",
    url: "/admin/dashboard/Activity-Logs",
    icon: FiActivity,
  },
  {
    title: "Settings",
    url: "/admin/dashboard/Settings",
    icon: IoSettingsOutline,
  },
]




export function AdminAppSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const location = useLocation()
  const pathname = location?.pathname ?? '/'

  return (
    <aside
      className={`h-screen flex flex-col bg-white border-r transition-all duration-200 ${
        collapsed ? 'w-16' : 'w-70'
      }`}
    >
      {/* TOP SECTION */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="flex items-center gap-2 justify-center  py-2.5 border-b border-gray-300">
          <LuShield
            size={35}
            className="p-1 bg-[#155DFC] text-white rounded-md"
          />
          {!collapsed && <span className="font-medium">Admin Panel</span>}
        </div>

        {/* Menu */}
        <nav className="mt-3 ">
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.url

              return (
                <li key={item.title} className="relative">
                  <a
                    href={item.url}
                    className={`flex items-center gap-3  px-4 py-2 text-sm transition-colors ${
                      collapsed ? 'justify-center' : ''
                    } ${
                      isActive
                        ? 'bg-[#EFF6FF] text-[#2B4C8A]'
                        : 'hover:bg-[#D4AF3720]'
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        isActive ? 'text-[#2B4C8A]' : ''
                      }`}
                    />
                    {!collapsed && <span>{item.title}</span>}

                    {isActive && (
                      <span className="absolute right-0 top-0 h-full w-1 bg-[#D4AF37]" />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t  py-3 space-y-1">
        {/* Go to Home */}
        <a
          href="/"
          className={`flex items-center gap-3  px-4 py-2 text-sm hover:bg-[#D4AF3720] ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <Home className="w-5 h-5" />
          {!collapsed && <span>Back to Site</span>}
        </a>

        {/* Logout */}
        <button
          className={`w-full cursor-pointer  flex items-center gap-3  px-4 py-2 text-sm text-red-600 hover:bg-red-50 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-5 h-5 " />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
