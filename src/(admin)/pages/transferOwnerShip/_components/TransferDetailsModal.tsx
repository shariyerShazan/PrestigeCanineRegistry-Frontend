
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FiUserCheck, 
  FiHash, 
  FiBox, 
  FiAlertCircle, 
  FiCheckCircle,
  FiArrowRight,
  FiUser
} from "react-icons/fi";

interface TransferDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  details: any;
}

const TransferDetailsModal: React.FC<TransferDetailsModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  details,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#2B4C8A] to-[#1e3a6d] p-6 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FiUserCheck size={60} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2 text-xl font-bold">
              <FiUserCheck className="text-[#D4AF37]" />
              Ownership Transfer Tracking
            </DialogTitle>
            <p className="text-blue-100/70 text-xs mt-1">
              Asset transfer journey and claimant history.
            </p>
          </DialogHeader>
        </div>

        {isLoading ? (
          <div className="h-80 flex flex-col items-center justify-center gap-3 bg-white">
            <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Loading details...</p>
          </div>
        ) : (
          <div className="bg-white">
            {/* 1. Asset & Code Summary */}
            <div className="grid grid-cols-2 gap-4 p-5 bg-slate-50/80 border-b border-slate-100">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Target Asset</span>
                <div className="flex items-center gap-2">
                  <FiBox className="text-blue-600" size={14} />
                  <span className="text-sm font-bold text-slate-800 truncate">
                    {details?.canine?.name || details?.litter?.name || "N/A"}
                  </span>
                </div>
                <span className="text-[10px] text-blue-500 font-mono font-bold">
                  {details?.canine?.pcrId || details?.litter?.pcrId}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Security Code</span>
                <div className="flex items-center gap-2">
                  <FiHash className="text-[#D4AF37]" size={14} />
                  <span className="text-sm font-mono font-bold text-[#2B4C8A] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {details?.transferCode}
                  </span>
                </div>
                <Badge variant="outline" className={`w-fit mt-1 text-[9px] ${details?.status === 'APPROVE' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                  {details?.status}
                </Badge>
              </div>
            </div>

            {/* 2. Transfer Journey (From -> To) */}
            <div className="p-5 border-b border-slate-50 bg-white">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Transfer Journey</h4>
               <div className="flex items-center justify-between gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {/* Current/Old Owner */}
                  <div className="flex-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Original Owner</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{details?.currentOwner?.fullName}</p>
                    <p className="text-[10px] text-slate-500">{details?.currentOwner?.pcrId}</p>
                  </div>

                  <FiArrowRight className="text-slate-300 animate-pulse" size={20} />

                  {/* New Owner */}
                  <div className="flex-1 text-right">
                    <p className="text-[9px] font-bold text-green-600 uppercase">New Owner</p>
                    {details?.newOwner ? (
                      <>
                        <p className="text-sm font-bold text-slate-800 truncate">{details?.newOwner?.fullName}</p>
                        <p className="text-[10px] text-slate-500">{details?.newOwner?.pcrId}</p>
                      </>
                    ) : (
                      <p className="text-xs italic text-slate-400">Waiting for payment...</p>
                    )}
                  </div>
               </div>
            </div>

            {/* 3. Requester List Section */}
            <div className="p-6">
              <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                Claim History & Requesters
              </h4>

              <ScrollArea className="h-[250px] pr-4 custom-scrollbar">
                <div className="space-y-3">
                  {details?.requesters?.map((user: any) => (
                    <div
                      key={user.id}
                      className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                        user.isAccepted 
                          ? "bg-green-50/50 border-green-200" 
                          : "bg-white border-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                          user.isAccepted ? "bg-green-500" : "bg-slate-200 text-slate-500"
                        }`}>
                          {user.isAccepted ? <FiCheckCircle /> : <FiUser />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {user.fullName}
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">
                            {user.pcrId} • {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {user.isAccepted ? (
                          <Badge className="bg-green-600 text-white border-none text-[8px] font-black uppercase px-2">
                            Owner
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[8px] text-slate-400 border-slate-200 uppercase px-2">
                            Claimed
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}

                  {(!details?.requesters || details.requesters.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-10 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                      <FiAlertCircle className="text-slate-300 mb-2" size={24} />
                      <p className="text-[11px] text-slate-400 font-medium italic">
                        No claimants found for this code.
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransferDetailsModal;