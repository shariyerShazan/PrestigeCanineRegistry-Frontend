
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import DogDetailsCard from "./common/DogDetailsCard"
import dog1 from "@/assets/home/allDogs/dog1.png"
import dog2 from "@/assets/home/allDogs/dog2.png"
import dog3 from "@/assets/home/allDogs/dog3.png"
import owner from "@/assets/home/allDogs/owner.jpg"
import owner2 from "@/assets/home/allDogs/owner2.jpg"

const dogsData = [
  {
    id: "1",
    name: "Bella Daisy",
    breed: "Origin:Golden Retriever",
    pcrId: "#PCR-LR-009876",
    imageUrl: dog1,
    ownerName: "Iris Barrows",
    ownerAvatar: owner,
    isGoldVerified: true,
        verifyType: "gold"
  },
  {
    id: "2",
    name: "Charlie",
    breed: "Origin:French Bulldog",
    pcrId: "#PCR-LR-2024-009876",
    imageUrl: dog2,
    ownerName: "Dylan Hodges",
    ownerAvatar: owner,
    isGoldVerified: true,
        verifyType: "blue"
  },
  {
    id: "3",
    name: "Luna Cooper",
    breed: "Origin:German Shepherd",
    pcrId: "#PCR-LR-2024-009876",
    imageUrl: dog3,
    ownerName: "Madonna",
    ownerAvatar: owner2,
    isGoldVerified: true,
        verifyType: "gold"
  },
]

const AllDogs = () => {
  return (
    <section className="py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Real dogs, real verification, real trust</h2>
            <p className="text-gray-600">See registered dogs with verified DNA and microchip data</p>
          </div>
          <Button variant="outline" className="bg-white hover:bg-gray-50 cursor-pointer border border-[#2B4C8A] h-12 w-32">
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogsData.map((dog) => (
            <DogDetailsCard key={dog.id} {...dog} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AllDogs
