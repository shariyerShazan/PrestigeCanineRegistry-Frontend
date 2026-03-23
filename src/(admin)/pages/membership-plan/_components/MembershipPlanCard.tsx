import { Edit, 
    // Trash2, 
    CheckCircle2 } from "lucide-react";
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
//   onDelete: (id: string) => void;
//   isDeleting: boolean;
}

const MembershipPlanCard = ({
  plan,
  onEdit,
//   onDelete,
//   isDeleting,
}: PlanProps) => {
  // 2. Dynamic Styles based on Tier
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

  //   const getButtonStyles = (tier: string) => {
  //     if (tier?.toUpperCase() === "PRESTIGE") return "bg-[#D4AF37] text-[#2B4C8A] hover:bg-[#C4A137]";
  //     if (tier?.toUpperCase() === "CORE") return "bg-[#4A6FB4] text-white hover:bg-[#3A5FA4]";
  //     return "bg-white text-black hover:bg-gray-100";
  //   };

  return (
    <Card
      className={`relative overflow-hidden border-none transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 min-h-[550px] flex flex-col ${getTierStyles(plan.tier)}`}
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

      <CardContent className="space-y-5 px-8 flex-grow mt-6">
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

      <CardFooter className="flex flex-col gap-3  mt-auto5">
        {/* <Button
          className={`w-full h-12 font-bold rounded-lg transition-all duration-200 ${getButtonStyles(plan.tier)}`}
        >
          Become a {plan.name}
        </Button> */}

        <div className="flex gap-2 w-full mt-2">
          <Button
            variant="ghost"
            className="flex-1 bg-white/10 cursor-pointer hover:bg-white/20 text-white border border-white/20"
            onClick={() => onEdit(plan)}
          >
            <Edit size={16} className="mr-2" /> Edit
          </Button>
          {/* <Button
            variant="destructive"
            className="flex-1 bg-red-500/80 cursor-pointer hover:bg-red-600 shadow-lg"
            onClick={() => onDelete(plan.id)}
            disabled={isDeleting}
          >
            <Trash2 size={16} className="mr-2" /> Delete
          </Button> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MembershipPlanCard;
