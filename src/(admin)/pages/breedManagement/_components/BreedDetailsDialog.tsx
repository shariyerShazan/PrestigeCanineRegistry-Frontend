import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetBreedByIdQuery } from "@/redux/features/breed/breed.api";
import { Dog, Component, Layers, Activity, ShieldCheck, Loader2, Fingerprint } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BreedDetailsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  breedId: string | null;
}

const DataBox = ({ label, value, valueColor, icon: Icon }: any) => (
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

export default function BreedDetailsDialog({ open, setOpen, breedId }: BreedDetailsDialogProps) {
  const { data: response, isLoading } = useGetBreedByIdQuery(breedId, {
    skip: !breedId || !open,
  });

  const breed = response?.data || response;

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-2xl border-0 shadow-xl">
           <div className="h-40 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-[#2B4C8A]" />
              <p className="text-xs uppercase tracking-widest text-slate-400">Loading details...</p>
           </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!breed) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[750px] p-0 overflow-hidden border-0 rounded-2xl shadow-xl bg-white w-[95vw]">
        <div className="p-6 md:p-10">
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{breed.name}</h1>
                <Badge className={breed.type === "DESIGNER" ? "bg-purple-100 text-purple-700 hover:bg-purple-100" : "bg-blue-100 text-blue-800 hover:bg-blue-100"}>
                  {breed.type}
                </Badge>
              </div>
              <p className="text-sm font-medium text-slate-500 mt-2">
                PCR Breed Reference: <span className="text-slate-800 font-bold">{breed.breedCode}</span>
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 text-amber-500 shadow-sm shrink-0">
               <ShieldCheck size={32} />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
             <DataBox label="Code" value={breed.breedCode} valueColor="text-blue-600 font-mono" icon={Component} />
             <DataBox label="Acronym" value={breed.acronym} valueColor="text-slate-800 font-mono" icon={Fingerprint} />
             <DataBox label="Eligible Gen" value={breed.eligibleGen} valueColor="text-slate-800" icon={Layers} />
             <DataBox label="Tier Class" value={breed.tierEligibility} valueColor="text-amber-600" icon={Activity} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
            <div className="bg-[#1A1A1A] text-white rounded-xl p-6 md:p-8 relative overflow-hidden shadow-xl min-h-[160px] flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Dog size={100} />
                </div>
                <p className="text-sm font-medium text-gray-400 mb-2">Total Registered Canines</p>
                <div className="flex items-baseline gap-2">
                   <h2 className="text-5xl font-bold text-[#D4AF37]">{breed._count?.canines || 0}</h2>
                   <span className="text-sm font-medium text-gray-500">dogs</span>
                </div>
            </div>

            <div className="bg-[#2B4C8A] text-white rounded-xl p-6 md:p-8 relative overflow-hidden shadow-xl min-h-[160px] flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Layers size={100} />
                </div>
                <p className="text-sm font-medium text-blue-200 mb-2">Total Verified Litters</p>
                <div className="flex items-baseline gap-2">
                   <h2 className="text-5xl font-bold text-white">{breed._count?.litters || 0}</h2>
                   <span className="text-sm font-medium text-blue-300">litters</span>
                </div>
            </div>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
}
