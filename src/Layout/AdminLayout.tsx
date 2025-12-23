import { AdminAppSidebar } from "@/(admin)/pages/dashboard/_components/AdminAppSidebar"
import { AdminTopNav } from "@/(admin)/pages/dashboard/_components/AdminTopNav"
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { Outlet } from "react-router"



const AdminLayout = () => {
  return (
    <SidebarProvider>
      <LayoutInner />
    </SidebarProvider>
  )
}

function LayoutInner() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <AdminAppSidebar collapsed={collapsed} />

      {/* Right Side */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <AdminTopNav />

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 bg-[#F9FAFB]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}


export default AdminLayout
