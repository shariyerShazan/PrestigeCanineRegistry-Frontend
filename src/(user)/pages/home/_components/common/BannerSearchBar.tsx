
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useGetAllBreedsQuery } from "@/redux/features/breed/breed.api"

const BannerSearchBar = () => {
  const [breedId, setBreedId] = useState("")
  const [tier, setTier] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate()
  const { data: breedsRes } = useGetAllBreedsQuery(undefined)
  const breeds = breedsRes || []

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.append("search", searchQuery)
    if (breedId && breedId !== "all") params.append("breedId", breedId)
    if (tier && tier !== "all") params.append("tier", tier)

    navigate(`/search-dogs?${params.toString()}`)
  }

  return (
    <div className="bg-[#3B5998] w-full py-3 px-4 md:px-6 rounded-lg shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4">
        <div className="flex flex-col md:flex-row md:col-span-3 items-stretch md:items-center gap-3 md:gap-6">
          {/* Breed Select */}
          <Select value={breedId} onValueChange={setBreedId}>
            <SelectTrigger className="focus:ring-0 border-0 text-[#D4AF37] [&>svg]:text-[#D4AF37] cursor-pointer w-full md:w-auto bg-transparent">
              <SelectValue placeholder="Breed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Breeds</SelectItem>
              {breeds.map((b: any) => (
                <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tier Select */}
          <Select value={tier} onValueChange={setTier}>
            <SelectTrigger className="focus:ring-0 border-0 text-[#D4AF37] [&>svg]:text-[#D4AF37] cursor-pointer w-full md:w-auto bg-transparent">
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="GOLD">Gold Verified</SelectItem>
              <SelectItem value="BLUE">Blue Verified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 md:col-span-2 w-full">
          <Input
            type="text"
            placeholder="Search by name or PCR id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border-0 flex-1 h-12 w-full"
          />
          <Button onClick={handleSearch} className="bg-[#D4AF37] hover:bg-yellow-600 text-black h-12 px-6 cursor-pointer">
            <Search className="w-4 h-4 mr-2" /> Search
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BannerSearchBar