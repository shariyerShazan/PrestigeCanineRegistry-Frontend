import { useGetHealthRequestsQuery } from "@/redux/features/health-request/healthRequest.api";
import RecentUpdateCard from "./RecentUpdateCard";
import { Loader2 } from "lucide-react";
import { useGetMyCertificateRequestsQuery } from "@/redux/features/certificate-request/certificate.req.api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OwnerRecentUpdate() {
  const { data: healthResponse, isLoading: isHealthLoading } =
    useGetHealthRequestsQuery(undefined);
  const { data: certResponse, isLoading: isCertLoading } =
    useGetMyCertificateRequestsQuery(undefined);

  if (isHealthLoading || isCertLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-2">
        <Loader2 className="animate-spin text-[#D4AF37]" size={40} />
        <p className="text-gray-500 font-medium">Loading updates...</p>
      </div>
    );
  }

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

  const certificateUpdates = (certResponse || []).map((item: any) => ({
    id: item.id,
    type: "certificate",
    dogName: item.canine?.name || item.litter?.pcrId || "Certificate Request",
    image: item.canine?.images?.[0]?.url || "/placeholder.svg",
    pcrId: item.canine?.pcrId || item.litter?.pcrId || "N/A",
    microchipId: item.canine?.microchipId || "N/A",
    submittedAt: item.createdAt
      ? new Date(item.createdAt).toLocaleDateString()
      : "N/A",
    status: item.status,
  }));

  return (
    <section className="space-y-6 py-6">
      <h2 className="text-2xl font-bold text-black">Recent Updates</h2>

      <Tabs defaultValue="certificates" className="w-full">
        <TabsList className="flex w-fit bg-gray-100 p-1 rounded-md mb-6">
          <TabsTrigger
            value="certificates"
            className="px-6 py-2 cursor-pointer rounded-sm data-[state=active]:bg-white data-[state=active]:text-[#D4AF37] data-[state=active]:shadow-sm font-semibold transition-all"
          >
            Certificate Requests
          </TabsTrigger>
          <TabsTrigger
            value="health"
            className="px-6 py-2 cursor-pointer rounded-sm data-[state=active]:bg-white data-[state=active]:text-[#00A63E] data-[state=active]:shadow-sm font-semibold transition-all"
          >
            Health Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-4 outline-none">
          <h3 className="text-base font-light text-gray-500 mb-2">
            Manage your dog's certificate status
          </h3>
          {certificateUpdates.length > 0 ? (
            certificateUpdates.map((item: any) => (
              <RecentUpdateCard key={item.id} data={item} variant="yellow" />
            ))
          ) : (
            <div className="p-12 border-2 border-dashed border-gray-100 rounded-3xl text-center bg-gray-50/50">
              <p className="text-gray-400">No certificate requests found.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="health" className="space-y-4 outline-none">
          <h3 className="text-base font-light text-gray-500 mb-2">
            Requests for health information from other users
          </h3>
          {healthUpdates.length > 0 ? (
            healthUpdates.map((item: any) => (
              <RecentUpdateCard key={item.id} data={item} variant="green" />
            ))
          ) : (
            <div className="p-12 border-2 border-dashed border-gray-100 rounded-3xl text-center bg-gray-50/50">
              <p className="text-gray-400">No health requests found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
