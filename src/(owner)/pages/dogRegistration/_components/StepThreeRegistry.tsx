/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Dna,
  MapPin,
  Calendar,
  Palette,
  VenusAndMars,
} from "lucide-react";
import { LuDna } from "react-icons/lu";
import { DataBox, InfoItem } from "@/(user)/pages/dogProfile/DogProfilePage";
import { Label } from "@radix-ui/react-label";
import { Progress } from "@/components/ui/progress";
import RegistryHealthSummaryDog from "./RegistryHealthSummaryDog";
import { useCalculatePricing } from "@/Layout/OwnerLayout";

type StepThreeProps = {
  formData: any;
  prevStep: () => void;
  handleSubmit: () => void;
  isSubmitting: any
};

export default function StepThreeRegistry({
  formData: form,
  prevStep,
  handleSubmit,
  isSubmitting,
}: StepThreeProps) {
  const formatDate = (d: string) => {
    if (!d) return "-";
    try {
      const dt = new Date(d);
      return dt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return d;
    }
  };
  const { caninePrice } = useCalculatePricing();

  const renderImage = (src: any, i: number) => {
    const imageUrl = src instanceof File ? URL.createObjectURL(src) : src;
    return (
      <div
        key={i}
        className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
      >
        <img
          src={imageUrl}
          alt={`img-${i}`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col gap-6">
        {/* Title + Basic Info */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Label className="text-gray-500 font-medium">Registering:</Label>
            <h1 className="text-2xl font-bold text-gray-900">
              {form.name || "Unnamed Dog"}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
            <InfoItem
              icon={<LuDna size={18} />}
              label="Breed"
              value={form.selectedBreed?.name || "-"}
            />
            <InfoItem
              icon={<Palette size={18} />}
              label="Color"
              value={form.color || "-"}
            />
            <InfoItem
              icon={<VenusAndMars size={18} />}
              label="Sex"
              value={form.gender || "-"}
            />
            <InfoItem
              icon={<MapPin size={18} />}
              label="Location"
              value={`${form.city || ""}, ${form.state || ""}`}
            />
            <InfoItem
              icon={<Calendar size={18} />}
              label="Date of Birth"
              value={formatDate(form.dateOfBirth)}
            />
            <InfoItem
              icon={<ShieldCheck size={18} />}
              label="Health Status"
              value={form.healthStatus || "Excellent"}
            />
          </div>
        </div>

        {/* Images preview */}
        {form.rawImages?.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">
              Uploaded Photos
            </h4>
            <div className="flex flex-wrap gap-3">
              {form.rawImages.map((file: any, i: number) =>
                renderImage(file, i),
              )}
            </div>
          </div>
        )}

        {/* DATA GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <DataBox
            label="Microchip ID"
            value={form.microchipId || "-"}
            valueColor="text-[#2B4C8A]"
          />
          <DataBox
            label="Weight"
            value={`${form.weight || "0"} lbs`}
            valueColor="text-[#2B4C8A]"
          />
          <DataBox
            label="Generation"
            value={form.generation || "N/A"}
            valueColor="text-[#2B4C8A]"
          />
          <DataBox
            label="Registry Tier"
            value={form.selectedBreed?.type === "DESIGNER" ? "GOLD" : "BLUE"}
            valueColor="text-[#D4AF37]"
          />
        </div>

        <div className="grid grid-cols-1  gap-6 mt-4">
          {/* DNA REPORT BREAKDOWN */}
          <div className="bg-[#1A1A1A] text-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <Dna className="text-yellow-500" size={20} />
                </div>
                <h4 className="font-bold">DNA Analysis</h4>
              </div>
              <Badge
                variant="outline"
                className="text-[10px] uppercase border-gray-700 text-gray-400"
              >
                Verified Profile
              </Badge>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between font-bold mb-2">
                  <span className="text-sm">
                    {form.selectedBreed?.name} (Primary)
                  </span>
                  <span className="text-yellow-500">
                    {form.primaryBreedDNA}%
                  </span>
                </div>
                <Progress
                  value={Number(form.primaryBreedDNA) || 0}
                  className="h-2 bg-gray-800"
                  indicatorClassName="bg-[#D4AF37]"
                />
              </div>

              {form.secondaryBreedDNA && (
                <div>
                  <div className="flex justify-between font-bold mb-2">
                    <span className="text-sm text-gray-400">
                      Secondary Breed
                    </span>
                    <span className="text-blue-400 text-sm">Targeted</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    {form.secondaryBreedDNA}
                  </p>
                  <Progress
                    value={30}
                    className="h-2 bg-gray-800"
                    indicatorClassName="bg-[#2B4C8A]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* HEALTH SUMMARY */}
          <RegistryHealthSummaryDog
            status={form.healthStatus}
            vaccinations={form.vaccinations}
            clearances={form.healthClearances}
          />
        </div>

        {/* Documents & Notes */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-2">
              Uploaded Documents
            </p>
            <div className="flex flex-wrap gap-2">
              {form.uploadedDocs?.length > 0 ? (
                form.uploadedDocs.map((name: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded border border-blue-100"
                  >
                    {name}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400">
                  No documents attached
                </span>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">
              Health Notes
            </p>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              "{form.healthNotes || "No additional notes provided."}"
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={prevStep}
            className="px-8 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Back to Edit
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="px-10 py-2 bg-[#D4AF37] cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-bold hover:bg-[#C19B2E] shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            {isSubmitting
              ? "Submitting..."
              : caninePrice > 0
                ? `Pay $${caninePrice.toFixed(2)} for Register`
                : "Register for Free"}
          </button>
        </div>
      </div>
    </div>
  );
}
