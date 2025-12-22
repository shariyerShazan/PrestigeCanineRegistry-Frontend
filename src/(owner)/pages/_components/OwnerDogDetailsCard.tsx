import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MdVerifiedUser } from "react-icons/md"

interface DogDetailsCardProps {
  id: string
  name: string
  breed: string
  pcrId: string
  imageUrl: string
  ownerName: string
  ownerAvatar?: string
  verifyType?: string 
}

const OwnerDogDetailsCard = ({
  name,
  breed,
  pcrId,
  imageUrl,
//   ownerName,
//   ownerAvatar,
  verifyType,
}: DogDetailsCardProps) => {

  const badgeColor =
    verifyType === "gold"
      ? "bg-white text-gray-800"
      : verifyType === "blue"
      ? "bg-white text-[#2B4C8A]"
      : "hidden"

  const iconColor = verifyType === "gold" ? "#D4AF37" : "#2B4C8A" 
  const textColor = verifyType === "gold" ? "text-[#D4AF37]" : verifyType === "blue" ? "text-[#2B4C8A]" : "text-gray-600"

  const badgeText =
    verifyType === "gold"
      ? "Gold Verified"
      : verifyType === "blue"
      ? "Blue Verified"
      : ""

  return (
    <div className="bg-white rounded-lg overflow-hidden ">
      <div className="relative aspect-[4/3] h-[60%] w-full">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="object-cover rounded-md h-full w-full"
        />

        {verifyType && (
          <Badge
            className={`
              absolute top-3 left-3
              border-none shadow-sm
              hover:bg-white
              h-9 px-3
              flex items-center gap-2
              ${badgeColor}
            `}
          >
            <span className="flex-none">
              <MdVerifiedUser className={`text-[${iconColor}]`} style={{ width: 22, height: 22 }} />
            </span>
            <span className="text-sm font-medium">{badgeText}</span>
          </Badge>
        )}
      </div>

      <div className="py-4">
        <div className="mb-3">
          <h3 className="font-semibold text-xl text-gray-900 mb-2">Name: {name}</h3>
          <p className={`text-md font-medium mb-1 ${textColor}`}>{breed}</p>
          <p className="text-md text-gray-600">PRC ID: {pcrId}</p>
        </div>

        {/* <div className="flex items-center gap-2 mt-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={ownerAvatar || "/placeholder.svg"} alt={ownerName} className=" object-cover"/>
            <AvatarFallback className="text-xs bg-gray-200">
              {ownerName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className={`text-md font-semibold `}>{ownerName}</span>
        </div> */}
      </div>
    </div>
  )
}

export default OwnerDogDetailsCard

