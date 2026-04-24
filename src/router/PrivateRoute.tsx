
import { Navigate, useLocation } from "react-router";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "react-toastify";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const location = useLocation();
  const { data: userData, isLoading, isError } = useGetMeQuery(undefined);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !ready) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="animate-spin text-[#155DFC]" size={40} />
          <p className="text-sm font-medium text-slate-500">Checking Access...</p>
        </div>
      </div>
    );
  }

  const user = userData?.data;

  // 1. Logged in check
  if (isError || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isAdmin = user.roleType === "SUPER_ADMIN" || user.roleType === "ADMIN";
  const isOwner = user.roleType === "OWNER";

  // 2. logic: Exclusive Access Control
  // allowedRoles thakle check korbe user-er role shekhane ache kina
  if (allowedRoles && !allowedRoles.includes(user.roleType)) {
    // logic: Admin owner area access korte chaile (Cross-access block)
    if (isAdmin) {
      toast.warning("Access Denied: Admins use the Admin Panel.");
      return <Navigate to="/admin/dashboard" replace />;
    }

    // logic: Owner admin area access korte chaile (Cross-access block)
    if (isOwner) {
      toast.warning("Access Denied: You don't have Admin privileges.");
      return <Navigate to="/owner/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  // 3. Membership Check (Only for Owners)
  if (isOwner && !user.membership && location.pathname !== "/become-member") {
    toast.error("Please become a member first to access the dashboard!");
    return <Navigate to="/become-member" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;