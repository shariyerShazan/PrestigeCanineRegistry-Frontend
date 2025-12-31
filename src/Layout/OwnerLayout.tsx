import WebFooter from "@/components/common/footer/WebFooter";
import OwnerNavbar from "@/components/common/navbar/OwnerNavbar";
import { Outlet } from "react-router";

const NAVBAR_HEIGHT = "pt-20"; // approx 80px

const OwnerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <div className={"fixed top-0 left-0 w-full z-50"}>
        <OwnerNavbar />
      </div>


      {/* Page Content */}
      <main className={NAVBAR_HEIGHT}>
        <Outlet />
      </main>

      {/* Footer */}
      <WebFooter />
    </div>
  );
};

export default OwnerLayout;
