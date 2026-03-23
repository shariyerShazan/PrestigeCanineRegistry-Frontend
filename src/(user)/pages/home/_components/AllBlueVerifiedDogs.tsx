/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import DogDetailsCard from "./common/DogDetailsCard";
import { useGetAllCaninesQuery } from "@/redux/features/canine/canine.api";

const AllBlueVerifiedDogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  // Logic: Fetching only BLUE tier dogs from API
  const queryParams = {
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    tier: "BLUE",
    status: "APPROVED",
  };

  const { data, isLoading, isFetching } = useGetAllCaninesQuery(queryParams);

  const totalPages = data?.meta?.totalPages || 0;

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              All Blue Verified
            </h2>
            <p className="text-gray-600">Standard verified dogs</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={currentPage === 1 || isLoading}
              className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer border-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentPage === totalPages || isLoading}
              className="bg-[#D4AF37] hover:bg-[#C4A137] text-white border-none cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#2B4C8A] mb-2" size={40} />
            <p className="text-gray-500 font-medium">
              Fetching blue verified dogs...
            </p>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${
              isFetching ? "opacity-50" : "opacity-100"
            }`}
          >
            {data?.data?.length > 0 ? (
              data.data.map((dog: any) => (
                <DogDetailsCard
                  key={dog.id}
                  id={dog.id}
                  name={dog.name}
                  breed={dog.breedRelation?.name || "N/A"}
                  pcrId={dog.pcrId}
                  imageUrl={dog.images?.[0]?.url || ""}
                  ownerName={dog.owner?.fullName || "Private Owner"}
                  ownerAvatar={dog?.owner?.profileImage?.url}
                  verifyType={dog.tier} // This will be "BLUE"
                  status={dog.status}
                  ownerId={dog?.owner?.id}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-400 text-lg">
                  No blue verified dogs found.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBlueVerifiedDogs;
