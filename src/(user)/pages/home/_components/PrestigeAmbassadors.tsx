import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PiCrown } from "react-icons/pi";
import ambassador1 from "@/assets/ambasedor/am1.png"
import ambassador2 from "@/assets/ambasedor/am2.png"
import ambassador3 from "@/assets/ambasedor/am3.png"
import ambassador4 from "@/assets/ambasedor/am4.png"

const ambassadors = [
  { id: 1, name: "Max Thunder", owner: "Jenny Wilson", image: ambassador1, verified: true },
  { id: 2, name: "Max Thunder", owner: "Jenny Wilson", image: ambassador2, verified: false },
  { id: 3, name: "Max Thunder", owner: "Dylan Hodges", image: ambassador3, verified: true },
  { id: 4, name: "Max Thunder", owner: "Brooklyn Simmons", image: ambassador4, verified: true },
  { id: 5, name: "Shadow Blaze", owner: "Mark Johnson", image: ambassador3, verified: true },
  { id: 6, name: "Ghost Fang", owner: "Laura Smith", image: ambassador2, verified: false },
  { id: 7, name: "Silver Bolt", owner: "Dylan Hodges", image: ambassador1, verified: true },
//   { id: 8, name: "Iron Claw", owner: "Brooklyn Simmons", image: ambassador4, verified: true },
];

const SLIDE_COUNT = 4; // Number of cards per slide

const PrestigeAmbassadors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = Math.ceil(ambassadors.length / SLIDE_COUNT);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Slice the data for current slide
  const currentAmbassadors = ambassadors.slice(
    currentIndex * SLIDE_COUNT,
    currentIndex * SLIDE_COUNT + SLIDE_COUNT
  );

  return (
    <div 
      className="w-full min-h-screen py-16 px-4 flex flex-col items-center justify-center"
      style={{ 
        background: "linear-gradient(180deg, #D4AF37 1%, #D4AF37 15%, #FFF5D3 36%, #5374B1 69%, #2B4C8A 100%)" 
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-12 pt-48 md:pt-0 ">
        <h1 className="text-4xl md:text-5xl font-semibold text-black mb-4 drop-shadow-md">
          Our Prestige Ambassadors
        </h1>
        <p className="text-lg md:text-xl text-black ">
          Real Canines, Real Verification, Real Trust
        </p>
      </div>

      {/* Slider Container */}
      <div className="max-w-7xl w-full relative px-12 flex items-center">

        {/* Left Button */}
        <button onClick={prevSlide} className="absolute cursor-pointer   left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#D4AF37] hover:bg-[#e7bc2f] rounded-md flex items-center justify-center text-white z-10 border border-white/30">
          <ChevronLeft size={22} />
        </button>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {currentAmbassadors.map((item) => (
            <div key={item.id} className="rounded-[24px] p-4 transform">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-left px-1">
                <div className="flex gap-2 items-center">
                  <PiCrown size={22} className="text-[#D4AF37]" />
                  <h3 className="text-lg text-white font-semibold">{item.name}</h3>
                </div>
                <p className="text-sm text-white">
                  {item.verified ? `Owner: ${item.owner}` : item.owner}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button onClick={nextSlide} className="absolute cursor-pointer  right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#D4AF37] hover:bg-[#e7bc2f] rounded-md flex items-center justify-center text-white z-10 border border-white/30">
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Slider Indicator */}
      <div className="mt-12 flex items-center justify-center gap-2">
        {[...Array(totalSlides)].map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i === currentIndex ? "bg-white" : "bg-white/30"}`}></div>
        ))}
      </div>
    </div>
  );
};

export default PrestigeAmbassadors;
