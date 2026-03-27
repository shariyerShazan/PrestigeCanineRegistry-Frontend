import React, { useEffect, useState } from "react";
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
import { Percent, DollarSign, Briefcase } from "lucide-react";

// 1. ServiceInput ke baire niye asha hoyeche jate focus na haray
const ServiceInput = ({
  label,
  priceKey,
  discountKey,
  formData,
  setFormData,
}: any) => (
  <div className="p-4 rounded-md border border-gray-200 bg-white shadow-sm space-y-3">
    <div className="flex items-center gap-2 border-b pb-2 mb-2">
      <Briefcase size={14} className="text-[#2B4C8A]" />
      <Label className="font-bold text-xs text-[#2B4C8A] uppercase">
        {label}
      </Label>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <Label className="text-[10px] uppercase font-bold text-gray-400">
          Base Price
        </Label>
        <div className="relative">
          <span className="absolute left-2.5 top-2 text-gray-400">
            <DollarSign size={12} />
          </span>
          <Input
            type="number"
            className="pl-7 h-8 text-xs bg-gray-50 rounded-sm"
            value={formData[priceKey]}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                [priceKey]: Number(e.target.value),
              }))
            }
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-[10px] uppercase font-bold text-gray-400">
          Discount (%)
        </Label>
        <div className="relative">
          <span className="absolute right-2.5 top-2 text-gray-400">
            <Percent size={12} />
          </span>
          <Input
            type="number"
            max={100}
            min={0}
            className="pr-7 h-8 text-xs bg-gray-50 rounded-sm"
            value={formData[discountKey]}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                [discountKey]: Number(e.target.value),
              }))
            }
          />
        </div>
      </div>
    </div>
  </div>
);

const MemberShipCreateEditDialog = ({
  open,
  setOpen,
  onSubmit,
  initialData,
  isLoading,
}: any) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    currentPrice: 0,
    canineLimit: 1,
    canineRegDiscount: 0,
    litterRegDiscount: 0,
    transferDiscount: 0,
    certificateDiscount: 0,
    canineRegPrice: 0,
    litterRegPrice: 0,
    transferPrice: 0,
    certificatePrice: 0,
  });

  useEffect(() => {
    if (initialData && open) {
      const prices: any = {
        canineRegPrice: 0,
        litterRegPrice: 0,
        transferPrice: 0,
        certificatePrice: 0,
      };

      initialData.servicePricings?.forEach((p: any) => {
        if (p.serviceType === "CANINE_REG") prices.canineRegPrice = p.price;
        if (p.serviceType === "LITTER_REG") prices.litterRegPrice = p.price;
        if (p.serviceType === "TRANSFER") prices.transferPrice = p.price;
        if (p.serviceType === "CERTIFICATE") prices.certificatePrice = p.price;
      });

      setFormData({
        name: initialData.name || "",
        currentPrice: initialData.currentPrice || 0,
        canineLimit: initialData.canineLimit || 0,
        canineRegDiscount: Math.round(
          (initialData.canineRegDiscount || 0) * 100,
        ),
        litterRegDiscount: Math.round(
          (initialData.litterRegDiscount || 0) * 100,
        ),
        transferDiscount: Math.round((initialData.transferDiscount || 0) * 100),
        certificateDiscount: Math.round(
          (initialData.certificateDiscount || 0) * 100,
        ),
        ...prices,
      });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      canineRegDiscount: formData.canineRegDiscount / 100,
      litterRegDiscount: formData.litterRegDiscount / 100,
      transferDiscount: formData.transferDiscount / 100,
      certificateDiscount: formData.certificateDiscount / 100,
    };
    onSubmit(submissionData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-md border-slate-200">
        <DialogHeader className="p-5 bg-white border-b sticky top-0 z-10">
          <DialogTitle className="text-lg font-bold text-slate-800">
            Edit Tier: {initialData?.tier}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-5 space-y-6 bg-slate-50/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-600">
                Plan Name
              </Label>
              <Input
                className="bg-white h-9 rounded-sm text-sm"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-600">
                Annual Price ($)
              </Label>
              <Input
                type="number"
                className="bg-white h-9 rounded-sm text-sm"
                value={formData.currentPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentPrice: Number(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-600">
                Canine Limit
              </Label>
              <Input
                type="number"
                className="bg-white h-9 rounded-sm text-sm"
                value={formData.canineLimit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    canineLimit: Number(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-1">
              Service Pricing & Discounts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ServiceInput
                label="Canine Reg"
                priceKey="canineRegPrice"
                discountKey="canineRegDiscount"
                formData={formData}
                setFormData={setFormData}
              />
              <ServiceInput
                label="Litter Reg"
                priceKey="litterRegPrice"
                discountKey="litterRegDiscount"
                formData={formData}
                setFormData={setFormData}
              />
              <ServiceInput
                label="Transfer"
                priceKey="transferPrice"
                discountKey="transferDiscount"
                formData={formData}
                setFormData={setFormData}
              />
              <ServiceInput
                label="Certificate"
                priceKey="certificatePrice"
                discountKey="certificateDiscount"
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>

          <DialogFooter className="bg-white border-t p-4 -m-5 mt-4 sticky bottom-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-9 rounded-sm text-xs font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-9 bg-[#2B4C8A] hover:bg-[#1e3561] text-white rounded-sm text-xs font-bold px-6"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MemberShipCreateEditDialog;
