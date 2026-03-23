import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiSearch, FiTrash2, FiCheckCircle } from "react-icons/fi";
import CommonTable, { type Column } from "@/(admin)/_components/CommonTable";
import CommonPagination from "@/components/common/pagination/CommonPagination";

import Swal from "sweetalert2";
import { format } from "date-fns";
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useMarkAllReadMutation,
  useMarkSingleReadMutation,
} from "@/redux/features/notification/notificationsApi";

import { FiUser, FiShield, FiFlag, FiFileText, FiBell } from "react-icons/fi";
import { LuDog } from "react-icons/lu";



const ActivityLog: React.FC = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all"); // 'all', 'read', 'unread'
  const [page, setPage] = useState(1);
  const limit = 10;

  const getCategoryStyles = (type: string) => {
    switch (type) {
      case "USER":
        return {
          icon: <FiUser className="text-green-500" />,
          bg: "bg-green-50",
          border: "border-green-100",
          text: "text-green-700",
        };
      case "CANINE":
        return {
          icon: <LuDog className="text-orange-400" />,
          bg: "bg-orange-50",
          border: "border-orange-100",
          text: "text-orange-700",
        };
      case "REPORT":
        return {
          icon: <FiFlag className="text-red-500" />,
          bg: "bg-red-50",
          border: "border-red-100",
          text: "text-red-700",
        };
      case "MEMBERSHIP":
        return {
          icon: <FiShield className="text-blue-500" />,
          bg: "bg-blue-50",
          border: "border-blue-100",
          text: "text-blue-700",
        };
      case "CERTIFICATE":
        return {
          icon: <FiFileText className="text-purple-500" />,
          bg: "bg-purple-50",
          border: "border-purple-100",
          text: "text-purple-700",
        };
      default:
        return {
          icon: <FiBell className="text-slate-400" />,
          bg: "bg-slate-50",
          border: "border-slate-100",
          text: "text-slate-600",
        };
    }
  };

  // 1. RTK Query for List (Real-time update logic slice e thakle ekhane auto hobe)
  const { data: response, isLoading } = useGetNotificationsQuery({
    searchTerm: search,
    isRead: status === "all" ? undefined : status === "read",
    page,
    limit,
  });
// console.log(response.data)
  const [markAllRead] = useMarkAllReadMutation();
  const [markSingleRead] = useMarkSingleReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  // 2. Handle Actions
  const handleMarkAllRead = async () => {
    try {
      await markAllRead().unwrap();
      Swal.fire("Success", "All notifications marked as read", "success");
    } catch (err) {
      Swal.fire("Error", "Action failed", "error");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This notification will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteNotification(id).unwrap();
    }
  };

  // 3. Table Columns Definition
  const columns: Column<any>[] = [
    {
      header: "TIME",
      render: (row) => (
        <span className="text-slate-500 text-[13px]">
          {format(new Date(row.createdAt), "MM/dd/yyyy, p")}
        </span>
      ),
    },
    {
      header: "NOTIFICATION",
      render: (row) => (
        <div className="py-1 max-w-[400px]">
          <div className="flex items-center gap-2">
            {!row.isRead && (
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse flex-shrink-0" />
            )}
            <p
              className={`text-[14px] ${row.isRead ? "font-medium text-slate-600" : "font-bold text-slate-900"}`}
            >
              {row.title}
            </p>
          </div>
          <p className="text-[12px] text-slate-400 mt-1 line-clamp-1">
            {row.message}
          </p>
        </div>
      ),
    },
    {
      header: "CATEGORY",
      render: (row) => {
        const style = getCategoryStyles(row.category);
        return (
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-md ${style.bg} border ${style.border}`}
            >
              {style.icon}
            </div>
            <span
              className={`${style.text} px-2 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight`}
            >
              {row.category || "System"}
            </span>
          </div>
        );
      },
    },
    {
      header: "STATUS",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
            row.isRead
              ? "text-slate-400 bg-slate-50 border-slate-100"
              : "text-green-600 bg-green-50 border-green-100"
          }`}
        >
          {row.isRead ? "Read" : "New"}
        </span>
      ),
    },
    {
      header: "ACTION",
      render: (row) => (
        <div className="flex items-center gap-2">
          {!row.isRead && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer text-green-600 hover:bg-green-50"
              onClick={() => markSingleRead(row.id)}
              title="Mark as read"
            >
              <FiCheckCircle size={16} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 cursor-pointer text-red-500 hover:bg-red-50"
            onClick={() => handleDelete(row.id)}
          >
            <FiTrash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 space-y-6  rounded-md min-h-[600px]">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10 w-full md:w-72 h-10 border-[#2B4C8A]/20 focus-visible:ring-[#2B4C8A]/30"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Select
            value={status}
            onValueChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-36 h-10 border-[#2B4C8A]/20 text-[#2B4C8A] font-bold">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleMarkAllRead}
          variant="outline"
          className="border-[#2B4C8A] cursor-pointer text-[#2B4C8A] gap-2 h-10 font-bold hover:bg-blue-50 transition-all"
        >
          <FiCheckCircle /> Mark All as Read
        </Button>
      </div>

      {/* Table Section */}
      <CommonTable
        columns={columns}
        data={response?.data || []}
        loading={isLoading}
      />

      {/* Pagination */}
      <CommonPagination
        currentPage={page}
        totalPages={response?.meta?.totalPage || 1}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
};

export default ActivityLog;
