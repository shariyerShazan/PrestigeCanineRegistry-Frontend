
import dog1 from "@/assets/home/allDogs/dog1.png"
import dog2 from "@/assets/home/allDogs/dog2.png"
import dog3 from "@/assets/home/allDogs/dog3.png"
import DogDetailsCard from "../../home/_components/common/DogDetailsCard"
import owner from "@/assets/gogDetails/owner.jpg"

const dogsData = [
  {
    id: "1",
    name: "Bella Daisy",
    breed: "Origin:Golden Retriever",
    pcrId: "#PCR-LR-009876",
    imageUrl: dog1,
    ownerName: "Sarah Johnson",
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
    ownerName: "Sarah Johnson",
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
    ownerName: "Sarah Johnson",
    ownerAvatar: owner,
    isGoldVerified: true,
        verifyType: "gold"
  },
]

const ViewMoreOfThiOwner = () => {
  return (
    <section className="py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center my-8 text-gray-900 ">View More of This Owner</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogsData.map((dog) => (
            <DogDetailsCard key={dog.id} {...dog} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ViewMoreOfThiOwner
