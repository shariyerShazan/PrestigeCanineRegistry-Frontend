
import { Card, CardContent } from "@/components/ui/card";
// import { HiOutlineUsers } from "react-icons/hi2";
// import { PiDogLight } from "react-icons/pi";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FiUser, FiShield, FiFlag, FiUsers } from "react-icons/fi";
import { LuDog } from "react-icons/lu";

const stats = [
  {
    label: "Total Users",
    value: "5",
    subtext: "5 active users",
    icon: <FiUsers className="text-[#2B4C8A] size-6" />,
    bgColor: "bg-[#2B4C8A]/10",
  },
  {
    label: "Registered Dogs",
    value: "6",
    subtext: "4 gold, 2 blue",
    icon: <LuDog className="text-[#E17100] size-6" />,
    bgColor: "bg-[#E17100]/10",
  },
  {
    label: "Pending Requests",
    value: "2",
    subtext: "Requires action",
    icon: <MdOutlineWatchLater className="text-[#F54900] size-6" />,
    bgColor: "bg-[#F54900]/10",
  },
  {
    label: "Approved Today",
    value: "1",
    subtext: "Last 24 hours",
    icon: <IoCheckmarkCircleOutline className="text-[#00A63E] size-6" />,
    bgColor: "bg-[#00A63E]/10",
  },
];

const activities = [
  {
    user: "Michael Chen",
    action: "submitted Verification Request",
    target: "PCR-ID-1421144",
    subAction: "New dog registration",
    time: "9:45:00 AM",
    icon: <FiUser className="text-orange-400" />,
    iconBg: "bg-orange-50"
  },
  {
    user: "Admin User",
    action: "approved Verification Request",
    target: "PCR-ID-1421144",
    subAction: "Approved DNA retest for Rocky",
    time: "9:45:00 AM",
    icon: <FiShield className="text-blue-500" />,
    iconBg: "bg-blue-50"
  },
  {
    user: "Hossain",
    action: "has been registered as a prestige ambassador",
    target: "",
    subAction: "New user registration",
    time: "9:45:00 AM",
    icon: <FiUser className="text-green-500" />,
    iconBg: "bg-green-50"
  },
  {
    user: "Sabbir",
    action: "has been reported an abuse case against dog",
    target: "PCR-ID-1421144",
    subAction: "Report flagged",
    time: "9:45:00 AM",
    icon: <FiFlag className="text-orange-600" />,
    iconBg: "bg-orange-50"
  },
];

const OverViewAdmin = () => {
  return (
    <div className="p-6 space-y-6  min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  {stat.icon}
                </div>
                <span className="text-3xl font-bold text-slate-800">{stat.value}</span>
              </div>
              <div className="mt-4">
                <p className="text-base font-medium text-slate-500">{stat.label}</p>
                <p className="text-sm text-slate-400 mt-1">{stat.subtext}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Recent Activity</h2>
          <div className="space-y-3">
            {activities.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-3 rounded-xl bg-[#F9FAFB] border border-slate-100"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg ${item.iconBg}`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-base">
                      <span className="font-bold text-[#2B4C8A]">{item.user}</span>{" "}
                      <span className="text-slate-600">{item.action}</span>{" "}
                      <span className="font-medium text-slate-800">{item.target}</span>
                    </p>
                    <p className="text-sm text-slate-400 mt-0.5">{item.subAction}</p>
                  </div>
                </div>
                <span className="text-sm text-slate-400 font-medium">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverViewAdmin;