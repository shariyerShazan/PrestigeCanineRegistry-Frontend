/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetHealthRequestsQuery } from "@/redux/features/health-request/healthRequest.api";
import RecentUpdateCard from "./RecentUpdateCard";
import { Loader2 } from "lucide-react";

export default function OwnerRecentUpdate() {
  // 1. Fetch data from API
  const {
    data: response,
    isLoading,
    isError,
  } = useGetHealthRequestsQuery(undefined);

  // 2. Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-2">
        <Loader2 className="animate-spin text-[#D4AF37]" size={40} />
        <p className="text-gray-500 font-medium">Loading updates...</p>
      </div>
    );
  }

  // 3. Error state
  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">
          Failed to load recent updates. Please try again.
        </p>
      </div>
    );
  }

  // 4. Transform API data to match RecentUpdateCard props
  const allData = response || [];
console.log(response)
  // Jehetu apnar response-e explicit 'type' nai, amra data structure dekhe filter korbo.
  // Health Requests filter (based on the presence of 'requester' and 'canine')
  const healthRequests = allData.map((item: any) => ({
    id: item.id,
    type: "health",
    dogName: item.canine?.name || "Unknown Dog",
    image: item.canine?.images?.[0].url || "/placeholder.svg",
    pcrId: item.canine?.pcrId || "N/A",
    microchip: item.canine?.microchipId || "N/A",
    submittedAt: item.createdAt
      ? new Date(item.createdAt).toLocaleDateString()
      : "N/A",
    status: item.status, // "PENDING", "APPROVED", etc.
    requester: item.requester?.fullName,
  }));

  // Note: Registration ebong Certificate er jonno jodi alada endpoint thake
  // tobe segulo ekhane filter logic-e add korte hobe.
  // Bartaman response onujayi shudhu health requests dekhano hochhe.
  const registrationUpdates = healthRequests.filter(
    (item: any) => item.type === "registration",
  );
  const certificateUpdates = healthRequests.filter(
    (item: any) => item.type === "certificate",
  );
  const healthUpdates = healthRequests.filter(
    (item: any) => item.type === "health",
  );

  return (
    <section className="space-y-8 py-6">
      <h2 className="text-2xl font-bold text-black">Recent Updates</h2>

      {/* New Registration Section */}
      {registrationUpdates.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-light text-black">New Registration</h3>
          <div className="space-y-4">
            {registrationUpdates.map((item: any) => (
              <RecentUpdateCard key={item.id} data={item} variant="gray" />
            ))}
          </div>
        </div>
      )}

      {/* Certificate Requests Section */}
      {certificateUpdates.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-light text-black">
            Request for certificate
          </h3>
          <div className="space-y-4">
            {certificateUpdates.map((item: any) => (
              <RecentUpdateCard key={item.id} data={item} variant="yellow" />
            ))}
          </div>
        </div>
      )}

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
