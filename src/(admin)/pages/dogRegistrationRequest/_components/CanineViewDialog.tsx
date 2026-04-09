import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetAdminCanineByIdQuery } from "@/redux/features/admin-canine/admin.canine.api";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { Dna, ShieldCheck, Camera, MapPin as MapPinIcon, Loader2 } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";
import { Progress } from "@/components/ui/progress";
import { HealthSummaryOfOwnerDog } from "@/(owner)/pages/ownerDogPreview/_components/HealthSummary";

export const DataBox = ({ label, value, valueColor }: any) => (
  <div className="bg-slate-50 p-3 rounded-lg border shadow-sm">
    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
      {label}
    </p>
    <p className={`text-sm font-bold ${valueColor}`}>{value}</p>
  </div>
);

const SectionHeader = ({ title }: any) => (
  <div className="mb-4 border-b pb-2">
    <h3 className="text-sm font-semibold tracking-wide text-slate-700 uppercase">
      {title}
    </h3>
  </div>
);

interface Props {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CanineViewDialog: React.FC<Props> = ({ id, open, onOpenChange }) => {
  const navigate = useNavigate();
  const { data: response, isLoading } = useGetAdminCanineByIdQuery(id as string, { skip: !id || !open });
  const canine = response?.data;
console.log(canine)
  const formatDate = (date: any) => {
    if (!date) return "N/A";
    try {
      return format(new Date(date), "PPP");
    } catch {
      return "Invalid Date";
    }
  };

  const handleRedirect = (pcrId: string | undefined) => {
    if (!pcrId) return;
    onOpenChange(false);
    navigate(`/admin/dashboard/canine-management?pcrId=${pcrId}`);
  };

   const handleUserClick = (pcrId: string) => {
     if (!pcrId) return;
    //  setOpen(false);
     navigate(`/admin/dashboard/user-management?pcrId=${pcrId}`);
   };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-250 p-0 overflow-hidden border-0 rounded-2xl shadow-xl bg-white">
        {isLoading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#2B4C8A]" />
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Loading registry data...
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-[90vh]">
            <div className="p-6 md:p-10 space-y-10">
              {/* Header Info Style */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3">
                  <div className="rounded-2xl overflow-hidden mb-3 aspect-square border shadow-sm bg-slate-100 flex items-center justify-center">
                    {canine?.images?.[0]?.url ? (
                      <img
                        src={canine.images[0].url}
                        alt={canine.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <Camera size={40} />
                        <span className="text-xs mt-2 font-medium">
                          No Photo
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Multiple Images Thumbnail Gallery */}
                  {canine?.images && canine.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {canine.images.map((img: any, idx: number) => (
                        <div
                          key={idx}
                          className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shrink-0"
                        >
                          <img
                            src={img.url}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-full md:w-2/3 flex flex-col gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <h1 className="text-3xl font-bold text-slate-900 capitalize">
                        {canine?.name || "Unknown Canine"}
                      </h1>
                      {canine?.tier && (
                        <Badge className="bg-[#2B4C8A] hover:bg-[#2B4C8A] flex gap-1 items-center py-1">
                          <ShieldCheck size={16} className="text-yellow-500" />
                          {canine.tier} Verified
                        </Badge>
                      )}
                      {canine?.status && (
                        <Badge
                          className={
                            canine.status === "ACTIVE"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }
                        >
                          {canine.status}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <DataBox
                        label="PCR ID"
                        value={canine?.pcrId || "N/A"}
                        valueColor="text-blue-600 font-mono"
                      />
                      <DataBox
                        label="Breed"
                        value={canine?.breedRelation?.name || "N/A"}
                        valueColor="text-slate-800"
                      />
                      <DataBox
                        label="Generation"
                        value={canine?.generation || "PUREBRED"}
                        valueColor="text-slate-800"
                      />
                      <DataBox
                        label="Gender"
                        value={canine?.gender || "N/A"}
                        valueColor="text-amber-600"
                      />
                      <DataBox
                        label="Microchip"
                        value={canine?.microchipId || "N/A"}
                        valueColor="text-blue-600 font-mono"
                      />
                      <DataBox
                        label="DOB"
                        value={formatDate(canine?.dateOfBirth)}
                        valueColor="text-slate-800"
                      />
                      <DataBox
                        label="Weight"
                        value={canine?.weight ? `${canine.weight} KG` : "N/A"}
                        valueColor="text-slate-800"
                      />
                      <DataBox
                        label="Color"
                        value={canine?.color || "N/A"}
                        valueColor="text-slate-800"
                      />
                    </div>
                  </div>

                  {/* OWNER CARD */}
                  {canine?.owner && (
                    <div
                      onClick={() => handleUserClick(canine?.owner?.pcrId)}
                      className="bg-slate-50 border rounded-xl p-5 shadow-sm hover:shadow-md hover:cursor-pointer hover:border hover:border-[#D4AF37]"
                    >
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">
                        Owner Information
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-slate-200">
                          {canine.owner.profileImage && (
                            <img
                              src={canine.owner.profileImage}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-800">
                            {canine.owner.fullName}
                          </h3>
                          <div className="text-xs text-slate-500 font-medium mt-1 flex flex-col sm:flex-row sm:gap-4 gap-1">
                            <p className="flex items-center gap-1">
                              <MapPinIcon size={12} /> {canine.city},{" "}
                              {canine.country}
                            </p>
                            <p>
                              PCR ID:{" "}
                              <span className="font-mono text-blue-600">
                                {canine.owner.pcrId}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* --- DNA & HEALTH SECTION --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* DNA REPORT SECTION */}
                <div className="bg-[#1A1A1A] text-white rounded-xl p-6 relative overflow-hidden shadow-xl min-h-75">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-yellow-600/20 rounded-lg">
                        <Dna className="text-yellow-500" size={20} />
                      </div>
                      <h4 className="font-bold text-lg tracking-wide">
                        DNA Report
                      </h4>
                    </div>

                    {/* DNA PDF Download or View */}
                    {canine?.DNAdocuments && canine.DNAdocuments.length > 0 && (
                      <div className="flex gap-2 text-xs">
                        {canine.DNAdocuments.map((doc: any, i: number) => (
                          <a
                            key={i}
                            href={doc.url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 bg-[#D4AF37]/20 text-[#D4AF37] rounded-md font-medium hover:bg-[#D4AF37]/40 transition"
                          >
                            View PDF {i + 1}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-6 mt-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2 text-gray-400 font-medium">
                        <span>Primary Breed:</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-base">
                          {canine?.breedRelation?.name || "N/A"}
                        </span>
                        <span className="text-yellow-500 font-bold text-lg">
                          {canine?.primaryBreedDNA || 0}%
                        </span>
                      </div>
                      <Progress
                        value={Number(canine?.primaryBreedDNA || 0)}
                        indicatorClassName="bg-[#D4AF37]"
                        className="h-2.5 bg-gray-800 rounded-full"
                      />
                    </div>

                    {canine?.secondaryBreedDNA && (
                      <div>
                        <div className="flex justify-between text-sm mb-2 text-gray-400 font-medium">
                          <span>Secondary Distribution:</span>
                        </div>
                        <div className="flex justify-between font-bold mb-1">
                          <span className="text-base">Mixed Background</span>
                          <span className="text-blue-400 text-lg">
                            {canine.secondaryBreedDNA}%
                          </span>
                        </div>
                        <Progress
                          value={Number(canine.secondaryBreedDNA)}
                          className="h-2.5 bg-gray-800 rounded-full"
                          indicatorClassName="bg-[#2B4C8A]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* HEALTH SUMMARY SECTION */}
                <div className="relative rounded-xl min-h-75 border shadow-md bg-white">
                  <HealthSummaryOfOwnerDog
                    status={canine?.healthStatus}
                    vaccinations={canine?.vaccinations || []}
                    clearances={canine?.healthClearances || []}
                  />
                </div>
              </div>

              {/* DNA PDF Download or View Section er niche ba bhetore eta add koro */}
              {canine?.DNAdocuments && canine.DNAdocuments.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {canine.DNAdocuments.map((doc: any, i: number) => {
                    const isImage = doc.url?.match(
                      /\.(jpeg|jpg|gif|png|webp)$/i,
                    );

                    return (
                      <div key={i} className="group relative">
                        {isImage ? (
                          <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-700 bg-black/40">
                            <img
                              src={doc.url}
                              alt={doc.name || "DNA document"}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                            />
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noreferrer"
                              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition text-[10px] font-bold uppercase tracking-tighter"
                            >
                              View Image
                            </a>
                          </div>
                        ) : (
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 p-3 bg-white/5 border border-gray-700 rounded-lg hover:bg-white/10 transition group"
                          >
                            <div className="p-2 bg-red-500/20 rounded-md text-red-500">
                              <span className="text-[10px] font-black">
                                PDF
                              </span>
                            </div>
                            <span className="text-xs font-medium truncate text-gray-300">
                              {doc.name || `Document ${i + 1}`}
                            </span>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Lineage */}
              <SectionHeader title="Canine Lineage" />
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  onClick={() => handleRedirect(canine?.litter?.father?.pcrId)}
                  className="bg-slate-50 border rounded-xl p-5 flex justify-between items-center cursor-pointer hover:border-amber-400 hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="flex gap-2 items-center mb-1">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Sire (Father)
                      </p>
                    </div>
                    <p className="font-bold text-slate-800 text-lg">
                      {canine?.litter?.father?.name || "Unknown Lineage"}
                    </p>
                    <p className="text-sm font-mono text-blue-600 mt-1">
                      {canine?.litter?.father?.pcrId || "—"}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                    <FiArrowRight size={18} />
                  </div>
                </div>

                <div
                  onClick={() => handleRedirect(canine?.litter?.mother?.pcrId)}
                  className="bg-slate-50 border rounded-xl p-5 flex justify-between items-center cursor-pointer hover:border-amber-400 hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="flex gap-2 items-center mb-1">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Dam (Mother)
                      </p>
                    </div>
                    <p className="font-bold text-slate-800 text-lg">
                      {canine?.litter?.mother?.name || "Unknown Lineage"}
                    </p>
                    <p className="text-sm font-mono text-blue-600 mt-1">
                      {canine?.litter?.mother?.pcrId || "—"}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                    <FiArrowRight size={18} />
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

export default CanineViewDialog;
