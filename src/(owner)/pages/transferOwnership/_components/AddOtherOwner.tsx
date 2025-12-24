
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge"; 

const AddOtherOwner = () => {
  const [inputCode, setInputCode] = useState("");
  const [showTable, setShowTable] = useState(false);

  const handleRequestOwnership = () => {
    // Logic to verify code and show table
    if (inputCode.length === 5) {
      setShowTable(true);
    }
  };

  const handleClear = () => {
    setInputCode("");
    setShowTable(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium ">Enter Ownership Transfer Code:</label>
        <Input 
          placeholder="e.g. 10542" 
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          maxLength={5}
          className="h-12 text-lg mt-2"
          disabled={showTable} 
        />
      </div>

      {showTable && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="border rounded-xl overflow-hidden bg-gray-50/50">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100/80 text-[10px] uppercase font-bold text-gray-600">
                <tr>
                  <th className="px-4 py-3">Dog Name</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">Request Type</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-bold text-gray-900">Max Thunder</div>
                    <div className="text-[11px] text-gray-400">#PCR-LR-009876</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-bold text-gray-900">Michael Chen</div>
                    <div className="text-[11px] text-gray-400">PCR-OW-008765</div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">Ownership Transfer</td>
                  <td className="px-4 py-4 text-gray-600">11/27/2024</td>
                  <td className="px-4 py-4 text-center">
                    <Badge variant="secondary" className="bg-gray-200 text-gray-600 hover:bg-gray-200 font-normal px-3">
                      Pending
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="mt-4 text-sm text-yellow-600 font-medium italic">
            Your ownership transfer request has been sent to PCR Admin. You will get notified when it's done.
          </p>
        </div>
      )}

      <div className="flex justify-between items-center pt-6">
        <Button 
          variant="outline" 
          onClick={handleClear}
          className="text-[#2B4C8A] border-[#2B4C8A] hover:bg-blue-50 cursor-pointer flex gap-2"
        >
          <RefreshCcw size={16} /> Clear
        </Button>
        
        {!showTable ? (
          <Button 
            className="bg-[#D4AF37] hover:bg-[#e3b82b] text-white px-8 cursor-pointer"
            onClick={handleRequestOwnership}
            disabled={inputCode.length < 5}
          >
            Request Ownership
          </Button>
        ) : (
          <Button disabled className="bg-gray-300 text-[#7D7D7D] cursor-not-allowed px-8">
            Request Ownership
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddOtherOwner;