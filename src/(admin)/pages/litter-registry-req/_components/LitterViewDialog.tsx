import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetAdminLitterByIdQuery } from "@/redux/features/admin-litter/admin.litter.api";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Layers, Activity, MapPin as MapPinIcon, Component, Loader2, Users } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";
import { format } from "date-fns";
import { useNavigate } from "react-router";

export const DataBox = ({ label, value, valueColor, icon: Icon }: any) => (
  <div className="bg-slate-50 p-4 rounded-xl border shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
        {label}
      </p>
      {Icon && <Icon className="text-slate-400" size={16} />}
    </div>
    <p className={`text-sm md:text-base font-bold truncate ${valueColor}`}>{value || "N/A"}</p>
  </div>
);

interface Props {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LitterViewDialog: React.FC<Props> = ({ id, open, onOpenChange }) => {
  const navigate = useNavigate();
  const { data: response, isLoading } = useGetAdminLitterByIdQuery(id as string, { skip: !id || !open });
  const litter = response?.data;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "PPP");
    } catch {
      return "Invalid Date";
    }
  };

  const handleRedirect = (pcrId: string | undefined) => {
    if (!pcrId) return;
    onOpenChange(false);
    navigate(`/admin/dashboard/canine-management?pcrId=${pcrId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] p-0 overflow-hidden border-0 rounded-2xl shadow-xl bg-white">
        {isLoading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#2B4C8A]" />
            <p className="text-xs uppercase tracking-widest text-slate-400">Loading registry data...</p>
          </div>
        ) : (
          <ScrollArea className="max-h-[90vh]">
            <div className="p-6 md:p-10 space-y-10">
              
              {/* Header Info Style */}
              <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-slate-100 bg-slate-200 shrink-0">
                     {litter?.images?.[0]?.url ? (
                       <img src={litter.images[0].url} className="w-full h-full object-cover" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-slate-400">
                         <Layers size={40} />
                       </div>
                     )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{litter?.name || "Unnamed Litter"}</h1>
                      {litter?.tier && (
                        <Badge className="bg-[#D4AF37] text-black">
                          {litter.tier} Tier
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm font-medium text-slate-500">
                       <p className="flex items-center gap-1.5 font-bold"><Component size={16} /> Breed Group: {litter?.breedRelation?.name || "N/A"}</p>
                       <p className="flex items-center gap-1.5"><MapPinIcon size={16} /> {litter?.city}, {litter?.state}</p>
                    </div>
                  </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                 <DataBox label="PCR ID" value={litter?.pcrId} valueColor="text-blue-600 font-mono" icon={Component} />
                 <DataBox label="Whelping Date" value={formatDate(litter?.dateOfBirth)} valueColor="text-slate-800" icon={Activity} />
                 <DataBox label="Generation" value={litter?.generation || "PUREBRED"} valueColor="text-slate-800" icon={Layers} />
                 <DataBox label="Total Pups" value={litter?.puppies?.length || 0} valueColor="text-[#E17100]" icon={Users} />
              </div>

              {/* Lineage */}
              <div>
                <div className="mb-4 border-b pb-2">
                  <h3 className="text-sm font-semibold tracking-wide text-slate-700 uppercase">Direct Lineage</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div
                    onClick={() => handleRedirect(litter?.father?.pcrId)}
                    className="bg-slate-50 border rounded-xl p-5 flex justify-between items-center cursor-pointer hover:border-[#D4AF37] hover:shadow-md transition-all group"
                  >
                    <div>
                      <div className="flex gap-2 items-center mb-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sire (Father)</p>
                      </div>
                      <p className="font-bold text-slate-800 text-lg">{litter?.father?.name || "Unknown Lineage"}</p>
                      <p className="text-sm font-mono text-blue-600 mt-1">{litter?.father?.pcrId || "—"}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                       <FiArrowRight size={18} />
                    </div>
                  </div>

                  <div
                    onClick={() => handleRedirect(litter?.mother?.pcrId)}
                    className="bg-slate-50 border rounded-xl p-5 flex justify-between items-center cursor-pointer hover:border-[#D4AF37] hover:shadow-md transition-all group"
                  >
                    <div>
                      <div className="flex gap-2 items-center mb-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Dam (Mother)</p>
                      </div>
                      <p className="font-bold text-slate-800 text-lg">{litter?.mother?.name || "Unknown Lineage"}</p>
                      <p className="text-sm font-mono text-blue-600 mt-1">{litter?.mother?.pcrId || "—"}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                       <FiArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Puppies */}
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="text-sm font-semibold tracking-wide text-slate-700 uppercase">Offspring Inventory</h3>
                  <Badge className="bg-[#2B4C8A] text-white text-[10px] px-3">
                    {litter?.puppies?.length || 0}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   {litter?.puppies?.length > 0 ? (
                     litter.puppies.map((pup: any, i: number) => (
                        <div
                          key={i}
                          onClick={() => handleRedirect(pup.pcrId)}
                          className="bg-slate-50 border rounded-xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 cursor-pointer hover:border-[#D4AF37] hover:bg-white hover:shadow-sm transition-all"
                        >
                           <div>
                              <p className="font-bold text-slate-800 text-base">{pup.name}</p>
                              <p className="text-xs font-mono text-blue-600 mt-1">{pup.pcrId}</p>
                           </div>
                           <Badge variant="secondary" className="w-max">{pup.gender}</Badge>
                        </div>
                     ))
                   ) : (
                      <div className="col-span-full py-10 text-center text-slate-400 text-sm bg-slate-50 rounded-xl border-2 border-dashed">
                        No puppies found.
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

export default LitterViewDialog;
