/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Separator } from "@/components/ui/separator";
import {
  FiGrid,
  FiUsers,
  FiLayers,
  FiActivity,
  FiCamera,
  FiMapPin,
  FiExternalLink,
  FiArrowRight,
} from "react-icons/fi";
import { format } from "date-fns";
import { useNavigate } from "react-router";

interface Props {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LitterViewDialog: React.FC<Props> = ({ id, open, onOpenChange }) => {
  const navigate = useNavigate();
  const { data: response, isLoading } = useGetAdminLitterByIdQuery(
    id as string,
    { skip: !id || !open },
  );

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
      <DialogContent className="sm:max-w-[850px] h-[90vh] p-0 overflow-hidden border-0 rounded-2xl shadow-xl bg-white">
        {/* ✅ HEADER (UNCHANGED) */}
        <div className="bg-[#2B4C8A] p-8  text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <FiLayers size={100} />
          </div>
          <DialogHeader>
            <div className="flex items-center gap-4">
              <div className="bg-[#D4AF37] p-3 rounded-xl shadow-lg">
                <FiLayers className="text-[#2B4C8A] size-7" />
              </div>
              <div>
                <DialogTitle className="text-white text-3xl font-black tracking-tight">
                  Litter Group Profile
                </DialogTitle>
                <p className="text-blue-100/70 text-sm uppercase tracking-[0.2em] font-bold mt-1">
                  Official Genealogy & Bloodline Record
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        {isLoading ? (
          <div className="h-[500px] flex flex-col items-center justify-center gap-4 bg-white">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-[#2B4C8A] rounded-full animate-spin" />
            <p className="text-slate-400 text-xs font-black tracking-widest uppercase">
              Synchronizing Registry...
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-[85vh] pb-22  bg-[#FDFDFD]">
            <div className="p-8 space-y-10">
              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <MetricItem label="Litter Name" value={litter?.name} />
                <MetricItem label="PCR ID" value={litter?.pcrId} isMono />
                <MetricItem
                  label="Whelping Date"
                  value={formatDate(litter?.dateOfBirth)}
                />
                <MetricItem
                  label="Registry Tier"
                  value={litter?.tier ? `${litter.tier} Tier` : "—"}
                  highlight
                />
              </div>

              <Separator />

              {/* Details + Lineage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
                <div className="space-y-5">
                  <SectionTitle
                    title="Registry Specifications"
                    icon={<FiGrid size={18} />}
                  />
                  <div className="bg-white border rounded-xl p-5 space-y-4">
                    <DetailRow
                      label="Breed Group"
                      value={litter?.breedRelation?.name}
                    />
                    <DetailRow
                      label="Generation"
                      value={litter?.generation}
                      highlight
                    />
                    <DetailRow
                      label="PCR Breed Code"
                      value={litter?.breedRelation?.pcrCode}
                      isMono
                    />
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        Location
                      </span>
                      <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <FiMapPin className="text-[#D4AF37]" />
                        {litter?.city}, {litter?.state}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <SectionTitle
                    title="Direct Lineage"
                    icon={<FiUsers size={18} />}
                  />
                  <div className="space-y-3">
                    <ParentCard
                      label="Sire (Father)"
                      name={litter?.father?.name}
                      pcrId={litter?.father?.pcrId}
                      onClick={() => handleRedirect(litter?.father?.pcrId)}
                    />
                    <ParentCard
                      label="Dam (Mother)"
                      name={litter?.mother?.name}
                      pcrId={litter?.mother?.pcrId}
                      onClick={() => handleRedirect(litter?.mother?.pcrId)}
                    />
                  </div>
                </div>
              </div>

              {/* Puppies */}
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b pb-3">
                  <SectionTitle
                    title="Offspring Inventory"
                    icon={<FiActivity size={18} />}
                  />
                  <Badge className="bg-[#2B4C8A] text-white text-[10px] px-3">
                    {litter?.puppies?.length || 0}
                  </Badge>
                </div>

                <div className="border rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                      <tr>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">PCR ID</th>
                        <th className="p-4 text-center">Gender</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {litter?.puppies?.length ? (
                        litter.puppies.map((pup: any, i: number) => (
                          <tr
                            key={i}
                            className="border-t hover:bg-slate-50 cursor-pointer"
                            onClick={() => handleRedirect(pup.pcrId)}
                          >
                            <td className="p-4 font-semibold">{pup.name}</td>
                            <td className="p-4 font-mono text-blue-600 text-xs">
                              {pup.pcrId}
                            </td>
                            <td className="p-4 text-center">
                              <Badge variant="secondary">{pup.gender}</Badge>
                            </td>
                            <td className="p-4 text-right">
                              <span className="text-xs font-bold text-slate-400 flex justify-end items-center gap-1">
                                View <FiArrowRight />
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="p-10 text-center text-slate-400"
                          >
                            No puppies found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Media */}
              <div className="space-y-5">
                <SectionTitle
                  title="Media Assets"
                  icon={<FiCamera size={18} />}
                />
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {litter?.images?.length ? (
                    litter.images.map((img: any, idx: number) => (
                      <div
                        key={idx}
                        className="aspect-square rounded-lg overflow-hidden border"
                      >
                        <img
                          src={img.url}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center text-slate-400 text-xs py-8 border rounded-xl border-dashed">
                      No media available
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

/* ---------- Components ---------- */

const MetricItem = ({ label, value, isMono, highlight }: any) => (
  <div>
    <p className="text-[10px] uppercase tracking-wider text-slate-400">
      {label}
    </p>
    <p
      className={`text-sm font-semibold mt-1 ${
        highlight ? "text-amber-500" : "text-slate-800"
      } ${isMono ? "font-mono text-blue-600" : ""}`}
    >
      {value || "—"}
    </p>
  </div>
);

const SectionTitle = ({ icon, title }: any) => (
  <div className="flex items-center gap-2 text-slate-800">
    <span className="text-[#D4AF37]">{icon}</span>
    <span className="text-sm font-bold uppercase tracking-wide">{title}</span>
  </div>
);

const DetailRow = ({ label, value, isMono, highlight }: any) => (
  <div className="flex justify-between border-b pb-2">
    <span className="text-xs text-slate-400 uppercase">{label}</span>
    <span
      className={`text-sm font-medium ${
        highlight ? "text-[#2B4C8A]" : "text-slate-700"
      } ${isMono ? "font-mono text-blue-600" : ""}`}
    >
      {value || "N/A"}
    </span>
  </div>
);

const ParentCard = ({ label, name, pcrId, onClick }: any) => (
  <div
    onClick={onClick}
    className="border rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-[#D4AF37] transition"
  >
    <div>
      <p className="text-[10px] uppercase text-slate-400">{label}</p>
      <p className="font-semibold text-slate-800">{name || "Pending"}</p>
      <p className="text-xs font-mono text-blue-600">{pcrId || "N/A"}</p>
    </div>
    <FiExternalLink className="text-slate-300" />
  </div>
);
