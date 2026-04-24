/* eslint-disable @typescript-eslint/no-explicit-any */

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

import { useNavigate } from "react-router";

export const UserDetailsDialog = ({ user, open, setOpen }: any) => {
  const navigate = useNavigate();

  if (!user) return null;

  const handleCanineClick = (pcrId: string) => {
    setOpen(false);
    navigate(`/admin/dashboard/canine-management?pcrId=${pcrId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="bg-[#2B4C8A] p-6 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FiUser size={90} />
          </div>

          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
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
            {/* Account Info */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-xs uppercase tracking-widest border-b pb-2">
                <FiTag /> Account Information
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50 p-5 rounded-xl border">
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

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">
                    Account Status
                  </span>
                  <div className="mt-1">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* Canines */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2 text-[#2B4C8A]">
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
                      onClick={() => handleCanineClick(dog.pcrId)}
                      className="cursor-pointer group p-4 rounded-xl border bg-slate-50 hover:border-[#D4AF37] hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* Left */}
                      <div className="space-y-1">
                        <p className="font-bold text-[#2B4C8A] text-lg group-hover:text-[#1a3563]">
                          {dog.name}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-mono text-[#D4AF37] font-semibold">
                            {dog.pcrId}
                          </span>
                          <span className="text-slate-300">|</span>
                          <span>Gen: {dog.generation || "N/A"}</span>
                        </div>
                      </div>

                      {/* Right */}
                      <Badge
                        className={`flex items-center gap-2 py-1.5 px-4 rounded-full ${
                          dog.tier === "GOLD"
                            ? "bg-[#D4AF37] text-black"
                            : "bg-[#2B4C8A] text-white"
                        }`}
                      >
                        {dog.status === "APPROVED" && (
                          <FiCheckCircle size={14} />
                        )}
                        <span className="font-semibold tracking-wide text-xs">
                          {dog.tier}{" "}
                          {dog.status === "APPROVED" ? "VERIFIED" : ""}
                        </span>
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center text-slate-400 text-sm bg-slate-50 rounded-xl border-2 border-dashed">
                    No canines registered to this user profile.
                  </div>
                )}
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

/* Reusable Row */
const DataRow = ({ icon, label, value, isMono = false }: any) => (
  <div className="flex items-start gap-3">
    <div className="mt-1">{icon}</div>
    <div className="flex flex-col">
      <span className="text-[10px] text-slate-400 uppercase font-bold">
        {label}
      </span>
      <span
        className={`text-sm font-semibold text-slate-700 ${
          isMono ? "font-mono text-blue-600" : ""
        }`}
      >
        {value || "N/A"}
      </span>
    </div>
  </div>
);
