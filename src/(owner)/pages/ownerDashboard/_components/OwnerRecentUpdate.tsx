import { recentUpdates } from "../data/ownerRecentUpdates";
import RecentUpdateCard from "./RecentUpdateCard";



export default function OwnerRecentUpdate() {
  return (
    <section className=" space-y-8 py-6">
      <h2 className="text-2xl font-bold text-black">Recent Updates</h2>

      {/* New Registration */}
      <div className="space-y-4">
        <h3 className="text-base font-light text-black">New Registration</h3>
        <div className="space-y-4">
          {recentUpdates.registration.map((item) => (
            <RecentUpdateCard key={item.id} data={item} variant="gray" />
          ))}
        </div>
      </div>

      {/* Certificate */}
      <div className="space-y-4">
        <h3 className="text-base font-light text-black">Request for certificate</h3>
        <div className="space-y-4">
          {recentUpdates.certificate.map((item) => (
            <RecentUpdateCard key={item.id} data={item} variant="yellow" />
          ))}
        </div>
      </div>

      {/* Health */}
      <div className="space-y-4">
        <h3 className="text-base font-light text-black">Health information requests</h3>
        <div className="space-y-4">
          {recentUpdates.health.map((item) => (
            <RecentUpdateCard key={item.id} data={item} variant="green" />
          ))}
        </div>
      </div>
    </section>
  )
}
