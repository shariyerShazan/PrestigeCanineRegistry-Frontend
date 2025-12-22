import { Button } from "@/components/ui/button"
import { Download
    // , Info
 } from "lucide-react"
import { PiClockCountdownLight } from "react-icons/pi"


type RecentUpdate = {
  id: string
  type: "registration" | "certificate" | "health"
  dogName: string
  image: string
  pcrId: string
  microchip: string
  submittedAt: string
  status?: "pending" | "approved"
  requester?: string
}

type Props = {
  data: RecentUpdate
  variant: "gray" | "yellow" | "green"
}

export default function RecentUpdateCard({ data, variant }: Props) {
  const variantStyles = {
    gray: "bg-[#E2E2E2] border-[#E2E2E2]",
    yellow: "bg-[#FEF9E7] border-[#D4AF37]",
    green: "bg-[#E8F5ED] border-[#00A63E]",
  }

  return (
    <div className={`rounded-2xl w-full p-5 border-1 ${variantStyles[variant]}`}>
      <div className="flex gap-4">
        {/* Dog Image */}
        <div className="flex-shrink-0">
          <div className="w-[170px] h-[170px] rounded-xl overflow-hidden">
            <img
              src={data.image || "/placeholder.svg"}
              alt={data.dogName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header with Name and Status */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-lg font-semibold text-black">{data.dogName}</h4>
              <p className="text-sm text-gray-600">
                {data.type === "registration"
                  ? "New Registration"
                  : data.type === "certificate"
                    ? "Certificate request"
                    : "Information request"}
              </p>
            </div>

            {/* Status Badge */}
            {data.status === "pending" && (
              <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1 border border-gray-200">
                {/* <div className="w-2 h-2 rounded-full bg-gray-400" /> */}
                <PiClockCountdownLight />
                <span className="text-sm font-medium text-gray-700">  
                    Pending</span>
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">PCR ID:</p>
              <p className="text-sm font-semibold text-black">{data.pcrId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Microchip</p>
              <p className="text-sm font-semibold text-black">{data.microchip}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Submitted</p>
              <p className="text-sm font-semibold text-black">{data.submittedAt}</p>
            </div>
          </div>

          {/* Info Messages */}
          {data.type === "registration" && (
            <div className="flex items-start gap-2 bg-[#DBEAFE] rounded-lg p-3 mb-3">
              {/* <Info className="w-4 h-4 text-[#3B82F6] mt-0.5 flex-shrink-0" /> */}
              <p className="text-sm text-gray-700">
                ⏳Your registration is being reviewed. You'll be notified once it's processed.
              </p>
            </div>
          )}

          {data.type === "certificate" && (
            <div className="flex items-start gap-2 bg-[#F3F4F6] rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-700">
                Your request for the PCR certificate has been approved. Download the certificate for further uses.
              </p>
            </div>
          )}

          {data.type === "health" && data.requester && (
            <div className="mb-3 bg-[#DBEAFE] rounded-lg p-3">
              <p className="text-sm text-gray-700">
                An user <span className="font-semibold text-blue-600 underline">{data.requester}</span> requested for
                the health information of your dogs.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {data.type === "certificate" && (
            <Button className="bg-[#D4AF37] hover:bg-[#C19B28] text-black font-semibold rounded-lg h-10 px-4 flex items-center gap-2 cursor-pointer">
              <span>Download Certificate</span>
              <Download className="w-4 h-4" />
            </Button>
          )}

          {data.type === "health" && (
            <div className="flex gap-2">
              <Button className="bg-[#00A63E] hover:bg-[#047857] text-white font-medium rounded-lg h-10 px-6 cursor-pointer">
                Approve
              </Button>
              <Button className="bg-[#E7000B] hover:bg-[#B91C1C] text-white font-medium rounded-lg h-10 px-6 cursor-pointer">
                Decline
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
