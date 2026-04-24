import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PiCrown } from "react-icons/pi";
import { useGetPrestigeAmbassadorsQuery } from "@/redux/features/auth/authApi"; // Path check kore nio
import { Skeleton } from "@/components/ui/skeleton";

const SLIDE_COUNT = 4; // Protite slide-e koita card dekhabe

const PrestigeAmbassadors = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // RTK Query hook calling
  const { data, isLoading } = useGetPrestigeAmbassadorsQuery({
    page: currentPage,
    limit: SLIDE_COUNT,
  });

  const ambassadors = data?.data || [];
  const totalSlides = data?.meta?.totalPage || 0;

  const nextSlide = () => {
    if (currentPage < totalSlides) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(1); // Reset to first page
    }
  };

  const prevSlide = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage(totalSlides); // Go to last page
    }
  };

  return (
    <div
      className="w-full min-h-screen py-16 px-4 flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(180deg, #D4AF37 1%, #D4AF37 15%, #FFF5D3 36%, #5374B1 69%, #2B4C8A 100%)",
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-12 pt-48 md:pt-0">
        <h1 className="text-4xl md:text-5xl font-semibold text-black mb-4 drop-shadow-md">
          Our Prestige Ambassadors
        </h1>
        <p className="text-lg md:text-xl text-black">
          Real Canines, Real Verification, Real Trust
        </p>
      </div>

      {/* Slider Container */}
      <div className="max-w-7xl w-full relative px-12 flex items-center min-h-[400px]">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          disabled={totalSlides <= 1}
          className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#D4AF37] hover:bg-[#e7bc2f] rounded-md flex items-center justify-center text-white z-10 border border-white/30 disabled:opacity-50"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Cards / Loading State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {isLoading
            ? [...Array(4)].map((_, i) => (
                <div key={i} className="p-4">
                  <Skeleton className="aspect-square rounded-2xl w-full mb-4 bg-white/20" />
                  <Skeleton className="h-6 w-3/4 bg-white/20 mb-2" />
                  <Skeleton className="h-4 w-1/2 bg-white/20" />
                </div>
              ))
            : ambassadors.map((item: any) => (
                <div
                  key={item.id}
                  className="rounded-[24px] p-4 transition-all duration-300  group cursor-pointer"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 border border-white/20 shadow-lg group-hover:border-[#D4AF37]/50 transition-colors">
                    <img
                      src={
                        item.profileImage?.url ||
                        "https://placehold.co/400x400/2B4C8A/FFFFFF?text=Prestige+Ambassador"
                      }
                      alt={item.fullName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Hover overlay optional */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="text-left px-1">
                    <div className="flex gap-2 items-center">
                      <PiCrown
                        size={22}
                        className="text-[#D4AF37] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                      />
                      <h3 className="text-lg text-white font-semibold truncate group-hover:text-[#D4AF37] transition-colors">
                        {item.fullName}
                      </h3>
                    </div>
                    <p className="text-sm text-white/90 group-hover:text-white transition-colors">
                      PCR ID: {item.pcrId}
                    </p>
                  </div>
                </div>
              ))}

          {!isLoading && ambassadors.length === 0 && (
            <div className="col-span-full text-center text-white py-10">
              No ambassadors found.
            </div>
          )}
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          disabled={totalSlides <= 1}
          className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#D4AF37] hover:bg-[#e7bc2f] rounded-md flex items-center justify-center text-white z-10 border border-white/30 disabled:opacity-50"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Slider Indicator */}
      <div className="mt-12 flex items-center justify-center gap-2">
        {[...Array(totalSlides)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-3 h-3 rounded-full transition-all ${
              i + 1 === currentPage ? "bg-white scale-125" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PrestigeAmbassadors;
