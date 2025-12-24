
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransferOtherOwner from "./_components/TransferOtherOwner";
import AddOtherOwner from "./_components/AddOtherOwner";


const TransferOwner = () => {
  return (
   <div className="min-h-[65vh] ">
    <div className="w-full max-w-2xl  mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Transfer Ownership Between PCR Members
      </h2>

      <Tabs defaultValue="transfer" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-transparent border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="transfer"
            className="rounded-none cursor-pointer border-b-2 border-transparent  data-[state=active]:border-b-yellow-600 data-[state=active]:bg-transparent text-lg pb-2"
          >
            Transfer to other owner
          </TabsTrigger>
          <TabsTrigger
            value="add"
            className="rounded-none cursor-pointer border-b-2 border-transparent data-[state=active]:border-b-yellow-600 data-[state=active]:bg-transparent text-lg pb-2"
          >
            Add from other owner
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transfer" className="mt-6">
          <TransferOtherOwner />
        </TabsContent>

        <TabsContent value="add" className="mt-6">
          <AddOtherOwner />
        </TabsContent>
      </Tabs>
    </div>
    </div>
  );
};

export default TransferOwner;