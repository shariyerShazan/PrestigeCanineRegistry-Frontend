
import { useLocation } from 'react-router'
import { LuDog, LuShield, LuUsers } from "react-icons/lu";
import { FaRegChartBar } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { PiMedal } from 'react-icons/pi';
import { GrFlag } from "react-icons/gr";
import { FiActivity } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';


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
    icon: CiCircleCheck,
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
    url: "/admin/dashboard/Dog-Registry",
    icon: FiActivity,
  },
  {
    title: "Settings",
    url: "/admin/dashboard/Settings",
    icon: IoSettingsOutline,
  },
]




export function AdminAppSidebar({ collapsed = false }: { collapsed?: boolean }) {
//   Use react-router location for accurate active link detection
  const location = useLocation()
  const pathname = location?.pathname ?? '/'

  return (
    <aside className={`h-screen bg-white border-r transition-all duration-200 ${collapsed ? 'w-16' : 'w-56'}`}>

      <nav className="flex-1 overflow-auto mt-2 ">
        <div className="text-md flex gap-2 justify-center items-center  px-1 mb-2 ml-1 border-b border-gray-300 pb-3"><LuShield size={35} className="p-1 bg-[#155DFC] text-white rounded-md"/> <span className={`${collapsed? "hidden" : ""}`}>Admin Panel</span></div>
        <ul className="space-y-1 mt-3">
          {items.map((item) => {
            const isActive = item.url !== '#' && pathname === item.url
            return (
              <li key={item.title} className="relative">
                <a
                  href={item.url}
                  className={`flex items-center gap-3  px-3 py-2  text-base ${collapsed ? 'justify-center' : ''} ${isActive ? 'bg-[#EFF6FF] text-[#2B4C8A]' : 'hover:bg-[#D4AF3720] '}`}
                >
                  <item.icon className={`w-5 h-5   ${isActive? "text-[#2B4C8A]" : ""}`} />
                  <span className={`${collapsed ? 'hidden' : 'inline'} text-md`}>{item.title}</span>
                  {isActive && <span className="absolute right-0 top-0 h-full w-1 bg-[#D4AF37] text-[#2B4C8A]" />}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}