

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Bell, Settings, Award, Clock, Ban } from "lucide-react"
import { LuDog } from "react-icons/lu"
import AllPublishedDogs from "./_components/AllPublishedDogs"
import ownerProfile from "@/assets/ownerDetails/profile.jpg"
import OwnerRecentUpdate from "./_components/OwnerRecentUpdate"

const stats = [
  { label: "Total Published", value: "03", bg: "bg-[#D4F5E9]", border: "border-[#24B57B]", text: "text-[#24B57B]", icon: <LuDog size={28} /> },
  { label: "Gold Verified", value: "02", bg: "bg-[#FEF3C7]", border: "border-[#FDC700]", text: "text-[#FDC700]", icon: <Award size={28}/> },
  { label: "Blue Verified", value: "01", bg: "bg-[#DBEAFE]", border: "border-[#2B4C8A]", text: "text-[#2B4C8A]", icon: <Award size={28}/> },
  { label: "Pending", value: "02", bg: "bg-[#F3F4F6]", border: "border-[#1C1C1C]", text: "text-[#1C1C1C]", icon: <Clock size={28}/> },
  { label: "Rejected", value: "01", bg: "bg-[#FEE2E2]", border: "border-[#D45637]", text: "text-[#D45637]", icon: <Ban size={28}/> },
]

const tabs = [
  { label: "All Published", value: "all" },
  { label: "Gold Verified", value: "gold" },
  { label: "Blue Verified", value: "blue" },
  { label: "Pending", value: "pending" },
  { label: "Canceled", value: "canceled" },
  { label: "Certificates", value: "certificates" },
  { label: "Transferred Ownership", value: "transferred" },
]

const tabTriggerClass =
  "rounded-none border-0 border-b-2 border-transparent px-4 pb-3 pt-0 font-medium text-gray-600 " +
  "data-[state=active]:border-b-[#2B4C8A] data-[state=active]:text-[#2B4C8A] data-[state=active]:bg-transparent"

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className=" min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div className="flex gap-4">
            <img src={ownerProfile} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h2 className="text-xl font-semibold">Welcome Sarah Johnson!</h2>
              <p className="text-sm text-gray-600">Manage your registered dogs and account</p>
            </div>
          </div>

          <div className="flex gap-2">
            {[Bell, Settings].map((Icon, i) => (
              <Button key={i} size="icon" variant="ghost" className="w-10 h-10 bg-black text-white hover:bg-gray-800 cursor-pointer hover:text-white">
                <Icon className="w-8 h-8" />
              </Button>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {stats.map(({ label, value, bg, border, text, icon }) => (
            <div key={label} className={`rounded-2xl border-1 p-5 flex justify-between ${bg} ${border}`}>
                              <div className={`${text} w-10 h-10`}>{icon}</div>
              <div className="flex flex-col justify-end items-end mb-2">
                <div className={`text-3xl font-bold ${text}`}>{value}</div>   
                   <p className="text-sm font-medium text-gray-700">{label}</p>
              </div>
           
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mb-6">
          <Button variant="outline" className="border-[#2B4C8A] text-[#2B4C8A] cursor-pointer">Transfer Ownership</Button>
          <Button className="bg-[#2B4C8A] text-white cursor-pointer">Register Litter</Button>
          <Button className="bg-[#D4AF37] text-black font-semibold cursor-pointer hover:text-white">Register New Dog ⊕</Button>
        </div>

        {/* TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="border-b border-gray-300 bg-transparent rounded-none mt-6 p-0">
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className={tabTriggerClass}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((t) => (
            <TabsContent key={t.value} value={t.value}>
              <AllPublishedDogs filter={t.value} />
            </TabsContent>
          ))}
        </Tabs>
       <div>
          <OwnerRecentUpdate />
       </div>
      </div>
     
    </div>
  )
}

export default OwnerDashboard
