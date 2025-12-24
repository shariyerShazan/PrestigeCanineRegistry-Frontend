import  { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCcw, Send, Copy } from "lucide-react";
import { toast } from "react-toastify";

export const TransferOtherOwner = () => {
  const [transferCode, setTransferCode] = useState("");
  const [dogName, setDogName] = useState("Bella Daisy");

  const generateCode = () => {
    // 5 digit random number generation
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    setTransferCode(code);
  };

  const handleClear = () => {
    setTransferCode("");
  };

const handleCopy = () => {
  if (transferCode) {
    navigator.clipboard.writeText(transferCode);
    toast.success("Generated code copied");
  } else {
    toast.error("No code to copy!");
  }
};

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Dog:</label>
        <Select defaultValue={dogName} onValueChange={setDogName}>
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder="Select a dog" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bella Daisy">Bella Daisy</SelectItem>
            <SelectItem value="Max">Max</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">PCR ID:</label>
        <Input value="#PCR-LR-009876" readOnly className="bg-gray-50" />
      </div>

      {transferCode && (
        <div className="flex items-center justify-between  p-4 rounded-lg animate-in fade-in duration-500">
          <div className="flex justify-center items-center gap-3">
              <p className="text-sm text-gray-600 font-medium">Your ownership transfer code is:</p>
           <span className="text-lg font-black italic tracking-widest bg-gray-50 p-2 rounded-md">{transferCode.split('').join(' ')}</span>
          </div>
          <div className="flex items-center gap-2">  
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex gap-2  bg-gray-50 text-[#2B4C8A] border-[#2B4C8A] cursor-pointer">
                <Send size={16} /> Send
              </Button>
              <Button variant="outline" size="sm" className="flex gap-2 bg-gray-50 text-[#2B4C8A] border-[#2B4C8A] cursor-pointer" onClick={handleCopy}>
                <Copy size={16} /> Copy
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-2">
        <Button variant="outline" onClick={handleClear} className="text-[#2B4C8A] cursor-pointer border-[#2B4C8A] flex gap-2">
          <RefreshCcw size={16} /> Clear
        </Button>
        
        {!transferCode ? (
          <Button 
            onClick={generateCode}
            className="bg-[#D4AF37] hover:bg-[#e4ba32] cursor-pointer text-white px-8"
          >
            Generate Transfer Code
          </Button>
        ) : (
           <Button disabled className="bg-gray-300 text-gray-500 px-8">
            Generate Transfer Code
          </Button>
        )}
      </div>
    </div>
  );
};

export default TransferOtherOwner;