import { useState } from "react";
import { Settings2, Loader2 } from "lucide-react";
import {
  // useDeleteMembershipPlanMutation,
  useGetAllMembershipPlansQuery,
  useUpdateMembershipPlanMutation,
} from "@/redux/features/admin-membership-plan/membershipApi";
import { toast } from "react-toastify";
import MembershipPlanCard from "./_components/MembershipPlanCard";
import MemberShipCreateEditDialog from "./_components/MemberShipCreateEditDialog";
// ... imports same thakbe

const MembershipPlanManage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const { data: plans, isLoading } = useGetAllMembershipPlansQuery(undefined);
  const [updatePlan, { isLoading: isUpdating }] = useUpdateMembershipPlanMutation();

  const handleEdit = (plan: any) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

const handleSubmit = async (formData: any) => {
  if (!selectedPlan?.id) {
    toast.error("No plan selected for update");
    return;
  }

  try {
    const payload = {
      id: selectedPlan.id,
      ...formData,
    };
    await updatePlan(payload).unwrap();

    toast.success(`${formData.name || "Plan"} updated successfully!`);
    setIsDialogOpen(false);
  } catch (err: any) {
    // 5. Backend validation error handling
    const errorMessage = err?.data?.message || "Failed to update membership";
    toast.error(errorMessage);
    console.error("Update Error:", err);
  }
};

  return (
    <div className="p-6 mx-auto min-h-screen bg-gray-50/30">
      <div className="mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-2" style={{ color: "#2B4C8A" }}>
          <Settings2 size={28} /> Membership & Service Pricing
        </h1>
        <p className="text-gray-500 mt-1">Manage global prices and tier-specific discounts</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans?.map((plan: any) => (
            <MembershipPlanCard key={plan.id} plan={plan} onEdit={handleEdit} />
          ))}
        </div>
      )}

      <MemberShipCreateEditDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        onSubmit={handleSubmit}
        initialData={selectedPlan}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default MembershipPlanManage;
