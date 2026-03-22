import { Card, CardContent } from "@/components/ui/card";
// import { MdOutlineWatchLater } from "react-icons/md";
// import { IoCheckmarkCircleOutline } from "react-icons/io5";
import {
  FiUser,
  FiShield,
  FiFlag,
  // FiUsers,
  FiFileText,
  FiBell,
} from "react-icons/fi";
import { LuDog } from "react-icons/lu";
import { format } from "date-fns";
import { useGetNotificationsQuery } from "@/redux/features/notification/notificationsApi";

const OverViewAdmin = () => {
  // 1. Fetching last 5 notifications
  const { data: notificationsData, isLoading } = useGetNotificationsQuery({
    limit: 5,
    page: 1,
  });

  const notifications = notificationsData?.data || [];

  // 2. ResourceType wise Icon Mapping
  const getCategoryStyles = (type: string) => {
    switch (type) {
      case "USER":
        return {
          icon: <FiUser className="text-green-500" />,
          bg: "bg-green-50",
        };
      case "CANINE":
        return {
          icon: <LuDog className="text-orange-400" />,
          bg: "bg-orange-50",
        };
      case "REPORT":
        return { icon: <FiFlag className="text-red-500" />, bg: "bg-red-50" };
      case "MEMBERSHIP":
        return {
          icon: <FiShield className="text-blue-500" />,
          bg: "bg-blue-50",
        };
      case "CERTIFICATE":
        return {
          icon: <FiFileText className="text-purple-500" />,
          bg: "bg-purple-50",
        };
      default:
        return {
          icon: <FiBell className="text-slate-400" />,
          bg: "bg-slate-50",
        };
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Stats Section (Static or you can connect to another API) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ... Stats mapping (ager motoi thakbe) ... */}
      </div>

      {/* Real-time Activity Section */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Recent Activity
            </h2>
            {isLoading && (
              <span className="text-xs text-slate-400">Updating...</span>
            )}
          </div>

          <div className="space-y-3">
            {notifications.length > 0 ? (
              notifications.map((item: any) => {
                const style = getCategoryStyles(item.category);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F9FAFB] border border-slate-100 animate-in fade-in duration-500"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-lg ${style.bg}`}>
                        {style.icon}
                      </div>
                      <div>
                        <p className="text-base">
                          <span className="font-bold text-[#2B4C8A]">
                            {item.title}
                          </span>{" "}
                          <span className="text-slate-600">{item.message}</span>
                        </p>
                        <p className="text-sm text-slate-400 mt-0.5">
                          Category: {item.resourceType || "General"}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-400 font-medium">
                      {item.createdAt
                        ? format(new Date(item.createdAt), "hh:mm:ss a")
                        : "Just now"}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 text-slate-400">
                No recent activity found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverViewAdmin;
