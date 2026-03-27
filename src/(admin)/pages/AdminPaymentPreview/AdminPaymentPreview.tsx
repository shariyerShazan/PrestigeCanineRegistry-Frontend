import React, { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiInfo,
  FiActivity,
  FiArrowUpRight,
} from "react-icons/fi";
import CommonTable, { type Column } from "@/(admin)/_components/CommonTable";
import CommonPagination from "@/components/common/pagination/CommonPagination";
import { format } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useGetAllPaymentsQuery,
  useGetRevenueStatsQuery,
} from "@/redux/features/payment-api/paymentApi";
import { Badge } from "@/components/ui/badge";

const AdminPaymentPreview: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const limit = 10;

  const yearList = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 6 }, (_, i) => currentYear - i);
  }, []);

  // API
  const { data: paymentsRes, isLoading: isTableLoading } =
    useGetAllPaymentsQuery({ page, limit });

  const { data: rawStats, isLoading: isStatsLoading } = useGetRevenueStatsQuery(
    {
      month: selectedMonth,
      year: selectedYear,
    },
  );

  // Chart
  const chartData = useMemo(() => {
    if (!rawStats?.graphData) return [];
    return rawStats.graphData.map((item: any) => ({
      label: item.label,
      revenue: Number(item.revenue) || 0,
    }));
  }, [rawStats]);

  const columns: Column<any>[] = useMemo(
    () => [
      {
        header: "TRANSACTION / USER",
        render: (row) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={row.billingDetails?.profileImage} />
              <AvatarFallback>
                <FiUser />
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="font-bold text-sm">
                {row.billingDetails?.name || "Member"}
              </span>

              <span className="text-[10px] text-slate-400 font-mono">
                {row.externalId?.substring(0, 16)}...
              </span>
            </div>
          </div>
        ),
      },
      {
        header: "CATEGORY & DESCRIPTION",
        render: (row) => {
          const categoryStyles: Record<string, string> = {
            MEMBERSHIP: "bg-blue-50 text-blue-600 border-blue-100",
            CANINE_REG: "bg-emerald-50 text-emerald-600 border-emerald-100",
            LITTER_REG: "bg-purple-50 text-purple-600 border-purple-100",
            TRANSFER: "bg-orange-50 text-orange-600 border-orange-100",
            CERTIFICATE: "bg-rose-50 text-rose-600 border-rose-100",
          };

          // ✅ FIX: use backend category
          const category = row.category;

          return (
            <div className="flex flex-col gap-1">
              <Badge
                variant="outline"
                className={`w-fit text-[9px] h-4 font-bold ${
                  categoryStyles[category] ||
                  "bg-slate-50 text-slate-600 border-slate-100"
                }`}
              >
                {category?.replace("_", " ")}
              </Badge>

              <span className="text-[11px] text-slate-600 italic">
                {row.description}
              </span>
            </div>
          );
        },
      },

      // AMOUNT
      {
        header: "AMOUNT",
        render: (row) => (
          <div className="flex flex-col">
            <span className="font-black text-sm">
              ${Number(row.amount).toFixed(2)}
            </span>

            <span className="text-[9px] text-emerald-500 font-bold uppercase">
              {row.status === "PAID" || row.status === "active"
                ? "Success"
                : row.status}
            </span>
          </div>
        ),
      },

      // DATE
      {
        header: "DATE & TIME",
        render: (row) => {
          const isValid = row.date && !isNaN(new Date(row.date).getTime());

          return (
            <div className="flex flex-col">
              <span className="text-xs">
                {isValid ? format(new Date(row.date), "MMM dd, yyyy") : "N/A"}
              </span>
              <span className="text-[10px] text-slate-400">
                {isValid ? format(new Date(row.date), "hh:mm a") : "--:--"}
              </span>
            </div>
          );
        },
      },

      // STATUS
      {
        header: "STATUS",
        render: (row) => {
          const isPaid = row.status === "PAID" || row.status === "active";

          return (
            <div
              className={`px-2 py-1 text-[10px] rounded-md border font-bold w-max ${
                isPaid
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {row.status?.toUpperCase()}
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="p-8 space-y-10 bg-[#F8FAFC] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-black">Financial Intelligence</h1>
          <p className="text-sm text-slate-500">
            Revenue analytics & transactions
          </p>
        </div>

        <div className="flex gap-2">
          <Select
            value={String(selectedMonth)}
            onValueChange={(v) => setSelectedMonth(Number(v))}
          >
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={String(i + 1)}>
                  {format(new Date(0, i), "MMMM")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(selectedYear)}
            onValueChange={(v) => setSelectedYear(Number(v))}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {yearList.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* CHART */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl">
          <div className="h-[300px]">
            {isStatsLoading ? (
              <div className="h-full animate-pulse bg-slate-100 rounded" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2B4C8A" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2B4C8A" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis tickFormatter={(v) => `$${v}`} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2B4C8A"
                    fill="url(#colorRev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* STATS */}
        <div className="flex flex-col gap-4">
          {/* TOTAL REVENUE */}
          <div className="bg-[#2B4C8A] text-white p-5 rounded-xl shadow flex flex-col justify-between h-1/2">
            <div className="flex justify-between items-start">
              <FiDollarSign />
              <FiArrowUpRight className="opacity-70" />
            </div>

            <div>
              <p className="text-xs opacity-70 uppercase">Total Revenue</p>
              <h2 className="text-2xl font-bold mt-1">
                ${Number(rawStats?.summary?.totalRevenue || 0).toLocaleString()}
              </h2>
            </div>
          </div>

          {/* AVG ORDER VALUE */}
          <div className="bg-white border p-5 rounded-xl shadow flex flex-col justify-between h-1/2">
            <div className="flex justify-between items-start">
              <FiCalendar />
              <span className="text-xs text-emerald-500 font-bold">
                {rawStats?.summary?.totalTransactions || 0} sales
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-400 uppercase">
                Avg Order Value
              </p>
              <h2 className="text-2xl font-bold mt-1">
                ${rawStats?.summary?.averageOrderValue || "0.00"}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <CommonTable
        columns={columns}
        data={paymentsRes?.payments || []}
        loading={isTableLoading}
      />

      <CommonPagination
        currentPage={page}
        totalPages={paymentsRes?.pagination?.totalPages || 1}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
};

export default AdminPaymentPreview;
