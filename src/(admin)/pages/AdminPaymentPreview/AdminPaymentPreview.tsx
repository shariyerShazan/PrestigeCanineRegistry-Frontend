import React, { useState, useMemo } from "react";
// import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
    // FiSearch, 
    FiDollarSign, FiCalendar, FiUser } from "react-icons/fi";
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

const AdminPaymentPreview: React.FC = () => {
//   const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const limit = 10;

  // 1. Generate Year List (Current year and past 5 years)
  const yearList = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 6 }, (_, i) => currentYear - i);
  }, []);

  // 2. Fetch Data
  const { data: paymentsRes, isLoading: isTableLoading } =
    useGetAllPaymentsQuery({
      page,
      limit,
    //   searchTerm: search,
    });

  const { data: rawStats, isLoading: isStatsLoading } = useGetRevenueStatsQuery(
    {
      month: selectedMonth,
      year: selectedYear,
    },
  );

  // 3. Format Chart Data
  const chartData = useMemo(() => {
    if (!rawStats || !Array.isArray(rawStats)) return [];
    return rawStats.map((item: any) => ({
      label: item.label,
      revenue: Number(item.revenue) || 0,
      total_sales: Number(item.total_sales) || 0,
    }));
  }, [rawStats]);

  const columns: Column<any>[] = [
    {
      header: "USER / PCR ID",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-[#2B4C8A]/10">
            <AvatarImage
              src={row.user?.profileImageUrl}
              alt={row.user?.fullName}
            />
            <AvatarFallback className="bg-blue-50 text-[#2B4C8A]">
              <FiUser />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 text-sm">
              {row.user?.fullName || "N/A"}
            </span>
            <span className="text-[11px] text-[#2B4C8A] font-mono font-semibold">
              {row.user?.pcrId}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "PLAN",
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-xs font-black text-slate-600 uppercase tracking-wider">
            {row.membership?.name}
          </span>
          <span className="text-[11px] text-slate-400">
            Limit: {row.membership?.canineLimit}
          </span>
        </div>
      ),
    },
    {
      header: "AMOUNT",
      render: (row) => (
        <div className="font-bold text-slate-700">
          ${Number(row.amountPaid).toFixed(2)}{" "}
          <span className="text-[10px] opacity-50">{row.currency}</span>
        </div>
      ),
    },
    {
      header: "DATE",
      render: (row) => (
        <span className="text-slate-500 text-xs">
          {format(new Date(row.createdAt), "MMM dd, yyyy")}
        </span>
      ),
    },
    {
      header: "STATUS",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
            row.status === "PAID" || row.status === "active"
              ? "text-emerald-600 bg-emerald-50 border-emerald-100"
              : "text-amber-600 bg-amber-50 border-amber-100"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-slate-50/50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Revenue Overview
              </h3>
              <p className="text-xs text-slate-400">
                Data for {format(new Date(0, selectedMonth - 1), "MMMM")},{" "}
                {selectedYear}
              </p>
            </div>

            {/* Year and Month Selectors */}
            <div className="flex gap-2">
              <Select
                value={String(selectedYear)}
                onValueChange={(val) => setSelectedYear(Number(val))}
              >
                <SelectTrigger className="w-28 h-9 font-bold border-slate-200 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {yearList.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={String(selectedMonth)}
                onValueChange={(val) => setSelectedMonth(Number(val))}
              >
                <SelectTrigger className="w-32 h-9 font-bold border-slate-200 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {format(new Date(0, i), "MMMM")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="h-[250px] w-full">
            {isStatsLoading ? (
              <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs animate-pulse">
                Loading Chart...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2B4C8A" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#2B4C8A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="label"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2B4C8A"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#2B4C8A] p-6 rounded-2xl text-white shadow-lg shadow-blue-900/10">
            <FiDollarSign className="text-blue-200 mb-4" size={24} />
            <p className="text-blue-100 text-xs font-medium uppercase tracking-widest">
              Total Month Revenue
            </p>
            <h2 className="text-3xl font-bold mt-1">
              $
              {chartData
                .reduce((acc, curr) => acc + curr.revenue, 0)
                .toFixed(2)}
            </h2>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <FiCalendar className="text-slate-400 mb-4" size={24} />
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
              Total Month Sales
            </p>
            <h2 className="text-3xl font-bold mt-1 text-slate-800">
              {chartData.reduce((acc, curr) => acc + curr.total_sales, 0)}
            </h2>
          </div>
        </div>
      </div>

      <div className=" overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-800">
            Payment Transactions
          </h3>
          {/* <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10 w-full md:w-72 h-10 border-slate-200"
              placeholder="Search Name or PCR..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div> */}
        </div>
        <CommonTable
          columns={columns}
          data={paymentsRes?.data || []}
          loading={isTableLoading}
        />
        <div className="p-6 border-t border-slate-50">
          <CommonPagination
            currentPage={page}
            totalPages={paymentsRes?.meta?.lastPage || 1}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentPreview;
