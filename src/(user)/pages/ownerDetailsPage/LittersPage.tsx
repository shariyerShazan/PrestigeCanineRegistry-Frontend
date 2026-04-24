import { useState } from 'react';
import { useParams
  // , useNavigate
 } from 'react-router';
import { useGetPaginatedLittersQuery } from "@/redux/features/blog/breederProgramApi";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LittersPage = () => {
  const { ownerId } = useParams();
  // const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6; // Matching the image's layout (2 columns, 3 rows)

  const { data: response, isLoading, isFetching } = useGetPaginatedLittersQuery(
    { userId: ownerId as string, page: currentPage, limit },
    { skip: !ownerId }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-40 w-full min-h-screen">
        <Loader2 className="animate-spin text-gray-400" size={48} />
      </div>
    );
  }

  const { program, litters, totalPages } = response || { program: {}, litters: [], totalCount: 0, totalPages: 0 };

  const pastLitters = litters?.filter((l: any) => !l.isComing) || [];
  const upcomingLitters = litters?.filter((l: any) => l.isComing) || [];

  return (
    <div className="w-full bg-white font-serif min-h-screen pb-20 pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-widest uppercase">
            {program?.programName} LITTERS
          </h1>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-[17px] md:text-[18px] text-gray-700 leading-relaxed italic whitespace-pre-wrap">
              {program?.litterIntro || `At ${program?.programName || 'our kennel'}, each litter is the result of carefully selected pairings focused on structure, temperament, and long-term consistency.\n\nOur program prioritizes quality over quantity, with every breeding planned to preserve the integrity of the breed while producing stable, well-balanced companions.\n\nAll pairings are thoughtfully evaluated to ensure strong lineage alignment, predictable traits, and responsible breeding standards.`}
            </p>
          </div>
        </div>

        {/* Past Litters Section */}
        {pastLitters.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
              View Our Past Litters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {pastLitters.map((litter: any) => (
                <LitterCard key={litter.id} litter={litter} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Litters Section */}
        {upcomingLitters.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
              View Upcoming Litters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {upcomingLitters.map((litter: any) => (
                <LitterCard key={litter.id} litter={litter} />
              ))}
            </div>
          </div>
        )}

        {/* Pagination - Matching the design in the image */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <Button
              variant="outline"
              size="icon"
              className="rounded-md w-10 h-10 border-gray-200 bg-gray-100 hover:bg-gray-200"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1 || isFetching}
            >
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </Button>
            
            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx + 1}
                variant="ghost"
                className={`w-10 h-10 rounded-md text-[16px] font-medium ${
                  currentPage === idx + 1 
                  ? 'bg-[#D4AF37] text-white hover:bg-[#B8962E]' 
                  : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentPage(idx + 1)}
                disabled={isFetching}
              >
                {idx + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              className="rounded-md w-10 h-10 border-gray-200 bg-[#D4AF37] hover:bg-[#B8962E]"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages || isFetching}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const LitterCard = ({ litter }: { litter: any }) => {
  return (
    <div className="flex flex-col text-left group transition-all duration-300">
      {/* Images Grid - 2 Images Side by Side */}
      <div className="flex gap-[2px] h-[320px] md:h-[380px] relative mb-4 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
        <div className="flex-1 w-1/2 overflow-hidden">
          <img 
            src={litter.images[0]?.url} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            alt="Sire" 
          />
        </div>
        <div className="flex-1 w-1/2 overflow-hidden">
          <img 
            src={litter.images[1]?.url} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            alt="Dam" 
          />
        </div>
      </div>

      {/* Info Section - matching the design from the image */}
      <div className="font-serif space-y-1.5 px-1 text-gray-900 mt-2">
        <p className="text-[17px]">
          Sire: {litter.sire?.name}
        </p>
        <p className="text-[17px]">
          Litter Size: {litter.litterSize}
        </p>
        <p className="text-[17px]">
          Dam: {litter.dam?.name}
        </p>
        
        <p className={`text-[15px] mt-4 font-normal capitalize tracking-wide ${
          litter.tier === 'GOLD' ? 'text-[#D4AF37]' : 'text-blue-500'
        }`}>
          {litter.tier?.toLowerCase()}: Doberman Pinschers
        </p>
      </div>
    </div>
  );
};

export default LittersPage;
