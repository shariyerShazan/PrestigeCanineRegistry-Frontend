import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { FiUsers, FiActivity, FiAlertCircle } from "react-icons/fi";
import { LuDog } from "react-icons/lu";
import { useGetAdminStatsQuery } from "@/redux/features/notification/notificationsApi";

const AdminStats = () => {
  const { data: stats, isLoading } = useGetAdminStatsQuery(undefined, {
    pollingInterval: 30000,
  });

  if (isLoading)
    return (
      <div className="p-10 text-center font-medium text-slate-500 italic">
        Syncing dashboard statistics...
      </div>
    );

  const statCards = [
    {
      title: "Total Users",
      value: stats?.users?.total || 0,
      description: `${stats?.users?.active || 0} Active, ${stats?.users?.unverified || 0} Unverified`,
      icon: <FiUsers className="size-5 text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      title: "Total Canines",
      value: stats?.canines?.total || 0,
      description: `${stats?.canines?.gold || 0} Gold, ${stats?.canines?.blue || 0} Blue`,
      icon: <LuDog className="size-5 text-orange-600" />,
      color: "bg-orange-50",
    },
    {
      title: "Pending Review",
      value: stats?.requests?.totalPendingActions || 0,
      description: "Immediate action required",
      icon: <FiActivity className="size-5 text-red-600" />,
      color: "bg-red-50",
    },
    {
      title: "System Reports",
      value: stats?.reports?.total || 0,
      description: `${stats?.reports?.unread || 0} New submissions`,
      icon: <FiAlertCircle className="size-5 text-purple-600" />,
      color: "bg-purple-50",
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-[#F8FAFC] ">
      {/* 1. Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <Card
            key={i}
            className="border-none shadow-sm hover:shadow-md transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-tight">
                    {card.title}
                  </p>
                  <h3 className="text-3xl font-black mt-1 text-slate-800">
                    {card.value}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium italic">
                    {card.description}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl ${card.color} shadow-inner`}>
                  {card.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-700">
              User Growth Trend (Weekly)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.chartData || []}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#3b82f6"
                        stopOpacity={0.15}
                      />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    dataKey="users"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-700">
              Canine Registration Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.chartData || []}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar
                    dataKey="dogs"
                    fill="#f59e0b"
                    radius={[6, 6, 0, 0]}
                    barSize={35}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Detailed Action Items Footer */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b border-slate-50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-bold text-slate-600 uppercase tracking-widest">
              Action Items Breakdown
            </CardTitle>
            <div className="flex gap-2">
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                LITTERS: {stats?.litters?.total || 0}
              </span>
              <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">
                READY TO REVIEW
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            <div className="p-6 text-center group hover:bg-slate-50 transition-all">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                Litter Requests
              </p>
              <p className="text-3xl font-black mt-1 text-slate-800 group-hover:scale-110 transition-transform">
                {stats?.litters?.pending || 0}
              </p>
            </div>
            <div className="p-6 text-center group hover:bg-slate-50 transition-all">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                Certificates
              </p>
              <p className="text-3xl font-black mt-1 text-slate-800 group-hover:scale-110 transition-transform">
                {stats?.requests?.certificates || 0}
              </p>
            </div>
            <div className="p-6 text-center group hover:bg-slate-50 transition-all">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                Transfers
              </p>
              <p className="text-3xl font-black mt-1 text-slate-800 group-hover:scale-110 transition-transform">
                {stats?.requests?.transfers || 0}
              </p>
            </div>
            <div className="p-6 text-center group hover:bg-slate-50 transition-all">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                Approved Today
              </p>
              <p className="text-3xl font-black mt-1 text-green-600 group-hover:scale-110 transition-transform">
                {stats?.canines?.approvedToday || 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
