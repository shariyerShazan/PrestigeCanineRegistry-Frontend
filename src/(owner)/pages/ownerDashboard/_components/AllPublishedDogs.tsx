import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyCaninesQuery } from "@/redux/features/canine/canine.api";
import { OwnerDogDetailsCard } from "../../_components/OwnerDogDetailsCard";
import { useCreateCertificateRequestMutation } from "@/redux/features/certificate-request/certificate.req.api";
import { toast } from "react-toastify";
import { useCalculatePricing } from "@/Layout/OwnerLayout";

const AllPublishedDogs = ({
  activeFilter = "all",
}: {
  activeFilter?: string;
}) => {
  const navigate = useNavigate();

  // RTK Mutation Hook
  const [createRequest, { isLoading: isRequesting }] =
    useCreateCertificateRequestMutation();

  const queryParams: any = {
    page: 1,
    limit: 10,
  };

  if (activeFilter === "gold") queryParams.tier = "GOLD";
  if (activeFilter === "blue") queryParams.tier = "BLUE";
  if (activeFilter === "pending") queryParams.status = "PENDING";
  if (activeFilter === "canceled") queryParams.status = "DECLINE";

  const { data: canineResponse, isLoading } = useGetMyCaninesQuery(queryParams);
  const dogs = canineResponse?.data || [];

  const { certificatePrice } = useCalculatePricing();
  // Handler function for certificate request
  const handleRequestCertificate = async (canineId: string) => {
    try {
      const res = await createRequest({ canineId }).unwrap();

      if (res?.url) {
        toast.info("Redirecting to payment...");
        window.location.href = res.url;
      } else {
        toast.success(
          res?.message || "Certificate request submitted successfully!",
        );
      }
    } catch (error: any) {
      const errorMsg = error?.data?.message || "Failed to submit request";
      toast.error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <section className="pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dogs.length > 0 ? (
          dogs.map((dog: any) => (
            <div
              key={dog.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <OwnerDogDetailsCard
                id={dog.id}
                name={dog.name}
                breed={dog.breedRelation?.name || "Unknown Breed"}
                pcrId={dog.pcrId}
                imageUrl={dog.images?.[0]?.url || ""}
                verifyType={dog.tier?.toLowerCase()}
                status={dog.status}
              />
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={() => handleRequestCertificate(dog.id)}
                  disabled={isRequesting}
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-[#2B4C8A] border-[#2B4C8A] hover:text-[#D4AF37] text-white hover:bg-[#1e355f] text-xs cursor-pointer disabled:opacity-50"
                >
                  {isRequesting
                    ? "Processing..."
                    : `Request Certificate ${certificatePrice > 0 ? `($${certificatePrice.toFixed(2)})` : "(Free)"}`}
                </Button>
                <Button
                  onClick={() => navigate("/owner/dashboard/transfer-owner")}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-[#2B4C8A] text-[#2B4C8A] hover:bg-[#2B4C8A] hover:text-white text-xs bg-transparent cursor-pointer"
                >
                  Transfer Ownership
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed">
            No dogs found for this category
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPublishedDogs;
