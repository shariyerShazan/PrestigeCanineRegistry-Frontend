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

const MembershipPlanManage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const { data: plans, isLoading } = useGetAllMembershipPlansQuery(undefined);
  const [updatePlan, { isLoading: isUpdating }] =
    useUpdateMembershipPlanMutation();
  //   const [deletePlan, { isLoading: isDeleting }] = useDeleteMembershipPlanMutation();

  const handleEdit = (plan: any) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  //   const handleDelete = async (id: string) => {
  //     if (window.confirm("Are you sure you want to delete this plan?")) {
  //       try {
  //         await deletePlan(id).unwrap();
  //         toast.success("Plan deleted successfully");
  //       } catch (err: any) {
  //         toast.error(err?.data?.message || "Failed to delete plan");
  //       }
  //     }
  //   };

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedPlan) {
        // Only sending editable fields to backend
        const { name, currentPrice, canineLimit } = formData;
        await updatePlan({
          id: selectedPlan.id,
          name,
          currentPrice,
          canineLimit,
        }).unwrap();
        toast.success("Plan updated successfully");
      }
      setIsDialogOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 mx-auto min-h-screen bg-gray-50/30">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1
            className="text-3xl font-bold flex items-center gap-2"
            style={{ color: "#2B4C8A" }}
          >
            <Settings2 size={28} /> Membership Management
          </h1>
          <p className="text-gray-500 mt-1">
            Update subscription pricing and canine limits
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#2B4C8A]" size={48} />
          <p className="mt-4 text-gray-500 font-medium">Loading plans...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans?.map((plan: any) => (
            <MembershipPlanCard
              key={plan.id}
              plan={plan}
              onEdit={handleEdit}
              //   onDelete={handleDelete}
              //   isDeleting={isDeleting}
            />
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
