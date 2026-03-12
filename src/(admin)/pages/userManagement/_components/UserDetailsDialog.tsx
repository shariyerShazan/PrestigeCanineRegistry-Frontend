/* eslint-disable @typescript-eslint/no-explicit-any */
// UserDetailsDialog.tsx
// import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FiUser,
  FiMail,
  FiHash,
  FiShield,
  FiTag,
  FiCheckCircle,
} from "react-icons/fi";

export const UserDetailsDialog = ({ user, open, setOpen }: any) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden border-none shadow-2xl">
        {/* Header Section */}
        <div className="bg-[#2B4C8A] p-6 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FiUser size={80} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2 text-2xl tracking-tight font-bold">
              <FiUser className="text-[#D4AF37]" />
              User Profile Details
            </DialogTitle>
            <p className="text-blue-100/70 text-sm mt-1">
              Account information and registered assets
            </p>
          </DialogHeader>
        </div>

        <ScrollArea className="max-h-[75vh] bg-white">
          <div className="p-6 space-y-8">
            {/* Basic Information Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-xs uppercase tracking-widest border-b pb-2">
                <FiTag /> Account Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <DataRow
                  icon={<FiUser className="text-blue-500" />}
                  label="Full Name"
                  value={user.fullName}
                />
                <DataRow
                  icon={<FiMail className="text-blue-500" />}
                  label="Email Address"
                  value={user.email}
                />
                <DataRow
                  icon={<FiHash className="text-[#D4AF37]" />}
                  label="PCR Customer ID"
                  value={user.pcrId}
                  isMono
                />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                    Account Status
                  </span>
                  <Badge className="w-fit bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Registered Canines Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[#2B4C8A] border-b pb-2">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                  <FiShield /> Ownership Registry
                </div>
                <Badge className="bg-[#2B4C8A] text-[10px] h-5">
                  {user.canines?.length || 0} CANINES
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {user.canines?.length > 0 ? (
                  user.canines.map((dog: any) => (
                    <div
                      key={dog.id}
                      className="group p-4 border border-slate-100 rounded-xl bg-slate-50/50 hover:border-[#D4AF37] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <p className="font-black text-[#2B4C8A] text-lg leading-none group-hover:text-[#1a3563]">
                          {dog.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-mono text-[#D4AF37] font-bold">
                            {dog.pcrId}
                          </span>
                          <span className="text-slate-300">|</span>
                          <span>Gen: {dog.generation || "N/A"}</span>
                        </div>
                      </div>

                      <Badge
                        className={`${
                          dog.tier === "GOLD"
                            ? "bg-[#D4AF37] text-black"
                            : "bg-[#2B4C8A] text-white"
                        } flex gap-2 items-center py-1.5 px-4 rounded-full border-none shadow-sm`}
                      >
                        {dog.status === "APPROVED" && (
                          <FiCheckCircle size={14} />
                        )}
                        <span className="font-bold tracking-wide">
                          {dog.tier}{" "}
                          {dog.status === "APPROVED" ? "VERIFIED" : ""}
                        </span>
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center text-slate-400 text-sm bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                    No canines registered to this user profile.
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

// Helper Row Component
const DataRow = ({ icon, label, value, isMono = false }: any) => (
  <div className="flex items-start gap-3">
    <div className="mt-1">{icon}</div>
    <div className="flex flex-col">
      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
        {label}
      </span>
      <span
        className={`text-sm font-semibold text-slate-700 ${isMono ? "font-mono text-blue-600" : ""}`}
      >
        {value || "N/A"}
      </span>
    </div>
  </div>
);
