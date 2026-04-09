import WebFooter from "@/components/common/footer/WebFooter";
import WebNavbar from "@/components/common/navbar/WebNavbar";
import { Outlet } from "react-router";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { Loader2, AlertCircle, Ban, Clock } from "lucide-react";

const NAVBAR_HEIGHT = "pt-20"; // approx 80px

const OwnerLayout = () => {
  const { data: userData, isLoading } = useGetMeQuery(undefined);
  const user = userData?.data;

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin text-[#155DFC]" size={40} />
      </div>
    );
  }

  // 2. Logic: Status-based view rendering
  const renderStatusMessage = () => {
    switch (user?.status) {
      case "PENDING":
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <Clock className="text-yellow-500 mb-4" size={64} />
            <h1 className="text-2xl font-bold text-slate-800">
              Account Pending
            </h1>
            <p className="text-slate-600 mt-2 max-w-md">
              Your account is currently under review. Please wait for the
              administrator to approve your access.
            </p>
          </div>
        );
      case "SUSPENDED":
      case "DEACTIVATED":
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <Ban className="text-red-500 mb-4" size={64} />
            <h1 className="text-2xl font-bold text-slate-800">
              Account Restricted
            </h1>
            <p className="text-slate-600 mt-2 max-w-md">
              Your account has been {user.status.toLowerCase()}. Please contact
              support for further information.
            </p>
          </div>
        );
      case "REJECTED":
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <AlertCircle className="text-orange-500 mb-4" size={64} />
            <h1 className="text-2xl font-bold text-slate-800">
              Access Rejected
            </h1>
            <p className="text-slate-600 mt-2 max-w-md">
              Unfortunately, your account application was not approved at this
              time.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const isActive = user?.status === "ACTIVE";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <div className={"fixed top-0 left-0 w-full z-50"}>
        <WebNavbar />
      </div>

      {/* Page Content */}
      <main className={`${NAVBAR_HEIGHT} flex-1`}>
        {isActive ? <Outlet /> : renderStatusMessage()}
      </main>

      {/* Footer */}
      <WebFooter />
    </div>
  );
};

export default OwnerLayout;






export const useCalculatePricing = () => {
  const { data: userData } = useGetMeQuery(undefined);
  const user = (userData as any)?.data; // Backend structure onujayi data access
  const membership = user?.membership;
  const counts = user?._count;

  const getPrice = (type: "CANINE_REG" | "LITTER_REG" | "CERTIFICATE") => {
    if (!membership) return 0;

    // 1. Service Pricing theke base price khuje ber kora
    const service = membership.servicePricings?.find(
      (s: any) => s.serviceType === type,
    );
    const basePrice = service?.price || 0;

    // 2. Pricing Logic based on Service Type
    if (type === "CANINE_REG") {
      const currentCanines = counts?.canines || 0;
      const limit = membership.canineLimit || 0;

      // Canine: Limit-er niche thakle free, upore hole paid
      if (currentCanines < limit) return 0;

      // Discount apply for Extra Canine
      const discount = membership.canineRegDiscount || 0;
      return basePrice - basePrice * (discount / 100);
    }

    if (type === "LITTER_REG") {
      // Litter: Sob somoi paid, kono limit check nai
      const discount = membership.litterRegDiscount || 0;
      return basePrice - basePrice * (discount / 100);
    }

    if (type === "CERTIFICATE") {
      const discount = membership.certificateDiscount || 0;
      return basePrice * (1 - discount);
    }

    return basePrice;
  };

  return {
    caninePrice: getPrice("CANINE_REG"),
    litterPrice: getPrice("LITTER_REG"),
    certificatePrice: getPrice("CERTIFICATE"),
    membershipName: membership?.name || "Standard",
    canineUsed: counts?.canines || 0,
    canineLimit: membership?.canineLimit || 0,
  };
};