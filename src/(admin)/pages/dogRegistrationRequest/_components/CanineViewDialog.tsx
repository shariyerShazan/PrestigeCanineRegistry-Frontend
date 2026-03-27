/* eslint-disable @typescript-eslint/no-explicit-any */

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
  FiShield,
  FiCamera,
  FiLayers,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";
import { format } from "date-fns";
import { useNavigate } from "react-router";

interface Props {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CanineViewDialog: React.FC<Props> = ({ id, open, onOpenChange }) => {
  const navigate = useNavigate();

  const { data: response, isLoading } = useGetAdminCanineByIdQuery(
    id as string,
    { skip: !id || !open },
  );

  const canine = response?.data;

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[950px] p-0 overflow-hidden border-0 rounded-2xl shadow-xl bg-white">
        {/* Header */}
        <div className="bg-[#2B4C8A] px-10 py-8 text-white relative">
          <div className="absolute right-0 top-0 opacity-10">
            <FiLayers size={140} />
          </div>

          <DialogHeader className="relative z-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-400 rounded-xl text-slate-900">
                  <FiShield size={26} />
                </div>

                <div>
                  <DialogTitle className="text-2xl font-semibold tracking-tight">
                    {canine?.name || "Canine Profile"}
                  </DialogTitle>
                  <p className="text-xs text-slate-300 tracking-widest uppercase mt-1">
                    Verified PCR Registry Record
                  </p>
                </div>
              </div>

              <div className="text-right">
                <Badge className="bg-amber-400 text-slate-900 px-4 py-1 text-xs font-semibold rounded-md">
                  {canine?.tier} Tier
                </Badge>
                <p className="text-sm font-mono mt-2 text-slate-200">
                  {canine?.pcrId}
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        {isLoading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Loading registry data...
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-[85vh]">
            <div className="p-8 space-y-10">
              {/* Identity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  {canine?.images?.[0]?.url ? (
                    <img
                      src={canine.images[0].url}
                      className="w-full aspect-square object-cover rounded-xl border"
                    />
                  ) : (
                    <div className="w-full aspect-square flex flex-col items-center justify-center border rounded-xl text-slate-300">
                      <FiCamera size={40} />
                      <span className="text-xs mt-2">No Photo</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border">
                  <DetailItem
                    label="Breed"
                    value={canine?.breedRelation?.name}
                  />
                  <DetailItem
                    label="DOB"
                    value={formatDate(canine?.dateOfBirth)}
                  />
                  <DetailItem label="Gender" value={canine?.gender} highlight />
                  <DetailItem
                    label="Generation"
                    value={canine?.generation || "PURE BREED"}
                  />
                  <DetailItem
                    label="Microchip"
                    value={canine?.microchipId}
                    isMono
                  />
                  <DetailItem label="Color" value={canine?.color} />
                  <DetailItem
                    label="Weight"
                    value={canine?.weight ? `${canine.weight} KG` : "N/A"}
                  />
                  <DetailItem label="Status" value={canine?.status} isBadge />
                </div>
              </div>

              {/* Lineage */}
              <SectionHeader title="Lineage" />
              <div className="grid md:grid-cols-2 gap-6">
                <ParentCard
                  type="Sire"
                  data={canine?.litter?.father}
                  onClick={() => handleRedirect(canine?.litter?.father?.pcrId)}
                />
                <ParentCard
                  type="Dam"
                  data={canine?.litter?.mother}
                  onClick={() => handleRedirect(canine?.litter?.mother?.pcrId)}
                />
              </div>

              {/* Owner + Health */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <SectionHeader title="Owner" />
                  <div className="bg-white border rounded-xl p-6 space-y-3">
                    <DetailRow label="Name" value={canine?.owner?.fullName} />
                    <DetailRow label="Email" value={canine?.owner?.email} />
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-3">
                      <FiMapPin />
                      {canine?.city}, {canine?.state}, {canine?.country}
                    </div>
                  </div>
                </div>

                <div>
                  <SectionHeader title="Health" />
                  <div className="bg-white border rounded-xl p-6 space-y-4">
                    <Badge className="bg-green-100 text-green-700 px-3 py-1 text-xs">
                      {canine?.healthStatus || "OPTIMAL"}
                    </Badge>

                    <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border">
                      {canine?.healthNotes ||
                        "No clinical health observations recorded."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Siblings */}
              {canine?.siblings?.length > 0 && (
                <div>
                  <SectionHeader title="Siblings" />
                  <div className="grid md:grid-cols-4 gap-4">
                    {canine.siblings.map((sib: any, idx: number) => (
                      <div
                        key={idx}
                        onClick={() => handleRedirect(sib.pcrId)}
                        className="border rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-amber-400 transition"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                          {sib.images?.[0]?.url && (
                            <img
                              src={sib.images[0].url}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium truncate">
                            {sib.name}
                          </p>
                          <p className="text-xs text-blue-600 font-mono">
                            {sib.pcrId}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transfers */}
              <div>
                <SectionHeader title="Ownership Transfers" />
                <div className="border rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                      <tr>
                        <th className="p-4">Code</th>
                        <th>Seller</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th className="text-right p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {canine?.transfers?.length ? (
                        canine.transfers.map((t: any, i: number) => (
                          <tr key={i} className="border-t">
                            <td className="p-4 font-mono text-blue-600">
                              {t.transferCode}
                            </td>
                            <td>{t.currentOwner?.fullName}</td>
                            <td>{t.newOwner?.fullName || "Pending"}</td>
                            <td>{formatDate(t.createdAt)}</td>
                            <td className="text-right p-4">
                              <Badge className="text-xs">{t.status}</Badge>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="text-center p-10 text-slate-400"
                          >
                            No transfer records
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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

/* ---------- Sub Components ---------- */

const SectionHeader = ({ title }: any) => (
  <div className="mb-4 border-b pb-2">
    <h3 className="text-sm font-semibold tracking-wide text-slate-700 uppercase">
      {title}
    </h3>
  </div>
);

const DetailItem = ({ label, value, isMono, isBadge, highlight }: any) => (
  <div>
    <p className="text-[10px] uppercase tracking-wider text-slate-400">
      {label}
    </p>
    {isBadge ? (
      <Badge className="mt-1 text-xs">{value || "N/A"}</Badge>
    ) : (
      <p
        className={`mt-1 text-sm font-medium ${
          highlight ? "text-amber-500" : "text-slate-800"
        } ${isMono ? "font-mono text-blue-600" : ""}`}
      >
        {value || "—"}
      </p>
    )}
  </div>
);

const DetailRow = ({ label, value }: any) => (
  <div className="flex justify-between text-sm py-1">
    <span className="text-slate-400">{label}</span>
    <span className="font-medium text-slate-800">{value || "N/A"}</span>
  </div>
);

const ParentCard = ({ type, data, onClick }: any) => (
  <div
    onClick={onClick}
    className="border rounded-xl p-5 flex justify-between items-center cursor-pointer hover:border-amber-400 transition"
  >
    <div>
      <p className="text-xs uppercase text-slate-400">{type}</p>
      <p className="font-semibold text-slate-800">{data?.name || "Pending"}</p>
      <p className="text-xs font-mono text-blue-600">{data?.pcrId || "N/A"}</p>
    </div>
    <FiArrowRight className="text-slate-300" />
  </div>
);
