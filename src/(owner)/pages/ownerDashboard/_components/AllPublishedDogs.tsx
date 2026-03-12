/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
// import { useGetMyCaninesQuery } from "@/redux/api/canineApi";
// import OwnerDogDetailsCard from "../../_components/OwnerDogDetailsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyCaninesQuery } from "@/redux/features/canine/canine.api";
import { OwnerDogDetailsCard } from "../../_components/OwnerDogDetailsCard";

const AllPublishedDogs = ({
  activeFilter = "all",
}: {
  activeFilter?: string;
}) => {
  const navigate = useNavigate();

  // API query parameters setup based on tab value
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
                  onClick={() =>
                    navigate(`/owner/dashboard/certificate/${dog.id}`)
                  }
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-[#2B4C8A] border-[#2B4C8A] text-white hover:bg-[#1e355f] text-xs cursor-pointer"
                >
                  Request Certificate
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
