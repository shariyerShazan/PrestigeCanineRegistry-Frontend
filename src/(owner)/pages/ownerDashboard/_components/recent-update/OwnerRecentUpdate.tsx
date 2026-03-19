
import { useGetHealthRequestsQuery } from "@/redux/features/health-request/healthRequest.api";
import RecentUpdateCard from "./RecentUpdateCard";
import { Loader2 } from "lucide-react";
import { useGetMyCertificateRequestsQuery } from "@/redux/features/certificate-request/certificate.req.api";

export default function OwnerRecentUpdate() {
  // 1. Fetch both Health and Certificate requests
  const {
    data: healthResponse,
    isLoading: isHealthLoading,
  } = useGetHealthRequestsQuery(undefined);

  const {
    data: certResponse,
    isLoading: isCertLoading,
  } = useGetMyCertificateRequestsQuery(undefined);

  // 2. Loading state (Wait for both)
  if (isHealthLoading || isCertLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-2">
        <Loader2 className="animate-spin text-[#D4AF37]" size={40} />
        <p className="text-gray-500 font-medium">Loading updates...</p>
      </div>
    );
  }

  // 3. Transform Health Requests
  const healthUpdates = (healthResponse || []).map((item: any) => ({
    id: item.id,
    type: "health",
    dogName: item.canine?.name || "Unknown Dog",
    image: item.canine?.images?.[0]?.url || "/placeholder.svg",
    pcrId: item.canine?.pcrId || "N/A",
    microchipId: item.canine?.microchipId || "N/A",
    submittedAt: item.createdAt
      ? new Date(item.createdAt).toLocaleDateString()
      : "N/A",
    status: item.status,
    requester: item.requester?.fullName,
  }));

  // 4. Transform Certificate Requests
  const certificateUpdates = (certResponse || []).map((item: any) => ({
    id: item.id,
    type: "certificate",
    dogName: item.canine?.name || item.litter?.pcrId || "Certificate Request",
    image: item.canine?.images?.[0]?.url || "/placeholder.svg", // Fallback for litter
    pcrId: item.canine?.pcrId || item.litter?.pcrId || "N/A",
    microchipId: item.canine?.microchipId || "N/A",
    submittedAt: item.createdAt
      ? new Date(item.createdAt).toLocaleDateString()
      : "N/A",
    status: item.status,
  }));

  return (
    <section className="space-y-8 py-6">
      <h2 className="text-2xl font-bold text-black">Recent Updates</h2>

      {/* Certificate Requests Section */}
      <div className="space-y-4">
        <h3 className="text-base font-light text-black">
          Request for certificate
        </h3>
        <div className="space-y-4">
          {certificateUpdates.length > 0 ? (
            certificateUpdates.map((item: any) => (
              <RecentUpdateCard key={item.id} data={item} variant="yellow" />
            ))
          ) : (
            <div className="p-8 border-2 border-dashed border-gray-100 rounded-2xl text-center">
              <p className="text-gray-400">No certificate requests found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Health Information Requests Section */}
      <div className="space-y-4">
        <h3 className="text-base font-light text-black">
          Health information requests
        </h3>
        <div className="space-y-4">
          {healthUpdates.length > 0 ? (
            healthUpdates.map((item: any) => (
              <RecentUpdateCard key={item.id} data={item} variant="green" />
            ))
          ) : (
            <div className="p-8 border-2 border-dashed border-gray-100 rounded-2xl text-center">
              <p className="text-gray-400">No health requests found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}