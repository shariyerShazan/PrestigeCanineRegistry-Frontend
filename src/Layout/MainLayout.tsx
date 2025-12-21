import WebFooter from "@/components/common/footer/WebFooter"
import WebNavbar from "@/components/common/navbar/WebNavbar"
import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div>
         <WebNavbar />
         <Outlet />
         <WebFooter />
    </div>
  )
}

export default MainLayout