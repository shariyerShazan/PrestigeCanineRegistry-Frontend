import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@radix-ui/react-label"
import { Search } from "lucide-react"
import { useState } from "react"

const BannerSearchBar = () => {
      const [breed, setBreed] = useState("")
  const [tier, setTier] = useState("")
  const [region, setRegion] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div>
      <div className="bg-[#3B5998] w-full py-3 px-4 md:px-6 rounded-lg shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4">
          <div className="flex flex-col md:flex-row md:col-span-3 items-stretch md:items-center gap-3 md:gap-6">
            {/* Breed Select */}
            <div className="flex flex-col justify-center w-full md:w-auto">
              <Select value={breed} onValueChange={setBreed}>
                <SelectTrigger className="focus:ring-0! border-0 text-[#D4AF37]! [&>svg]:text-[#D4AF37]! cursor-pointer w-full md:w-auto">
                  <SelectValue placeholder="Breed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="golden-retriever">Golden Retriever</SelectItem>
                  <SelectItem value="labrador">Labrador</SelectItem>
                  <SelectItem value="german-shepherd">German Shepherd</SelectItem>
                </SelectContent>
              </Select>
              <Label className="text-sm text-white mt-1 pl-3">{breed}</Label>
            </div>

            {/* Tier Select */}
            <div className="flex flex-col justify-center w-full md:w-auto">
              <Select value={tier} onValueChange={setTier}>
                <SelectTrigger className="focus:ring-0! border-0 text-[#D4AF37]! [&>svg]:text-[#D4AF37]! cursor-pointer w-full md:w-auto">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gold-verified">Gold Verified</SelectItem>
                  <SelectItem value="silver-verified">Silver Verified</SelectItem>
                  <SelectItem value="bronze-verified">Bronze Verified</SelectItem>
                </SelectContent>
              </Select>
              <Label className="text-sm text-white mt-1 pl-3">{tier}</Label>
            </div>

            {/* Region Select */}
            <div className="flex flex-col justify-center w-full md:w-auto">
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="focus:ring-0! border-0 text-[#D4AF37]! [&>svg]:text-[#D4AF37]! cursor-pointer w-full md:w-auto">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="florida">Florida</SelectItem>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="texas">Texas</SelectItem>
                </SelectContent>
              </Select>
              <Label className="text-sm text-white mt-1 pl-3">{region}</Label>
            </div>
          </div>

          <div className="flex items-center gap-2 md:col-span-2 w-full">
            <Input
              type="text"
              placeholder="Search by name, PCR id, or Breed"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border-0 flex-1 placeholder:text-gray-400 h-12 focus:ring-1! w-full"
            />
            <Button className="bg-[#D4AF37] cursor-pointer hover:bg-yellow-600 text-black h-12 w-32 flex items-center justify-center">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerSearchBar