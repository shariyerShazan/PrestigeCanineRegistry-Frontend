/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCcw, Loader2, Copy } from "lucide-react";
import { useGetMyCaninesQuery } from "@/redux/features/canine/canine.api";
import { useGetMyLittersQuery } from "@/redux/features/litter/litter.api";
import { useCreateTransferRequestMutation } from "@/redux/features/transfer-owner/transfer-owner.api";
import { toast } from "react-toastify";

export const TransferOtherOwner = () => {
  const [selectedType, setSelectedType] = useState<"canine" | "litter">(
    "canine",
  );
  const [selectedId, setSelectedId] = useState("");
  const [transferCode, setTransferCode] = useState("");
  const [copyed, setCopyed] = useState(false);

  // Fetching real data
  const { data: canines, isLoading: loadingCanines } = useGetMyCaninesQuery({
    limit: 100,
  });
  const { data: litters, isLoading: loadingLitters } = useGetMyLittersQuery({
    limit: 100,
  });
  const [createTransfer, { isLoading: isCreating }] =
    useCreateTransferRequestMutation();

  const handleGenerateCode = async () => {
    if (!selectedId) return toast.error("Please select a canine or litter");
    try {
      const payload =
        selectedType === "canine"
          ? { canineId: selectedId }
          : { litterId: selectedId };
      const res = await createTransfer(payload).unwrap();
      setTransferCode(res.transferCode);
      toast.success("Code generated!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to generate code");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transferCode);
    setCopyed(true);
    setTimeout(() => setCopyed(false), 2000);
  };

  const handleClear = () => {
    setTransferCode("");
    setSelectedId("");
  };

  const selectedItem =
    selectedType === "canine"
      ? canines?.data?.find((c: any) => c.id === selectedId)
      : litters?.data?.find((l: any) => l.id === selectedId);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Type:</label>
          <Select
            value={selectedType}
            onValueChange={(val: any) => {
              setSelectedType(val);
              setSelectedId("");
            }}
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="canine">Canine</SelectItem>
              <SelectItem value="litter">Litter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Select {selectedType}:</label>
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue
                placeholder={
                  loadingCanines || loadingLitters ? "Loading..." : "Select one"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {selectedType === "canine"
                ? canines?.data?.map((dog: any) => (
                    <SelectItem key={dog.id} value={dog.id}>
                      {dog.name}
                    </SelectItem>
                  ))
                : litters?.data?.map((l: any) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.name || `Litter ${l.pcrId}`}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">PCR ID:</label>
        <Input
          value={selectedItem?.pcrId || "---"}
          readOnly
          className="bg-gray-50"
        />
      </div>

      {transferCode && (
        <div className="flex items-center justify-between p-4 rounded-lg animate-in fade-in duration-500">
          <div className="flex justify-center items-center gap-3">
            <p className="text-sm text-gray-600 font-medium">Your code is:</p>
            <span className="text-lg font-black italic tracking-widest bg-gray-50 p-2 rounded-md">
              {transferCode.split("").join(" ")}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-50 text-[#2B4C8A] border-[#2B4C8A]"
              onClick={handleCopy}
            >
              <Copy size={16} /> {copyed ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-2">
        <Button
          variant="outline"
          onClick={handleClear}
          className="text-[#2B4C8A] cursor-pointer border-[#2B4C8A] flex gap-2"
        >
          <RefreshCcw size={16} /> Clear
        </Button>
        <Button
          disabled={!selectedId || !!transferCode || isCreating}
          onClick={handleGenerateCode}
          className="bg-[#D4AF37] cursor-pointer hover:bg-[#e4ba32] text-white px-8"
        >
          {isCreating ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Generate Transfer Code"
          )}
        </Button>
      </div>
    </div>
  );
};

export default TransferOtherOwner;
