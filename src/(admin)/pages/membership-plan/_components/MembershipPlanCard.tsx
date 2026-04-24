import { Edit, CheckCircle2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PlanProps {
  plan: any;
  onEdit: (plan: any) => void;
}

const MembershipPlanCard = ({ plan, onEdit }: PlanProps) => {
  // Tier wise styling logic
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

  // Service Pricing Calculation for Display
  const renderServicePricing = () => {
    return plan.servicePricings?.map((service: any) => {
      // Logic: Final Price = Base Price * (1 - Discount Percentage)
      let discountPercent = 0;
      if (service.serviceType === "CANINE_REG")
        discountPercent = plan.canineRegDiscount;
      if (service.serviceType === "LITTER_REG")
        discountPercent = plan.litterRegDiscount;
      if (service.serviceType === "TRANSFER")
        discountPercent = plan.transferDiscount;
      if (service.serviceType === "CERTIFICATE")
        discountPercent = plan.certificateDiscount;

      const finalPrice = service.price * (1 - discountPercent);

      return (
        <div
          key={service.id}
          className="flex flex-col border-b border-white/10 pb-2 last:border-none"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold uppercase opacity-80">
              {service.serviceType.replace("_", " ")}
            </span>
            <div className="text-right">
              <span className="text-sm font-bold">
                {finalPrice === 0 ? "FREE" : `$${finalPrice.toFixed(2)}`}
              </span>
            </div>
          </div>
          <div className="flex justify-between text-[10px] opacity-70 italic">
            <span>Base: ${service.price}</span>
            <span>{discountPercent * 100}% Off</span>
          </div>
        </div>
      );
    });
  };

  return (
    <Card
      className={`relative overflow-hidden border-none transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 min-h-[650px] flex flex-col ${getTierStyles(plan.tier)}`}
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

      <CardContent className="space-y-6 px-8 flex-grow mt-6">
        {/* --- Service Price Section --- */}
        <div className="bg-black/20 rounded-xl p-4 space-y-3 border border-white/5">
          <div className="flex items-center gap-2 mb-1 border-b border-white/20 pb-1">
            <Tag size={14} />
            <span className="text-xs font-bold uppercase">
              Service Pricing (Per Item)
            </span>
          </div>
          {renderServicePricing()}
        </div>

        {/* --- Plan Features --- */}
        <div className="space-y-4">
          <div className="flex items-start gap-3 text-[14px] leading-snug">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
            <span>
              {plan.canineLimit} Initial Canine Registration included*
            </span>
          </div>

          {plan.features?.map((feature: any, idx: number) => (
            <div
              key={idx}
              className="flex items-start gap-3 text-[14px] leading-snug opacity-95"
            >
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
              <span>
                {typeof feature === "string" ? feature : feature.text}
              </span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="px-8 pb-8 mt-auto">
        <Button
          variant="ghost"
          className="w-full bg-white/10 cursor-pointer hover:bg-white/20 text-white border border-white/20 h-12 font-bold"
          onClick={() => onEdit(plan)}
        >
          <Edit size={16} className="mr-2" /> Edit Plan & Pricing
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MembershipPlanCard;
