import Login from "@/(auth)/login/Login";
import Register from "@/(auth)/register/Register";
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
        path: "/dashboard",
        element: <AdminLayout />
    },
    {
        path: "/owner" ,
        element: <OwnerLayout />
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