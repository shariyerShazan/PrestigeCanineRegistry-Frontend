import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCreateBreedMutation, useUpdateBreedMutation } from "@/redux/features/breed/breed.api";
import { toast } from "react-toastify";

interface BreedDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData?: any;
}

export default function BreedDialog({ open, setOpen, editData }: BreedDialogProps) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  
  const [createBreed, { isLoading: isCreating }] = useCreateBreedMutation();
  const [updateBreed, { isLoading: isUpdating }] = useUpdateBreedMutation();

  useEffect(() => {
    if (editData && open) {
      reset({
        name: editData.name,
        breedCode: editData.breedCode,
        acronym: editData.acronym || "",
        tierEligibility: editData.tierEligibility || "",
        eligibleGen: editData.eligibleGen || "",
      });
      setValue("type", editData.type);
    } else {
      reset({ name: "", breedCode: "", acronym: "", tierEligibility: "", eligibleGen: "" });
      setValue("type", "PUREBRED");
    }
  }, [editData, open, reset, setValue]);

  const onSubmit = async (data: any) => {
    try {
      if (editData) {
        await updateBreed({ breedId: editData.id, ...data }).unwrap();
        toast.success("Breed updated gracefully");
      } else {
        await createBreed(data).unwrap();
        toast.success("Breed created successfully");
      }
      setOpen(false);
      reset();
    } catch (err: any) {
      toast.error(err.data?.message || err.error || "Failed to save breed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editData ? "Edit Breed" : "Add New Breed"}</DialogTitle>
          <DialogDescription>
             Define purebred or designer lines here. Assign unique 3-digit identifiers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Breed Name</Label>
            <Input {...register("name", { required: "Name is required" })} placeholder="e.g. American Bully" />
            {errors.name && <span className="text-red-500 text-xs">{String(errors.name.message)}</span>}
          </div>
          
          <div className="space-y-2">
            <Label>Breed Code</Label>
            <Input {...register("breedCode", { required: "Code is required" })} placeholder="e.g. 119" />
            {errors.breedCode && <span className="text-red-500 text-xs">{String(errors.breedCode.message)}</span>}
          </div>

          <div className="space-y-2">
            <Label>Breed Type</Label>
            <Select onValueChange={(val) => setValue("type", val)} defaultValue={editData?.type || "PUREBRED"}>
              <SelectTrigger>
                <SelectValue placeholder="Select classification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUREBRED">PUREBRED</SelectItem>
                <SelectItem value="DESIGNER">DESIGNER</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Acronym</Label>
            <Input {...register("acronym", { required: "Acronym is required" })} placeholder="e.g. ABY" />
            {errors.acronym && <span className="text-red-500 text-xs">{String(errors.acronym.message)}</span>}
          </div>

          <div className="space-y-2">
            <Label>Tier Eligibility</Label>
            <Input {...register("tierEligibility")} placeholder="e.g. Gold - Auto Eligible" />
          </div>

          <div className="space-y-2">
            <Label>Eligible Generations</Label>
            <Input {...register("eligibleGen")} placeholder="e.g. F1, F1B" />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button disabled={isCreating || isUpdating} type="submit" className="bg-[#E17100] hover:bg-[#c96500]">
              {editData ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
