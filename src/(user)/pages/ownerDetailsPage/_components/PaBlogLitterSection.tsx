// import React from 'react';

const PaBlogLitterSection = ({ program }: { program: any }) => {
  if (!program?.blogLitters || program.blogLitters.length === 0) return null;

  return (
    <div className="py-12 w-full max-w-5xl mx-auto text-center">
      <div className="flex justify-between items-end mb-10 px-4">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
          View {program?.programName} Litters
        </h2>
        <a 
          href={`/pa-details/${program?.userId}/litters`}
          className="text-[#D4AF37] font-serif italic text-lg hover:underline transition-all"
        >
          View All →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {program.blogLitters.map((litter: any) => (
          <div key={litter.id} className="flex flex-col text-left">
            {/* Images Grid - 2 Images Side by Side */}
            <div className="flex gap-[2px] h-[320px] md:h-[400px] relative mb-4">
              {litter.isComing && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded absolute top-4 left-4 z-10 uppercase tracking-wide">
                  Coming Soon
                </span>
              )}
              <div className="flex-1 w-1/2">
                <img 
                  src={litter.images[0]?.url} 
                  className="w-full h-full object-cover" 
                  alt="Sire" 
                />
              </div>
              <div className="flex-1 w-1/2">
                <img 
                  src={litter.images[1]?.url} 
                  className="w-full h-full object-cover" 
                  alt="Dam" 
                />
              </div>
            </div>

            {/* Info Section - matching the design with serif font */}
            <div className="font-serif space-y-1.5 px-1 text-gray-900 mt-2">
              <p className="text-[16px]">
                Sire: {litter.sire?.name}
              </p>
              <p className="text-[16px]">
                Litter Size: {litter.litterSize}
              </p>
              <p className="text-[16px]">
                Dam: {litter.dam?.name}
              </p>
              
              <p className={`text-[14px] mt-4 font-normal capitalize ${
                litter.tier === 'GOLD' ? 'text-[#D4AF37]' : 'text-blue-500'
              }`}>
                {litter.tier?.toLowerCase()}: Doberman Pinschers
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaBlogLitterSection;
