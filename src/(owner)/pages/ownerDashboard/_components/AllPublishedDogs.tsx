import { Button } from "@/components/ui/button"
import { dogsData } from "../data/dogsData"
import OwnerDogDetailsCard from "../../_components/OwnerDogDetailsCard"
import { useNavigate } from "react-router"



// interface AllPublishedDogsProps {
//   filter?: "all" | "gold" | "blue" | "pending" | "canceled" | "certificates" | "transferred"
// }

const AllPublishedDogs = ({ filter = "all" }: {filter? :string}) => {
  const filteredDogs = dogsData.filter((dog) => {
    if (filter === "all") return true
    if (filter === "gold") return dog.verifyType === "gold"
    if (filter === "blue") return dog.verifyType === "blue"
    if (filter === "pending") return dog.verifyType === "pending"
    return false // For canceled, certificates, transferred - no data yet
  })

  const navigate = useNavigate()

  return (
    <section className="pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDogs.length > 0 ? (
          filteredDogs.map((dog) => (
            <div key={dog.id} className="bg-white rounded-xl p-4 ">
              <OwnerDogDetailsCard {...dog} />
              <div className="flex gap-2 mt-">
                <Button
                  onClick={()=> navigate("/owner/dashboard/certificate/123")}
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-[#2B4C8A] border-[#2B4C8A] text-white hover:bg-[#2B4C8A]/5 text-xs  cursor-pointer"
                >
                  Request Certificate
                </Button>
                <Button onClick={()=> navigate("/owner/dashboard/transfer-owner")} variant="outline" size="sm" className="flex-1 border-[#2B4C8A] text-[#2B4C8A] hover:bg-[#2B4C8A] hover:text-white text-xs bg-transparent cursor-pointer">
                  Transfer Ownership
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">No dogs found for this category</div>
        )}
      </div>
    </section>
  )
}

export default AllPublishedDogs
