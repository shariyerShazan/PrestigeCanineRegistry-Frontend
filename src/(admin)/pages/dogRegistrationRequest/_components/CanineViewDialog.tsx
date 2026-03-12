/* eslint-disable @typescript-eslint/no-explicit-any */
// @/components/admin/canine/CanineViewDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAdminCanineByIdQuery } from "@/redux/features/admin-canine/admin.canine.api";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FiFileText,
  FiUser,
  FiActivity,
  FiShield,
  FiCamera,
} from "react-icons/fi";

interface Props {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CanineViewDialog: React.FC<Props> = ({ id, open, onOpenChange }) => {
  const { data: response, isLoading } = useGetAdminCanineByIdQuery(
    id as string,
    {
      skip: !id,
    },
  );

  const canine = response?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#2B4C8A] p-6 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FiFileText size={80} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2 text-2xl tracking-tight font-bold">
              <FiFileText className="text-[#D4AF37]" />
              Canine Full Profile
            </DialogTitle>
            <p className="text-blue-100/70 text-sm mt-1">
              Official PCR Registry Record
            </p>
          </DialogHeader>
        </div>

        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-[#2B4C8A]/20 border-t-[#2B4C8A] rounded-full animate-spin" />
            <p className="text-slate-500 font-medium">Fetching details...</p>
          </div>
        ) : (
          <ScrollArea className="max-h-[75vh] bg-white">
            <div className="p-6 space-y-8">
              {/* Profile Image & Quick Status */}
              <div className="flex flex-col items-center sm:flex-row gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="relative group">
                  {canine?.images?.[0]?.url ? (
                    <img
                      src={canine.images[0].url}
                      alt="Dog"
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-1 border-4 border-white shadow-inner">
                      <FiCamera size={24} />
                      <span className="text-[10px] font-bold uppercase">
                        No Photo
                      </span>
                    </div>
                  )}
                  <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black border-none hover:bg-[#D4AF37]">
                    {canine?.tier} TIER
                  </Badge>
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h2 className="text-2xl font-black text-[#2B4C8A] tracking-tight leading-none">
                    {canine?.name}
                  </h2>
                  <p className="text-[#D4AF37] font-mono font-bold text-sm tracking-wider">
                    {canine?.pcrId}
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
                    <Badge
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 border-blue-100"
                    >
                      {canine?.status}
                    </Badge>
                    <Badge variant="outline" className="text-slate-500">
                      {canine?.gender}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Ownership & Breed */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-xs uppercase tracking-widest border-b pb-2">
                    <FiUser /> Identity & Owner
                  </div>
                  <div className="space-y-3">
                    <DataRow
                      label="Owner Name"
                      value={canine?.owner?.fullName}
                    />
                    <DataRow label="Owner Email" value={canine?.owner?.email} />
                    <DataRow
                      label="Breed"
                      value={canine?.breedRelation?.name}
                    />
                  </div>
                </div>

                {/* Physical & Security */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-xs uppercase tracking-widest border-b pb-2">
                    <FiShield /> Technical Specs
                  </div>
                  <div className="space-y-3">
                    <DataRow
                      label="Microchip ID"
                      value={canine?.microchipId}
                      isMono
                    />
                    <DataRow label="Color" value={canine?.color} />
                    <DataRow
                      label="Current Weight"
                      value={canine?.weight ? `${canine.weight} kg` : "N/A"}
                    />
                  </div>
                </div>

                {/* Health Notes */}
                <div className="col-span-1 md:col-span-2 space-y-4">
                  <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-xs uppercase tracking-widest border-b pb-2">
                    <FiActivity /> Health Status & Notes
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <p className="text-xs font-bold text-[#D4AF37] uppercase mb-1">
                      Current: {canine?.healthStatus || "Excellent"}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed italic">
                      "
                      {canine?.healthNotes ||
                        "No clinical notes provided for this record."}
                      "
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Helper component for clean data rows
const DataRow = ({
  label,
  value,
  isMono = false,
}: {
  label: string;
  value: string | undefined;
  isMono?: boolean;
}) => (
  <div className="flex flex-col">
    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
      {label}
    </span>
    <span
      className={`text-sm font-semibold text-slate-700 ${isMono ? "font-mono text-blue-600" : ""}`}
    >
      {value || "Not Recorded"}
    </span>
  </div>
);

export default CanineViewDialog;
