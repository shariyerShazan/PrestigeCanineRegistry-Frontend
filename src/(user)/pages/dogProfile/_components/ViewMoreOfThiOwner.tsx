
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCaninesByOwnerIdQuery } from "@/redux/features/canine/canine.api";
import DogDetailsCard from "../../home/_components/common/DogDetailsCard";
import { Loader2 } from "lucide-react";

const ViewMoreOfThiOwner = ({ ownerId }: { ownerId: string }) => {
  // 1. Logic: Fetch dynamic data based on ownerId
  const { data: response, isLoading } = useGetCaninesByOwnerIdQuery({
    ownerId,
    status: "APPROVED",
    limit: 6, // Ekhon limited results dekhano hobe
  });

  const dogsData = response?.data || [];
  const ownerName = response?.ownerInfo?.fullName || "This Owner";

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#2B4C8A]" size={40} />
      </div>
    );
  }

  // 2. Logic: Render only if data exists
  if (dogsData.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-slate-50/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 ">
          View More of {ownerName}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {dogsData.map((dog: any) => (
            <DogDetailsCard
              key={dog.id}
              id={dog.id}
              name={dog.name}
              breed={dog.breedRelation?.name || "N/A"}
              pcrId={dog.pcrId}
              imageUrl={dog.images?.[0]?.url || ""}
              ownerName={dog.owner?.fullName}
              ownerAvatar={dog?.owner?.profileImage?.url}
              verifyType={dog.tier}
              status={dog.status}
              ownerId={dog?.owner?.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewMoreOfThiOwner;