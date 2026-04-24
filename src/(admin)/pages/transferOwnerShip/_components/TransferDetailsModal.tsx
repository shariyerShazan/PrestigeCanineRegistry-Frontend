/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FiUserCheck, 
  FiHash, 
  FiBox, 
  FiAlertCircle, 
  FiXCircle, 
  FiCheckCircle 
} from "react-icons/fi";

interface TransferDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  details: any;
  onApprove: (userId: string, userName: string) => void;
  onDeclineTransfer: (transferId: string) => void; 
}

const TransferDetailsModal: React.FC<TransferDetailsModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  details,
  onApprove,
  onDeclineTransfer,
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
              Ownership Claim Management
            </DialogTitle>
            <p className="text-blue-100/70 text-xs mt-1">
              Verify claimers and manage asset distribution.
            </p>
          </DialogHeader>
        </div>

        {isLoading ? (
          <div className="h-80 flex flex-col items-center justify-center gap-3 bg-white">
            <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Loading request details...</p>
          </div>
        ) : (
          <div className="bg-white">
            {/* Asset Summary Area */}
            <div className="grid grid-cols-2 gap-4 p-5 bg-slate-50/80 border-b border-slate-100">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Target Asset</span>
                <div className="flex items-center gap-2">
                  <FiBox className="text-blue-600" size={14} />
                  <span className="text-sm font-bold text-slate-800 truncate">
                    {details?.canine?.name || details?.litter?.name || "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Security Code</span>
                <div className="flex items-center gap-2">
                  <FiHash className="text-[#D4AF37]" size={14} />
                  <span className="text-sm font-mono font-bold text-[#2B4C8A] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {details?.transferCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Requester List Section */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  Interested Claimers
                </h4>
                {details?.status === "PENDING" && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-red-500 cursor-pointer hover:text-red-700 hover:bg-red-50 text-[10px] font-bold gap-1"
                    onClick={() => onDeclineTransfer(details.id)}
                  >
                    <FiXCircle /> REJECT ENTIRE TRANSFER
                  </Button>
                )}
              </div>

              <ScrollArea className="h-[320px] pr-4 custom-scrollbar">
                <div className="space-y-3">
                  {details?.requesters?.map((user: any) => (
                    <div
                      key={user.id}
                      className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                        user.isAccepted 
                          ? "bg-green-50/50 border-green-200 shadow-sm" 
                          : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm transition-all ${
                          user.isAccepted ? "bg-green-500" : "bg-gradient-to-br from-slate-400 to-slate-500 group-hover:from-blue-500 group-hover:to-blue-700"
                        }`}>
                          {user.isAccepted ? <FiCheckCircle /> : user.fullName.charAt(0)}
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
                        {details.status === "PENDING" ? (
                          <Button
                            size="sm"
                            onClick={() => onApprove(user.id, user.fullName)}
                            className="bg-[#00A63E] cursor-pointer hover:bg-[#008a34] text-white text-[10px] font-bold h-8 px-4 rounded-lg shadow-md shadow-green-100 transition-transform active:scale-95"
                          >
                            APPROVE
                          </Button>
                        ) : user.isAccepted ? (
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-[9px] font-black uppercase px-3">
                            New Owner
                          </Badge>
                        ) : (
                          <span className="text-[9px] text-slate-400 font-bold uppercase italic">Denied</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {(!details?.requesters || details.requesters.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-16 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                      <FiAlertCircle className="text-slate-300 mb-2" size={32} />
                      <p className="text-xs text-slate-400 font-medium italic">
                        No one has claimed this code yet.
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Footer Alert */}
            <div className="bg-orange-50 p-3 px-6 border-t border-orange-100">
              <p className="text-[10px] text-orange-700 font-medium flex items-center gap-2 italic">
                <FiAlertCircle size={12} />
                Approving a claimer will automatically decline all other pending requests for this asset.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransferDetailsModal;