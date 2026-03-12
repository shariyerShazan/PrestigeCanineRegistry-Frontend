/* eslint-disable @typescript-eslint/no-explicit-any */
// @/components/admin/litter/LitterViewDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAdminLitterByIdQuery } from "@/redux/features/admin-litter/admin.litter.api";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FiGrid,
  FiUsers,
  FiLayers,
  FiActivity,
  FiCamera,
} from "react-icons/fi";

interface Props {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LitterViewDialog: React.FC<Props> = ({ id, open, onOpenChange }) => {
  const { data: response, isLoading } = useGetAdminLitterByIdQuery(
    id as string,
    {
      skip: !id,
    },
  );

  const litter = response?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-[#2B4C8A] p-6 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FiLayers size={80} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2 text-2xl tracking-tight font-bold">
              <FiLayers className="text-[#D4AF37]" />
              Litter Group Details
            </DialogTitle>
            <p className="text-blue-100/70 text-sm mt-1">
              Complete Genealogy and Puppy Registry
            </p>
          </DialogHeader>
        </div>

        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-[#2B4C8A]/20 border-t-[#2B4C8A] rounded-full animate-spin" />
            <p className="text-slate-500 font-medium">
              Retrieving litter data...
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-[75vh] bg-white">
            <div className="p-6 space-y-8">
              {/* Media Gallery */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-xs uppercase tracking-widest border-b pb-2">
                  <FiCamera /> Media Gallery
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {litter?.images?.length > 0 ? (
                    litter.images.map((img: any, idx: number) => (
                      <img
                        key={idx}
                        src={img.url}
                        alt="Litter"
                        className="w-28 h-28 rounded-xl object-cover border-2 border-slate-100 shadow-sm flex-shrink-0"
                      />
                    ))
                  ) : (
                    <div className="w-full h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm italic">
                      No media uploaded
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-xs uppercase tracking-widest border-b pb-2">
                    <FiGrid /> Record Identity
                  </div>
                  <div className="space-y-3">
                    <DataRow label="Litter Name" value={litter?.name} />
                    <DataRow
                      label="PCR Group ID"
                      value={litter?.pcrId}
                      isMono
                    />
                    <DataRow
                      label="Breed & Generation"
                      value={`${litter?.breedRelation?.name} (${litter?.generation})`}
                    />
                    <div className="pt-1 flex gap-2">
                      <Badge
                        className={`${litter?.tier === "GOLD" ? "bg-[#D4AF37] text-black" : "bg-[#2B4C8A]"} border-none font-bold`}
                      >
                        {litter?.tier} TIER
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-blue-600 bg-blue-50 border-blue-100"
                      >
                        {litter?.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Parentage */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-xs uppercase tracking-widest border-b pb-2">
                    <FiUsers /> Pedigree (Parentage)
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-3 p-3 bg-pink-50/50 rounded-lg border border-pink-100">
                      <div className="w-2 h-10 bg-pink-400 rounded-full" />
                      <div>
                        <p className="text-[10px] text-pink-600 font-black uppercase">
                          Dam (Mother)
                        </p>
                        <p className="text-sm font-bold text-slate-700">
                          {litter?.mother?.name || "Unregistered"}
                        </p>
                        <p className="text-[10px] font-mono text-pink-500">
                          {litter?.mother?.pcrId || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                      <div className="w-2 h-10 bg-blue-400 rounded-full" />
                      <div>
                        <p className="text-[10px] text-blue-600 font-black uppercase">
                          Sire (Father)
                        </p>
                        <p className="text-sm font-bold text-slate-700">
                          {litter?.father?.name || "Unregistered"}
                        </p>
                        <p className="text-[10px] font-mono text-blue-500">
                          {litter?.father?.pcrId || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Puppies Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[#2B4C8A] border-b pb-2">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                    <FiActivity /> Registered Puppies
                  </div>
                  <Badge className="bg-[#2B4C8A] text-[10px] h-5">
                    {litter?.puppies?.length || 0} TOTAL
                  </Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {litter?.puppies?.length > 0 ? (
                    litter.puppies.map((pup: any, i: number) => (
                      <div
                        key={i}
                        className="group hover:border-[#D4AF37] transition-all p-3 border border-slate-100 rounded-xl bg-slate-50/50 flex flex-col"
                      >
                        <span className="text-xs font-black text-slate-700 truncate group-hover:text-[#2B4C8A]">
                          {pup.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 group-hover:text-[#D4AF37]">
                          {pup.pcrId}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 py-6 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                      No puppies registered in this litter yet.
                    </div>
                  )}
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

export default LitterViewDialog;
