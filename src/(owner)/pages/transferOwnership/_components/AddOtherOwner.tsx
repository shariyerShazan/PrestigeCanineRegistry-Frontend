/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCcw, Loader2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useClaimTransferMutation } from "@/redux/features/transfer-owner/transfer-owner.api";
import { toast } from "react-toastify";
import { useCalculatePricing } from "@/Layout/OwnerLayout";

const AddOtherOwner = () => {
  const [inputCode, setInputCode] = useState("");
  const [claimData, setClaimData] = useState<any>(null);
  const [claim, { isLoading }] = useClaimTransferMutation();
  const { transferPrice } = useCalculatePricing();
const handleRequestOwnership = async () => {
    try {
      const res = await claim({ transferCode: inputCode }).unwrap();
      
      if (res?.url) {
        toast.info("Redirecting to payment...");
        window.location.href = res.url;
        return; 
      }

      setClaimData(res);
      toast.success("Transfer processed successfully!");
      
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Invalid or expired code";
      toast.error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
    }
  };

  const handleClear = () => {
    setInputCode("");
    setClaimData(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Enter Ownership Transfer Code:
        </label>
        <Input
          placeholder="e.g. TRF-X82K9L"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value.toUpperCase())}
          className="h-12 text-lg mt-2"
          disabled={!!claimData}
        />
      </div>

      {claimData && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="border rounded-xl overflow-hidden bg-gray-50/50">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100/80 text-[10px] uppercase font-bold text-gray-600">
                <tr>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-bold text-gray-900">
                      {claimData.isVerified
                        ? "Verification Done"
                        : "Verification Failed"}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {claimData.status === "PENDING" && claimData.isVerified
                        ? "Waiting for administrator review and final approval."
                        : "The item has been added to your profile."}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {claimData.status === "PENDING" ? (
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 font-normal px-3 flex items-center justify-center gap-1 border-amber-200">
                        <Clock size={12} /> Pending Approval
                      </Badge>
                    ) : (
                      <Badge className="bg-[#01663030] text-[#016630] hover:bg-[#01663030] font-normal px-3">
                        Approved
                      </Badge>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">
              Your code has been successfully verified. It will be added to your
              profile after admin approval.
            </p>
          </div>
        </div>
      )}

              <div className="flex justify-between items-center pt-6">
          <Button
            variant="outline"
            onClick={handleClear}
            className="text-[#2B4C8A] border-[#2B4C8A] flex gap-2 cursor-pointer"
          >
            <RefreshCcw size={16} /> Clear
          </Button>
          
          <Button
            className="bg-[#D4AF37] hover:bg-[#e3b82b] text-white px-8 cursor-pointer"
            onClick={handleRequestOwnership}
            disabled={inputCode.length < 5 || isLoading || !!claimData}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Verify & Claim 
                <span className="ml-1 opacity-90">
                  {transferPrice > 0 ? `($${transferPrice.toFixed(2)})` : "(Free)"}
                </span>
              </>
            )}
          </Button>
        </div>
    </div>
  );
};

export default AddOtherOwner;
