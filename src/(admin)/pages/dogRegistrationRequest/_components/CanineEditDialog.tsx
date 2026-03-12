/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @/components/admin/canine/CanineEditDialog.tsx
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
import { useUpdateAdminCanineMutation } from "@/redux/features/admin-canine/admin.canine.api";
import { toast } from "react-toastify";
import { FiEdit3, FiInfo, FiActivity, FiShield } from "react-icons/fi";

interface Props {
  canine: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CanineEditDialog: React.FC<Props> = ({ canine, open, onOpenChange }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [updateCanine, { isLoading }] = useUpdateAdminCanineMutation();

  // Watchers for UI consistency and Select synchronization
  const tier = watch("tier");
  const gender = watch("gender");
  const status = watch("status");
  const healthStatus = watch("healthStatus");

  useEffect(() => {
    if (canine) {
      reset({
        name: canine.name,
        healthStatus: canine.healthStatus || "Excellent",
        microchipId: canine.microchipId,
        tier: canine.tier,
        status: canine.status,
        color: canine.color,
        weight: canine.weight,
        gender: canine.gender,
      });
    }
  }, [canine, reset]);

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        weight: data.weight ? parseFloat(data.weight) : 0,
      };

      const res = await updateCanine({
        id: canine.id,
        data: payload,
      }).unwrap();

      toast.success(res?.message || "Canine updated successfully");
      onOpenChange(false);
    } catch (err: any) {
      const errMsg = err?.data?.message || "Failed to update canine info";
      toast.error(Array.isArray(errMsg) ? errMsg[0] : errMsg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl">
        {/* Header with Visual Identity */}
        <div className="bg-[#2B4C8A] p-6 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FiEdit3 size={80} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2 text-2xl tracking-tight font-bold">
              <FiEdit3 className="text-[#D4AF37]" />
              Edit Canine Record
            </DialogTitle>
            <p className="text-blue-100/70 text-sm mt-1">
              Updating details for PCR ID:{" "}
              <span className="text-[#D4AF37] font-mono font-bold">
                {canine?.pcrId}
              </span>
            </p>
          </DialogHeader>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-white overflow-y-auto max-h-[70vh]"
        >
          <div className="space-y-6">
            {/* Section 1: Basic Profile */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-sm uppercase tracking-wider border-b pb-2">
                <FiInfo /> Basic Profile
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <Label
                    htmlFor="name"
                    className="text-slate-600 font-medium ml-1"
                  >
                    Dog Name
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

            {/* Section 2: Vital Stats & Health */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-sm uppercase tracking-wider border-b pb-2">
                <FiActivity /> Vitals & Health
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

            {/* Section 3: Registry & Compliance */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#2B4C8A] font-bold text-sm uppercase tracking-wider border-b pb-2">
                <FiShield /> Registry & Compliance
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-slate-400 font-medium ml-1">
                    Microchip ID (Read-only)
                  </Label>
                  <Input
                    {...register("microchipId")}
                    readOnly
                    className="h-11 bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed italic"
                  />
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
                    Registration Status
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
              className="hover:bg-slate-100 text-slate-500 font-semibold flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#2B4C8A] hover:bg-[#1a3563] text-white px-8 h-11 transition-all shadow-lg shadow-blue-900/20 font-bold min-w-[140px] flex-1 sm:flex-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                "Update Canine"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CanineEditDialog;
