import { useState, useRef } from "react";
import { useCreateBlogLitterMutation } from "@/redux/features/blog/breederProgramApi";
import { useGetAllBreedsQuery } from "@/redux/features/breed/breed.api"; // Breed API ইম্পোর্ট করুন
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Image as ImageIcon, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-toastify";

export const CreateLitterModal = () => {
  const [open, setOpen] = useState(false);
  const [createLitter, { isLoading: isCreating }] = useCreateBlogLitterMutation();
  
  // ১. সব ব্রিড গেট করা
  const { data: breedsRes, isLoading: breedsLoading } = useGetAllBreedsQuery(undefined);
  const breeds = breedsRes || []; // আপনার API structure অনুযায়ী breedsRes?.data হতে পারে

  const formRef = useRef<HTMLFormElement>(null);
  const sireInputRef = useRef<HTMLInputElement>(null);
  const damInputRef = useRef<HTMLInputElement>(null);

  const [sireFile, setSireFile] = useState<File | null>(null);
  const [damFile, setDamFile] = useState<File | null>(null);
  const [previews, setPreviews] = useState<{ sire?: string; dam?: string }>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'sire' | 'dam') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'sire') setSireFile(file);
      else setDamFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({ ...prev, [type]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setSireFile(null);
    setDamFile(null);
    setPreviews({});
    formRef.current?.reset();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!sireFile || !damFile) {
      return toast.error("Please upload both Sire and Dam images.");
    }

    const formData = new FormData(e.currentTarget);
    formData.delete("images"); 
    formData.append("images", sireFile);
    formData.append("images", damFile);

    try {
      await createLitter(formData).unwrap();
      toast.success("Litter published successfully!");
      setOpen(false);
      resetForm();
    } catch (err: any) {
      toast.error(err?.data?.message?.[0] || err?.data?.message || "Failed to create litter");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if(!val) resetForm(); }}>
      <DialogTrigger asChild>
        <Button className="bg-slate-900 hover:bg-black text-white px-6 shadow-xl transition-all">
          <Plus className="w-5 h-5 mr-2" /> Add New Litter
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-slate-900 p-6 text-white relative">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif italic tracking-wide text-white">Create Exclusive Litter</DialogTitle>
            <p className="text-slate-400 text-sm">Fill in the details to showcase your newest program addition.</p>
          </DialogHeader>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Sire ID</Label>
              <Input name="sireId" required className="bg-slate-50 border-slate-200" placeholder="Parent Alpha ID" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Dam ID</Label>
              <Input name="damId" required className="bg-slate-50 border-slate-200" placeholder="Parent Beta ID" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* ২. ব্রিড সিলেক্ট ড্রপডাউন */}
            <div className="col-span-2 space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Select Breed</Label>
              <Select name="breedId" required>
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue placeholder={breedsLoading ? "Loading breeds..." : "Select Lineage"} />
                </SelectTrigger>
                <SelectContent>
                  {breeds.map((breed: any) => (
                    <SelectItem key={breed.id} value={breed.id}>
                      {breed.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Size</Label>
              <Input name="litterSize" type="number" required className="bg-slate-50 border-slate-200" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Listing Tier</Label>
              <Select name="tier" defaultValue="GOLD">
                <SelectTrigger className="bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="GOLD">GOLD TIER</SelectItem>
                  <SelectItem value="BLUE">BLUE TIER</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Availability</Label>
              <Select name="isComing" defaultValue="false">
                <SelectTrigger className="bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Available Now</SelectItem>
                  <SelectItem value="true">Coming Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Sire Photo</Label>
              <div 
                onClick={() => sireInputRef.current?.click()}
                className="relative group border-2 border-dashed border-slate-200 rounded-xl h-32 flex items-center justify-center overflow-hidden hover:border-slate-400 transition-all bg-slate-50 cursor-pointer"
              >
                {previews.sire ? (
                  <div className="relative w-full h-full">
                    <img src={previews.sire} className="w-full h-full object-cover" alt="Sire Preview" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold uppercase">Change</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-[10px] mt-1 font-semibold">UPLOAD SIRE</span>
                  </div>
                )}
                <input ref={sireInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'sire')} />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Dam Photo</Label>
              <div 
                onClick={() => damInputRef.current?.click()} 
                className="relative group border-2 border-dashed border-slate-200 rounded-xl h-32 flex items-center justify-center overflow-hidden hover:border-slate-400 transition-all bg-slate-50 cursor-pointer"
              >
                {previews.dam ? (
                  <div className="relative w-full h-full">
                    <img src={previews.dam} className="w-full h-full object-cover" alt="Dam Preview" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold uppercase">Change</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-slate-400">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-[10px] mt-1 font-semibold">UPLOAD DAM</span>
                  </div>
                )}
                <input ref={damInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'dam')} />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isCreating}
            className="w-full bg-slate-900 hover:bg-black text-white py-6 rounded-xl font-bold text-lg shadow-xl transition-all disabled:opacity-50"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : "Publish Litter"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};