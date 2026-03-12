/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @/components/admin/litter/LitterEditDialog.tsx
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
import { FiEdit3, FiInfo, FiActivity, FiShield } from "react-icons/fi";

interface Props {
  litter: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LitterEditDialog: React.FC<Props> = ({ litter, open, onOpenChange }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [updateLitter, { isLoading }] = useUpdateAdminLitterMutation();

  const tier = watch("tier");
  const gender = watch("gender");
  const status = watch("status");
  const healthStatus = watch("healthStatus");

  useEffect(() => {
    if (litter) {
      reset({
        name: litter.name,
        tier: litter.tier,
        gender: litter.gender,
        color: litter.color,
        weight: litter.weight,
        healthStatus: litter.healthStatus || "Excellent",
        microchipId: litter.microchipId,
        status: litter.status,
      });
    }
  }, [litter, reset]);

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        tier: data.tier,
        gender: data.gender,
        color: data.color,
        weight: data.weight ? parseFloat(data.weight) : 0,
        healthStatus: data.healthStatus,
        status: data.status,
      };

      const res = await updateLitter({
        id: litter.id,
        data: payload,
      }).unwrap();

      toast.success(res?.message || "Litter updated successfully");
      onOpenChange(false);
    } catch (err: any) {
      const errMsg = err?.data?.message || "Failed to update litter info";
      toast.error(Array.isArray(errMsg) ? errMsg[0] : errMsg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl">
        {/* Header with Background Pattern */}
        <div className="bg-[#2B4C8A] p-6 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FiEdit3 size={80} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2 text-2xl tracking-tight">
              <FiEdit3 className="text-[#D4AF37]" />
              Edit Litter Registry
            </DialogTitle>
            <p className="text-blue-100/70 text-sm mt-1">
              Update official records for PCR ID:{" "}
              <span className="text-[#D4AF37] font-mono">{litter?.pcrId}</span>
            </p>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white">
          <div className="space-y-6">
            {/* Section: Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-sm uppercase tracking-wider border-b pb-2">
                <FiInfo /> Basic Information
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <Label
                    htmlFor="name"
                    className="text-slate-600 font-medium ml-1"
                  >
                    Litter Name
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className="h-11 border-slate-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/10 transition-all bg-slate-50/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium ml-1">
                    Gender
                  </Label>
                  <Select
                    value={gender}
                    onValueChange={(val) => setValue("gender", val)}
                  >
                    <SelectTrigger className="h-11 border-slate-200 focus:ring-[#D4AF37]/10 bg-slate-50/50">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium ml-1">
                    Color / Marking
                  </Label>
                  <Input
                    id="color"
                    {...register("color")}
                    className="h-11 border-slate-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/10 bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            {/* Section: Physical & Health */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-sm uppercase tracking-wider border-b pb-2">
                <FiActivity /> Health & Metrics
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium ml-1">
                    Weight (kg)
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    {...register("weight")}
                    className="h-11 border-slate-200 focus:border-[#D4AF37] bg-slate-50/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium ml-1">
                    Health Status
                  </Label>
                  <Select
                    value={healthStatus}
                    onValueChange={(val) => setValue("healthStatus", val)}
                  >
                    <SelectTrigger className="h-11 border-slate-200 focus:ring-[#D4AF37]/10 bg-slate-50/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section: Security & Registry */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-sm uppercase tracking-wider border-b pb-2">
                <FiShield /> Registry Controls
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-slate-400 font-medium ml-1">
                    Microchip ID
                  </Label>
                  <div className="relative">
                    <Input
                      {...register("microchipId")}
                      readOnly
                      className="h-11 bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed italic"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium ml-1">
                    Registry Tier
                  </Label>
                  <Select
                    value={tier}
                    onValueChange={(val) => setValue("tier", val)}
                  >
                    <SelectTrigger
                      className={`h-11 border-slate-200 font-bold ${tier === "GOLD" ? "text-[#D4AF37]" : "text-[#2B4C8A]"}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GOLD">GOLD TIER</SelectItem>
                      <SelectItem value="BLUE">BLUE TIER</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 col-span-2">
                  <Label className="text-slate-600 font-medium ml-1">
                    System Status
                  </Label>
                  <Select
                    value={status}
                    onValueChange={(val) => setValue("status", val)}
                  >
                    <SelectTrigger className="h-11 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="UNDER_REVIEW">UNDER REVIEW</SelectItem>
                      <SelectItem value="APPROVED">APPROVED</SelectItem>
                      <SelectItem value="DECLINE">DECLINE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-8 gap-3 border-t pt-6">
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
              className="bg-[#2B4C8A] cursor-pointer hover:bg-[#1a3563] text-white px-8 h-11 transition-all shadow-lg shadow-blue-900/20 font-bold min-w-[140px]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                "Update Record"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LitterEditDialog;
