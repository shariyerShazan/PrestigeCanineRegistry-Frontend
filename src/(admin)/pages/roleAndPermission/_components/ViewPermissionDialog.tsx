/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  LuFingerprint,
  LuMail,
  LuShieldCheck,
  LuUserCog,
} from "react-icons/lu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router";

const ViewPermissionDialog = ({ isOpen, onClose, adminData }: any) => {
  if (!adminData) return null;
  const navigate = useNavigate();

  const handleUserClick = (pcrId: string) => {
    if (!pcrId) return;
    //  setOpen(false);
    navigate(`/admin/dashboard/user-management?pcrId=${pcrId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        {/* Header Section */}
        <div className="bg-[#2B4C8A] p-8 text-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/10 rounded-lg">
                <LuShieldCheck className="size-6 text-[#D4AF37]" />
              </div>
              <DialogTitle className="text-white text-2xl font-bold tracking-tight">
                View Permissions
              </DialogTitle>
            </div>
            <DialogDescription className="text-blue-100/90 space-y-3">
              <p className="text-base">
                Current access levels for{" "}
                <span className="text-white font-bold underline decoration-[#D4AF37] underline-offset-4">
                  {adminData.fullName}
                </span>
              </p>

              {/* Info Badges within Description */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                  <LuMail className="size-3.5 text-blue-200" />
                  <span className="text-xs font-medium">{adminData.email}</span>
                </div>
                <div
                  onClick={() => handleUserClick(adminData.pcrId)}
                  className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full border border-white/10 hover:shadow hover:border-[#D4AF37] hover:cursor-pointer"
                >
                  <LuFingerprint className="size-3.5 text-amber-200" />
                  <span className="text-xs font-medium">
                    ID: {adminData.pcrId || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#D4AF37]/20 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  <LuUserCog className="size-3.5 text-[#D4AF37]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    {adminData.roleType || "Admin"}
                  </span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content Section */}
        <div className="bg-white">
          <ScrollArea className="max-h-[450px] p-6">
            {adminData.permissions?.length > 0 ? (
              <div className="grid gap-3">
                {adminData.permissions.map((p: any, idx: number) => (
                  <div
                    key={idx}
                    className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-100 hover:shadow-md hover:shadow-blue-900/5 transition-all duration-200"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700 text-[13px] uppercase tracking-wide">
                        {p.resource.replace("_", " ")}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Resource Category
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 justify-end max-w-[250px]">
                      {p.canView && (
                        <Badge className="bg-blue-50 text-[#155DFC] hover:bg-blue-100 border-blue-100/50 text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-sm">
                          VIEW
                        </Badge>
                      )}
                      {p.canCreate && (
                        <Badge className="bg-green-50 text-green-600 hover:bg-green-100 border-green-100/50 text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-sm">
                          CREATE
                        </Badge>
                      )}
                      {p.canEdit && (
                        <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-100/50 text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-sm">
                          EDIT
                        </Badge>
                      )}
                      {p.canDelete && (
                        <Badge className="bg-red-50 text-red-600 hover:bg-red-100 border-red-100/50 text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-sm">
                          DELETE
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <div className="size-12 rounded-full bg-slate-50 flex items-center justify-center">
                  <LuShieldCheck className="size-6 text-slate-300" />
                </div>
                <p className="text-center text-slate-400 text-sm font-medium">
                  No active permissions found for this user.
                </p>
              </div>
            )}
          </ScrollArea>

          {/* Footer Action */}
          <div className="p-6 border-t border-slate-50 flex justify-end bg-slate-50/30">
            <button
              onClick={onClose}
              className="px-6 py-2 cursor-pointer bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
            >
              Close Overview
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPermissionDialog;
