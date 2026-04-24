import { Badge } from "@/components/ui/badge";
import { MdVerifiedUser } from "react-icons/md";
import { useNavigate } from "react-router";

interface DogDetailsCardProps {
  id: string;
  name: string;
  breed: string;
  pcrId: string;
  imageUrl: string;
  verifyType?: string;
  status?: string
}

export const OwnerDogDetailsCard = ({
  id,
  name,
  breed,
  pcrId,
  imageUrl,
  verifyType,
  status,
}: DogDetailsCardProps) => {
  const navigate = useNavigate();

  const isGold = verifyType === "gold";
  const isBlue = verifyType === "blue";

  const badgeColor = isGold
    ? "bg-white text-[#D4AF37]"
    : "bg-white text-[#2B4C8A]";
  const iconColor = isGold ? "#D4AF37" : "#2B4C8A";
  const textColor = isGold
    ? "text-[#D4AF37]"
    : isBlue
      ? "text-[#2B4C8A]"
      : "text-gray-600";
  const badgeText = isGold ? "Gold Tier" : isBlue ? "Blue Tier" : "";
  const verifyText = status === "APPROVED" ? "" :  ""

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="relative aspect-[4/3] group w-full">
        <img
          onClick={() => navigate(`/owner/dashboard/dog-preview/${id}`)}
          src={imageUrl || "/placeholder-dog.png"}
          alt={name}
          className="object-cover rounded-md h-full w-full group-hover:scale-105 duration-500 transition-all cursor-pointer"
        />

        {(isGold || isBlue) && (
          <Badge
            className={`
              absolute top-3 left-3
              border-none shadow-md
              hover:bg-white
              h-9 px-3
              flex items-center gap-2
              ${badgeColor}
            `}
          >
            {status === "APPROVED" && (
              <MdVerifiedUser
                style={{ color: iconColor, width: 22, height: 22 }}
              />
            )}

            <span className="text-sm font-medium">
              {badgeText + " "+ verifyText}
            </span>
          </Badge>
        )}
      </div>

      <div className="py-4">
        <div className="mb-1">
          <h3 className="font-semibold amiri-font text-xl text-gray-900 mb-1">
            Name: {name}
          </h3>
          <p className={`text-md font-medium mb-1 ${textColor}`}>Origin: {breed}</p>
          <p className="text-md text-gray-600 font-mono">PCR ID: {pcrId}</p>
        </div>
      </div>
    </div>
  );
};
