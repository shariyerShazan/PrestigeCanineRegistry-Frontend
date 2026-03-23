import { useEffect, useState } from "react";
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
import { CheckCircle2 } from "lucide-react";

const MemberShipCreateEditDialog = ({
  open,
  setOpen,
  onSubmit,
  initialData,
  isLoading,
}: any) => {
  const [formData, setFormData] = useState({
    name: "",
    tier: "",
    currentPrice: 0,
    canineLimit: 1,
    features: [] as string[],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        tier: initialData.tier || "",
        currentPrice: initialData.currentPrice || 0,
        canineLimit: initialData.canineLimit || 1,
        features: initialData.features || [],
      });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle style={{ color: "#2B4C8A" }}>
            Edit {formData.tier} Plan
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-2">
            <Label className="font-semibold text-gray-700">Display Name</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Prestige Ambassador"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="font-semibold text-gray-700">
                Price ($/year)
              </Label>
              <Input
                type="number"
                value={formData.currentPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentPrice: Number(e.target.value),
                  })
                }
                required
                min={0}
              />
            </div>
            <div className="grid gap-2">
              <Label className="font-semibold text-gray-700">
                Canine Limit
              </Label>
              <Input
                type="number"
                value={formData.canineLimit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    canineLimit: Number(e.target.value),
                  })
                }
                required
                min={1}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="font-semibold text-gray-700">
              Plan Features (Fixed)
            </Label>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 space-y-2">
              {formData.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 text-[#D4AF37] shrink-0"
                  />
                  <span>{feature}</span>
                </div>
              ))}
              {formData.features.length === 0 && (
                <p className="text-xs text-gray-400 italic">
                  No features defined for this tier.
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="font-bold cursor-pointer text-[#2B4C8A]"
              style={{ backgroundColor: "#D4AF37" }}
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
