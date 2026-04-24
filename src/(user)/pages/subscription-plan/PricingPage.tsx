import bgImg from "@/assets/login/Vector.svg";
import { Button } from "@/components/ui/button";
import { GoHome } from "react-icons/go";
import { useNavigate } from "react-router";
import { useGetAllMembershipPlansQuery } from "@/redux/features/admin-membership-plan/membershipApi";
import { Loader2 } from "lucide-react";
import UserMembershipCard from "./_components/UserMembershipCard";

const PricingPage = () => {
  const navigate = useNavigate();
  const { data: plans, isLoading } = useGetAllMembershipPlansQuery(undefined);

  return (
    <div className="min-h-screen bg-[#2B4C8A] relative flex flex-col items-center py-12 overflow-x-hidden">
      {/* Background Vector */}
      <div
        className="absolute inset-0 bg-cover opacity-40 pointer-events-none"
        style={{ backgroundImage: `url(${bgImg})` }}
      />

      <div className="relative z-10 w-full  px-6">
        {/* Navigation Button */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={() => navigate("/login")}
            className="bg-transparent text-white border border-white/30 hover:bg-white/10 cursor-pointer backdrop-blur-sm transition-all"
          >
            <GoHome className="mr-2" size={18} /> Back to Login
          </Button>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Select your Registry Status
          </h1>
          <p className="text-blue-100/70 text-lg max-w-2xl mx-auto">
            Choose the perfect plan that fits your needs. Upgrade or downgrade
            at any time.
          </p>
        </div>

        {/* Membership Cards Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-white" size={48} />
            <p className="mt-4 text-white/70 font-medium">
              Loading membership tiers...
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {plans?.map((plan: any) => (
              <UserMembershipCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-11 text-center text-white/60 text-sm">
          <p className="mb-2">© 2025 PCR Dogs Registry. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <a
              href="#"
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              Privacy Policy
            </a>
            <span className="opacity-30">|</span>
            <a
              href="#"
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              Terms of Service
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PricingPage;
