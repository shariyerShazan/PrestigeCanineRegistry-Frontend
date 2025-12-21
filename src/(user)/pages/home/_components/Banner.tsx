

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BadgeCheck, Search } from "lucide-react"
import banner from "@/assets/home/banner.jpg"

const Banner = () => {
  const [breed, setBreed] = useState("")
  const [tier, setTier] = useState("")
  const [region, setRegion] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={banner} alt="Woman with dog" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm mb-6">
            <BadgeCheck className="w-4 h-4" />
            Verified by science. Trusted worldwide.
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The First DNA Verified Dog Registry
          </h1>

          {/* Subheading */}
          <p className="text-xl text-white/90 mb-4">
            Register your dog with verified DNA & microchip data and receive your permanent PCR ID - the world's first
            digital proof of canine authenticity.
          </p>

          {/* Tagline */}
          <p className="text-lg text-white font-semibold mb-8">Because Paperwork Can Lie - DNA Doesn't.</p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Become a Prestige Ambassador
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              Register Your Page
            </Button>
          </div>

          {/* Search Bar */}
          <div className="bg-[#3B5998] p-6 rounded-lg shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Breed Select */}
              <Select value={breed} onValueChange={setBreed}>
                <SelectTrigger className="bg-[#2d4373] border-0 text-white">
                  <SelectValue placeholder="Breed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="golden-retriever">Golden Retriever</SelectItem>
                  <SelectItem value="labrador">Labrador</SelectItem>
                  <SelectItem value="german-shepherd">German Shepherd</SelectItem>
                </SelectContent>
              </Select>

              {/* Tier Select */}
              <Select value={tier} onValueChange={setTier}>
                <SelectTrigger className="bg-[#2d4373] border-0 text-white">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gold-verified">Gold Verified</SelectItem>
                  <SelectItem value="silver-verified">Silver Verified</SelectItem>
                  <SelectItem value="bronze-verified">Bronze Verified</SelectItem>
                </SelectContent>
              </Select>

              {/* Region Select */}
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="bg-[#2d4373] border-0 text-white">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="florida">Florida</SelectItem>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="texas">Texas</SelectItem>
                </SelectContent>
              </Select>

              {/* Search Input */}
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search by name, PCR id, or Breed"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border-0 flex-1"
                />
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Side Badge - Charlie */}
        <div className="hidden lg:block absolute top-32 right-20">
          <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2 mb-1">
              <BadgeCheck className="w-4 h-4" />
              <span className="font-semibold">Charlie</span>
            </div>
            <div className="text-xs opacity-90">Golden Retriever</div>
            <div className="text-xs opacity-90">Bred by Charlie</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
