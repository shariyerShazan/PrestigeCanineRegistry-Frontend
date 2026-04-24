import WebFooter from "@/components/common/footer/WebFooter"
import WebNavbar from "@/components/common/navbar/WebNavbar"
import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div>
      <div className={"fixed top-0 left-0 w-full z-50"}>
           <WebNavbar />      
      </div>
         <main className="pt-12"> 
            <Outlet />
         </main>
         <WebFooter />
    </div>
  )
}

export default MainLayout