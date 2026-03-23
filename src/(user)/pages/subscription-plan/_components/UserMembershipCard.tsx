import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-toastify";
import { useCreateCheckoutSessionMutation } from "@/redux/features/payment-api/paymentApi";

interface UserPlanProps {
  plan: any;
}

const UserMembershipCard = ({ plan }: UserPlanProps) => {
  const [createCheckout, { isLoading }] = useCreateCheckoutSessionMutation();

  // 1. Dynamic Card Styles based on Tier
  const getTierStyles = (tier: string) => {
    switch (tier?.toUpperCase()) {
      case "FOUNDATIONAL":
        return "bg-[#8E8E8E] text-white";
      case "CORE":
        return "bg-[#2B4C8A] text-white";
      case "PRESTIGE":
        return "bg-gradient-to-b from-[#D4AF37] to-[#2B4C8A] text-white";
      default:
        return "bg-[#2B4C8A] text-white";
    }
  };

  // 2. Dynamic Button Styles for better contrast
  const getButtonStyles = (tier: string) => {
    if (tier?.toUpperCase() === "PRESTIGE")
      return "bg-[#D4AF37] text-[#2B4C8A] hover:bg-[#C4A137]";
    if (tier?.toUpperCase() === "CORE")
      return "bg-[#4A6FB4] text-white hover:bg-[#3A5FA4]";
    return "bg-white text-black hover:bg-gray-100";
  };

  const handleSubscribe = async () => {
    try {
      await createCheckout({ membershipId: plan.id }).unwrap();
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to initiate payment. Please login first.",
      );
    }
  };

  return (
    <Card
      className={`relative overflow-hidden border-none transition-all duration-300 hover:shadow-2xl w-125 h-155  flex flex-col ${getTierStyles(plan.tier)}`}
    >
      <CardHeader className="pt-10 px-8">
        <div className="text-sm font-bold uppercase tracking-widest opacity-90 mb-2">
          {plan.name}
        </div>
        <CardTitle className="text-5xl font-bold tracking-tight">
          {plan.currentPrice === 0 ? "Free" : `$${plan.currentPrice}`}
        </CardTitle>
        {plan.currentPrice > 0 && (
          <span className="text-sm opacity-80 mt-1">/per year</span>
        )}
      </CardHeader>

      <CardContent className="space-y-5 px-8 grow mt-6">
        <div className="flex items-start gap-3 text-[15px] leading-snug">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <span>
            {plan.canineLimit} Initial Canine Registration with annual renewal*
          </span>
        </div>

        {plan.features?.map((feature: any, idx: number) => (
          <div
            key={idx}
            className="flex items-start gap-3 text-[15px] leading-snug opacity-95"
          >
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <span>{typeof feature === "string" ? feature : feature.text}</span>
          </div>
        ))}
      </CardContent>

      <CardFooter className="p-8 mt-auto">
        <Button
          disabled={isLoading}
          onClick={handleSubscribe}
          className={`w-full cursor-pointer h-14 text-lg font-bold rounded-xl transition-all duration-300 shadow-lg ${getButtonStyles(plan.tier)}`}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            `Become a ${plan.name}`
          )}
        </Button>
        
      </CardFooter>
    </Card>
  );
};

export default UserMembershipCard;
