import AdminDashboard from "@/(admin)/pages/dashboard/AdminDashboard";
import Login from "@/(auth)/login/Login";
import Register from "@/(auth)/register/Register";
import OwnerDogRegistration from "@/(owner)/pages/dogRegistration/OwnerDogRegistration";
import OwnerDashboard from "@/(owner)/pages/ownerDashboard/OwnerDashboard";
import OwnerDogPreview from "@/(owner)/pages/ownerDogPreview/OwnerDogPreview";
import OwnerProfile from "@/(owner)/pages/ownerProfile/OwnerProfile";
import DogProfilePage from "@/(user)/pages/dogProfile/DogProfilePage";
import HomePage from "@/(user)/pages/home/HomePage";
import OwnerDetailsPage from "@/(user)/pages/ownerDetailsPage/OwnerDetailsPage";
import DogSearchPage from "@/(user)/pages/searchDog/SearchDogs";
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
                element: <DogSearchPage />
            },
            {
                path: "dog/profile",
                element: <DogProfilePage />
            },
            {
                path: "owner-details" , 
                element: <OwnerDetailsPage />
            }
        ]
    },
      {
        path: "/admin/dashboard",
        element: <AdminLayout />, 
        children: [
            {
                index: true ,
                element: <AdminDashboard /> 
            },
        ]
    },
    {
        path: "/owner/dashboard" ,
        element: <OwnerLayout />,
        children: [
            {
                index: true ,
                element: <OwnerDashboard />
            },
            {
                path: "dog-preview",
                element: <OwnerDogPreview />
            },
            {
                path: "dog-registration",
                element: <OwnerDogRegistration />
            },
            {
                path: "profile" ,
                element: <OwnerProfile />
            }
        ]
    },
    {
        path: "/login" ,
        element: <Login />
    },
    {
        path: "/register" ,
        element: <Register />
    }
])