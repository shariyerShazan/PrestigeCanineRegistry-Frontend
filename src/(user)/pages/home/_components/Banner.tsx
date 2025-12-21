

import { Button } from "@/components/ui/button"
// import { BadgeCheck } from "lucide-react"
import banner from "@/assets/home/banner.jpg"
import frame from "@/assets/home/Frame.svg"
import BannerSearchBar from "./BannerSearchBar"
import shade from "@/assets/home/shade.svg"

const Banner = () => {


  return (
    <div className="relative min-h-[70vh]  mb-40 ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={banner} alt="Woman with dog" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#D4AF37] bg-[#2B4C8A] text-white px-4 py-2 rounded-full text-sm mb-6">
            <img src={frame} alt="" className="w-6 h-6"/>
            Verified by science. Trusted worldwide.
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
            The First DNA Verified Dog Registry
          </h1>

          {/* Subheading */}
          <p className="text-xl font-extralight text-white/90 mb-4">
            Register your dog with verified DNA & microchip data and receive your permanent PCR ID - the world's first
            digital proof of canine authenticity.
          </p>

          {/* Tagline */}
          <p className="text-lg text-white font-light mb-8">Because Paperwork Can Lie - DNA Doesn't.</p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button size="lg" className="bg-[#D4AF37] cursor-pointer hover:bg-yellow-600 text-black font-semibold">
              Become a Prestige Ambassador
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white cursor-pointer text-white hover:bg-white hover:text-black bg-transparent"
            > 
              Register Your Page
            </Button>
          </div>
         
        </div>

       <div className="flex justify-center">
         <div className="absolute -bottom-[30%] md:-bottom-[11%] left-1/2 transform -translate-x-1/2 w-full px-4 sm:px-6 md:px-0 max-w-5xl"> 

         <BannerSearchBar />
        </div>
       </div>

        {/* Side Badge - Charlie */}
        <div className="hidden lg:block absolute top-[30%] right-20">
          <div className="backdrop-blur-md border border-[#D4AF37] text-white  py-3 px-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-2 mb-1">
                   <img src={frame} alt="" className="w-6 h-6"/>
              <span className="font-semibold">Charlie</span>
            </div>
            <div className="text-xs text-[#D4AF37] opacity-90">Golden Retriever</div>
            <div className="text-xs opacity-90">PCR-LR-2024-009876</div>
          </div>
          <img src={shade} alt="" className=" absolute -left-6" />
        </div>
      </div>
    </div>
  )
}

export default Banner
