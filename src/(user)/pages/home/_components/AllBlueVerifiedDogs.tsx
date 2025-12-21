
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import DogDetailsCard from "./common/DogDetailsCard"
import dog1 from "@/assets/home/allblueDog/dog1.jpg"
import dog2 from "@/assets/home/allblueDog/dog2.jpg"
import dog3 from "@/assets/home/allblueDog/dog3.jpg"

import owner from "@/assets/home/allDogs/owner.jpg"
import owner2 from "@/assets/home/allDogs/owner2.jpg"


const blueVerifiedDogsData = [
  {
    id: "1", 
    name: "Max Thunder",
    breed: "Origin:German Shepherd",
    pcrId: "#PCR-LR-2024-009876",
    imageUrl: dog1,
    ownerName: "Dylan Hodges",
    ownerAvatar: owner,
    verifyType: "blue"
  },
  {
    id: "2",
    name: "Bella Daisy",
    breed: "Origin:blueen Retriever",
    pcrId: "#PCR-LR-009876",
    imageUrl: dog2,
    ownerName: "Iris Barrows",
    ownerAvatar: owner2,
      verifyType: "blue"
  },
  {
    id: "3",
    name: "Tina",
    breed: "Origin:Poodle",
    pcrId: "#PCR-LR-2024-009876",
    imageUrl: dog3,
    ownerName: "Madonna",
    ownerAvatar:owner,
      verifyType: "blue"
  },
  {
    id: "4",
    name: "Rocky",
    breed: "Origin:Rottweiler",
    pcrId: "#PCR-LR-2024-009877",
    imageUrl: dog1,
    ownerName: "John Smith",
    ownerAvatar: owner2,
      verifyType: "blue"
  },
  {
    id: "5",
    name: "Sophie",
    breed: "Origin:Labrador",
    pcrId: "#PCR-LR-2024-009878",
    imageUrl: dog3,
    ownerName: "Emma Wilson",
    ownerAvatar: owner,
      verifyType: "blue"
  },
  {
    id: "6",
    name: "Duke",
    breed: "Origin:Beagle",
    pcrId: "#PCR-LR-2024-009879",
    imageUrl: dog2,
    ownerName: "Michael Brown",
    ownerAvatar: owner2,
      verifyType: "blue"
  },
]

const AllBlueVerifiedDogs = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const dogsPerPage = 3
  const totalPages = Math.ceil(blueVerifiedDogsData.length / dogsPerPage)

  const currentDogs = blueVerifiedDogsData.slice(currentPage * dogsPerPage, (currentPage + 1) * dogsPerPage)

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">All Blue Verified</h2>
            <p className="text-gray-600">Standard verified dogs</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="bg-[#D4AF37] hover:bg-[#C4A137] text-white border-none cursor-pointer" 
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentDogs.map((dog) => (
            <DogDetailsCard key={dog.id} {...dog} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AllBlueVerifiedDogs
