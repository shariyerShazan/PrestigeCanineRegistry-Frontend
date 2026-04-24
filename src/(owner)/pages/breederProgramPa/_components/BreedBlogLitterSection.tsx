import { Button } from "@/components/ui/button";
import { useDeleteBlogLitterMutation, useGetBreederProfileQuery } from "@/redux/features/blog/breederProgramApi";
import { Trash2 } from "lucide-react";
import { CreateLitterModal } from "./CreateLitterModal";
import { useGetMeQuery } from "@/redux/features/auth/authApi";


const BreedBlogLitterSection = () => {
    const { data: userData } = useGetMeQuery(undefined);
    const user = userData?.data;
  const { data: program } = useGetBreederProfileQuery(user?.id as any, { skip: !user?.id });
  const [deleteLitter] = useDeleteBlogLitterMutation();

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure you want to delete this litter?")) {
      await deleteLitter(id);
    }
  };

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto text-center">
      <div className="flex justify-between items-center mb-10 border-b pb-4">
        <h2 className="text-3xl font-serif italic text-slate-800">
          View {program?.programName} Litters
        </h2>
        {/* মোডাল বাটন এখানে */}
        <CreateLitterModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {program?.blogLitters?.map((litter: any) => (
          <div key={litter.id} className="space-y-4 group">
            {/* Images Grid - Fixed 2 Images like your image */}
            <div className="flex gap-1 h-[300px] rounded-lg overflow-hidden shadow-md relative">
              {litter.isComing && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded absolute top-4 left-4 z-10 uppercase">
                  Coming Soon
                </span>
              )}
              <div className="flex-1">
                <img src={litter.images[0]?.url} className="w-full h-full object-cover" alt="Sire" />
              </div>
              <div className="flex-1">
                <img src={litter.images[1]?.url} className="w-full h-full object-cover" alt="Dam" />
              </div>
            </div>

            {/* Info Section */}
            <div className="text-left space-y-1 relative">
              <Button 
                variant="destructive" size="icon" 
                className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDelete(litter.id)}
              >
                <Trash2 className="w-4 h-4"/>
              </Button>
              
              <p className="text-sm font-medium text-slate-700">Sire: <span className="font-bold">{litter.sire.name}</span></p>
              <p className="text-sm font-medium text-slate-700">Litter Size: <span className="font-bold">{litter.litterSize}</span></p>
              <p className="text-sm font-medium text-slate-700">Dam: <span className="font-bold">{litter.dam.name}</span></p>
              
              <p className={`text-[11px] font-bold mt-2 uppercase tracking-[2px] ${
                litter.tier === 'GOLD' ? 'text-amber-500' : 'text-blue-500'
              }`}>
                {litter.tier}: Doberman Pinschers
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreedBlogLitterSection;