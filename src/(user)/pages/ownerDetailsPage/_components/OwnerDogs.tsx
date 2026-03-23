/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCaninesByOwnerIdQuery } from "@/redux/features/canine/canine.api";
import DogDetailsCard from "../../home/_components/common/DogDetailsCard";
import { Loader2 } from "lucide-react";

interface OwnerDogsProps {
  ownerId: string;
  ownerName: string;
}

const OwnerDogs = ({ ownerId, ownerName }: OwnerDogsProps) => {
  // 3. Logic: Fetch owner's dogs dynamic data
  const { data: response, isLoading } = useGetCaninesByOwnerIdQuery({
    ownerId,
    status: "APPROVED",
  });

  const dogsData = response?.data || [];

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="animate-spin text-[#2B4C8A]" size={32} />
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Verified Canine of {ownerName.split(" ")[0]}
          </h2>
          <span className="bg-[#2B4C8A]/10 text-[#2B4C8A] px-4 py-1 rounded-full text-sm font-bold">
            {dogsData.length} Total
          </span>
        </div>

        {dogsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dogsData.map((dog: any) => (
              <DogDetailsCard
                key={dog.id}
                id={dog.id}
                name={dog.name}
                breed={dog.breedRelation?.name}
                pcrId={dog.pcrId}
                imageUrl={dog.images?.[0]?.url}
                ownerName={dog.owner?.fullName}
                ownerAvatar={dog.owner?.profileImage?.url}
                verifyType={dog.tier}
                ownerId={dog?.owner?.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed">
            <p className="text-gray-400 font-medium">
              No verified dogs found for this owner.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OwnerDogs;
