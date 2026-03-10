import ActivityLog from "@/(admin)/pages/activityLog/ActivityLog";
import PrestigeCertificate from "@/(admin)/pages/certificate/Certificate";
import CertificateReqDetails from "@/(admin)/pages/certificateRequest/_components/CertificateReqDetails";
import CertificateRequest from "@/(admin)/pages/certificateRequest/CertificateRequest";
import AdminDashboard from "@/(admin)/pages/dashboard/AdminDashboard";
import DogRegistrationRequest from "@/(admin)/pages/dogRegistrationRequest/DogRegistrationRequest";
import DogRegistryPage from "@/(admin)/pages/dogRegistryPage/DogRegistryPage";
import ReportManagement from "@/(admin)/pages/reportManagement/ReportManagement";
import ReportManagementView from "@/(admin)/pages/reportManagement/reportView/ReportManagementView";
import RoleAndPermission from "@/(admin)/pages/roleAndPermission/RoleAndPermission";
import ADsetting from "@/(admin)/pages/setting/ADsetting";
import DTransferOwnerShip from "@/(admin)/pages/transferOwnerShip/TransferOwnerShip";
import UserManagement from "@/(admin)/pages/userManagement/UserManagement";
import ForgotPasswordFlow from "@/(auth)/forgot-pass/AuthForgot";
import Login from "@/(auth)/login/Login";
import Register from "@/(auth)/register/Register";
import VerifyOtp from "@/(auth)/verify-otp/VerifyOtp";
import OwnerDogRegistration from "@/(owner)/pages/dogRegistration/OwnerDogRegistration";
import LitterRegistration from "@/(owner)/pages/LitterRegistration/LitterRegistration";
import OwnerDashboard from "@/(owner)/pages/ownerDashboard/OwnerDashboard";
import OwnerDogPreview from "@/(owner)/pages/ownerDogPreview/OwnerDogPreview";
import OwnerProfile from "@/(owner)/pages/ownerProfile/OwnerProfile";
import TransferOwner from "@/(owner)/pages/transferOwnership/TransferOwner";
import AboutPage from "@/(user)/pages/about/About";
import ContactPage from "@/(user)/pages/contact/ContactPage";
import DogProfilePage from "@/(user)/pages/dogProfile/DogProfilePage";
import HomePage from "@/(user)/pages/home/HomePage";
import OwnerDetailsPage from "@/(user)/pages/ownerDetailsPage/OwnerDetailsPage";
import DogSearchPage from "@/(user)/pages/searchDog/SearchDogs";
// import GoldCertificate from "@/components/common/certificate/GoldCertificate";
import NotFoundPage from "@/components/common/error/NotFoundPage";
import AdminLayout from "@/Layout/AdminLayout";
import MainLayout from "@/Layout/MainLayout";
import OwnerLayout from "@/Layout/OwnerLayout";
import { createBrowserRouter } from "react-router";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search-dogs",
        element: <DogSearchPage />,
      },
      {
        path: "dogs/:dogId",
        element: <DogProfilePage />,
      },
      {
        path: "owner-details/:ownerId",
        element: <OwnerDetailsPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "Registration-Requests",
        element: <DogRegistrationRequest />,
      },
      {
        path: "Transfer-Ownership",
        element: <DTransferOwnerShip />,
      },
      {
        path: "User-Management",
        element: <UserManagement />,
      },
      {
        path: "Roles-Permissions",
        element: <RoleAndPermission />,
      },
      {
        path: "Activity-Logs",
        element: <ActivityLog />,
      },
      {
        path: "Certificate-Requests",
        element: <CertificateRequest />,
      },
      {
        path: "Certificate-Requests/:requestId",
        element: <CertificateReqDetails />,
      },
      {
        path: "Dog-Registry",
        element: <DogRegistryPage />,
      },
      {
        path: "Reports-Management",
        element: <ReportManagement />,
      },
      {
        path: "Reports-Management/:reportId",
        element: <ReportManagementView />,
      },
      {
        path: "settings",
        element: <ADsetting />,
      },
    ],
  },
  {
    path: "/owner/dashboard",
    element: <OwnerLayout />,
    children: [
      {
        index: true,
        element: <OwnerDashboard />,
      },
      {
        path: "dog-preview/:dogId",
        element: <OwnerDogPreview />,
      },
      {
        path: "dog-registration",
        element: <OwnerDogRegistration />,
      },
      {
        path: "profile/:ownerId",
        element: <OwnerProfile />,
      },
      {
        path: "litter-registration",
        element: <LitterRegistration />,
      },
      {
        path: "transfer-owner",
        element: <TransferOwner />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordFlow />
  },
  {
    path: "verify-otp",
    element: <VerifyOtp />
  },
  {
    path: "cert",
    element: <PrestigeCertificate />,
  },
]);