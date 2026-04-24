import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdVerifiedUser } from "react-icons/md";
import { useNavigate } from "react-router";

interface DogDetailsCardProps {
  id: string;
  name: string;
  breed: string;
  pcrId: string;
  imageUrl: string;
  ownerName: string;
  ownerAvatar?: string;
  verifyType?: string;
  status?: string;
  ownerId: string
}

const DogDetailsCard = ({
  id,
  name,
  breed,
  pcrId,
  imageUrl,
  ownerName,
  ownerAvatar,
  verifyType,
  status,
  ownerId,
}: DogDetailsCardProps) => {
  const navigate = useNavigate();

  const tier = verifyType?.toLowerCase();
  const isGold = tier === "gold";
  const isBlue = tier === "blue";
  const isApproved = status === "APPROVED";

  const badgeColor = isGold
    ? "bg-white text-[#D4AF37]"
    : "bg-white text-[#2B4C8A]";

  const iconColor = isGold ? "#D4AF37" : "#2B4C8A";
  const textColor = isGold
    ? "text-[#D4AF37]"
    : isBlue
      ? "text-[#2B4C8A]"
      : "text-gray-600";

  const badgeText = `${isGold ? "Gold Tier" : isBlue ? "Blue Tier" : ""} ${isApproved ? "" : ""}`;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="bg-white group rounded-lg overflow-hidden">
        <div className="relative aspect-[4/3] w-full">
          <img
            onClick={() => navigate(`/dogs/${id}`)}
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            className="object-cover cursor-pointer transition-all duration-500 rounded-md h-full w-full group-hover:scale-105"
          />

          {(isGold || isBlue) && (
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
              {isApproved && (
                <MdVerifiedUser
                  style={{ color: iconColor, width: 22, height: 22 }}
                  className="flex-none"
                />
              )}
              <span className="text-sm font-medium">{badgeText.trim()}</span>
            </Badge>
          )}
        </div>

        <div className="py-4">
          <div className="mb-3">
            <h3 className="font-semibold text-xl amiri-font text-gray-900 mb-1">
              Name: {name}
            </h3>
            <p className={`text-md font-medium mb-1 ${textColor}`}>Origin: {breed}</p>
            <p className="text-md text-gray-600 font-mono">PCR ID: {pcrId}</p>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Avatar
              onClick={() => navigate(`/owner-details/${id}`)}
              className="h-8 w-8 cursor-pointer hover:scale-110 transition-transform"
            >
              <AvatarImage
                src={ownerAvatar || "/placeholder.svg"}
                alt={ownerName}
              />
              <AvatarFallback className="text-xs bg-gray-200">
                {ownerName?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span
              onClick={() => navigate(`/owner-details/${ownerId}`)}
              className="text-md font-semibold cursor-pointer hover:underline text-gray-800"
            >
              {ownerName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogDetailsCard;
