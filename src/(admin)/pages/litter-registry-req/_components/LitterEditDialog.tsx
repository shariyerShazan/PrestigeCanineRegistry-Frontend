/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateAdminLitterMutation } from "@/redux/features/admin-litter/admin.litter.api";
import { toast } from "react-toastify";
import {
  FiEdit3,
  FiInfo,
  FiShield,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";

interface Props {
  litter: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LitterEditDialog: React.FC<Props> = ({ litter, open, onOpenChange }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [updateLitter, { isLoading }] = useUpdateAdminLitterMutation();

  // Watch values for controlled Select components
  const tier = watch("tier");
  const status = watch("status");
  // const healthStatus = watch("healthStatus");

  useEffect(() => {
    if (litter) {
      reset({
        name: litter.name || "",
        tier: litter.tier,
        status: litter.status,
        dateOfBirth: litter.dateOfBirth
          ? new Date(litter.dateOfBirth).toISOString().split("T")[0]
          : "",
        healthStatus: litter.healthStatus || "Excellent",
        city: litter.city || "",
        state: litter.state || "",
        zipCode: litter.zipCode || "",
        country: litter.country || "USA",
      });
    }
  }, [litter, reset]);

const onSubmit = async (data: any) => {
  try {
    const payload = {
      name: data.name,
      status: data.status,
      tier: data.tier,
      dateOfBirth: data.dateOfBirth, // backend-e conversion handle kora ache
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country,
      // healthStatus: data.healthStatus,
    };

    const res = await updateLitter({
      id: litter.id,
      data: payload,
    }).unwrap();

    toast.success(res?.message || "Litter updated successfully!");
    onOpenChange(false);
  } catch (err: any) {
    const errMsg = err?.data?.message || "Failed to update litter info";
    toast.error(Array.isArray(errMsg) ? errMsg[0] : errMsg);
  }
};
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden border-none shadow-2xl max-h-[95vh] overflow-y-auto">
        {/* Header Section */}
        <div className="bg-[#2B4C8A] p-6 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FiEdit3 size={80} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2 text-2xl tracking-tight">
              <FiEdit3 className="text-[#D4AF37]" />
              Litter Registry Management
            </DialogTitle>
            <div className="flex flex-col gap-1 mt-2">
              <p className="text-blue-100/70 text-sm">
                Official PCR ID:{" "}
                <span className="text-[#D4AF37] font-mono font-bold">
                  {litter?.pcrId}
                </span>
              </p>
              <p className="text-blue-100/50 text-[10px] uppercase tracking-widest">
                Breed: {litter?.breedRelation?.name || "N/A"}
              </p>
            </div>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white">
          <div className="space-y-8">
            {/* Section 1: Core Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-sm uppercase tracking-wider border-b pb-2">
                <FiInfo /> Core Identification
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5 md:col-span-2">
                  <Label className="text-slate-600 font-semibold ml-1">
                    Litter Name / Batch Name
                  </Label>
                  <Input
                    {...register("name")}
                    placeholder="e.g., Golden Guardians Litter A"
                    className="h-11 border-slate-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/10 bg-slate-50/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-semibold ml-1 flex items-center gap-1">
                    <FiCalendar size={14} /> Date of Birth
                  </Label>
                  <Input
                    type="date"
                    {...register("dateOfBirth")}
                    className="h-11 border-slate-200 bg-slate-50/50"
                  />
                </div>
                {/* <div className="space-y-1.5">
                  <Label className="text-slate-600 font-semibold ml-1">
                    Health Assessment
                  </Label>
                  <Select
                    value={healthStatus}
                    onValueChange={(val) => setValue("healthStatus", val)}
                  >
                    <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
            </div>

            {/* Section 2: Origin & Location */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-sm uppercase tracking-wider border-b pb-2">
                <FiMapPin /> Origin Details
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium ml-1">
                    City
                  </Label>
                  <Input
                    {...register("city")}
                    className="h-11 border-slate-200 bg-slate-50/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium ml-1">
                    State
                  </Label>
                  <Input
                    {...register("state")}
                    className="h-11 border-slate-200 bg-slate-50/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium ml-1">
                    Zip Code
                  </Label>
                  <Input
                    {...register("zipCode")}
                    className="h-11 border-slate-200 bg-slate-50/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium ml-1">
                    Country
                  </Label>
                  <Input
                    {...register("country")}
                    className="h-11 border-slate-200 bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Administrative Controls */}
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-sm uppercase tracking-wider border-b border-slate-200 pb-2">
                <FiShield /> Administrative Controls
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-bold ml-1">
                    Registry Tier
                  </Label>
                  <Select
                    value={tier}
                    onValueChange={(val) => setValue("tier", val)}
                  >
                    <SelectTrigger
                      className={`h-11 border-slate-300 font-bold transition-colors ${
                        tier === "GOLD"
                          ? "text-[#D4AF37] bg-yellow-50/50"
                          : "text-[#2B4C8A] bg-blue-50/50"
                      }`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="GOLD"
                        className="font-bold text-[#D4AF37]"
                      >
                        GOLD TIER (Regenerate IDs)
                      </SelectItem>
                      <SelectItem
                        value="BLUE"
                        className="font-bold text-[#2B4C8A]"
                      >
                        BLUE TIER (Regenerate IDs)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-bold ml-1">
                    Verification Status
                  </Label>
                  <Select
                    value={status}
                    onValueChange={(val) => setValue("status", val)}
                  >
                    <SelectTrigger className="h-11 border-slate-300 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="UNDER_REVIEW">UNDER REVIEW</SelectItem>
                      <SelectItem value="APPROVED">
                        APPROVED (Sync All)
                      </SelectItem>
                      <SelectItem value="DECLINE">DECLINED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-2 flex items-start gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                <FiShield className="mt-0.5 flex-shrink-0" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Warning:</strong> Changing the <b>Tier</b> will
                  trigger a backend transaction that regenerates PCR IDs for
                  this litter and all associated puppies. Status changes will
                  also cascade to individual puppy records.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-10 gap-3 border-t pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="hover:bg-slate-100 text-slate-500 font-semibold cursor-pointer"
            >
              Discard Changes
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#2B4C8A] cursor-pointer hover:bg-[#1a3563] text-white px-10 h-12 transition-all shadow-lg shadow-blue-900/20 font-bold min-w-[180px]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Synchronizing...
                </div>
              ) : (
                "Apply Official Updates"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LitterEditDialog;
