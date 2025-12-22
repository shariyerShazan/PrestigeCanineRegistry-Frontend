import WebFooter from "@/components/common/footer/WebFooter"
import OwnerNavbar from "@/components/common/navbar/OwnerNavbar"
import { Outlet } from "react-router"

const OwnerLayout = () => {
  return (
    <div>
     <OwnerNavbar />
         <Outlet />
         <WebFooter />
    </div>
  )
}

export default OwnerLayout