
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Dna,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
import { LuDna } from "react-icons/lu";
import { DataBox, InfoItem } from "@/(user)/pages/dogProfile/DogProfilePage";
import { Label } from "@radix-ui/react-label";
import { Progress } from "@/components/ui/progress";
import LitterRegistryHealthSummaryDog from "./LitterRegistryHealthSummaryDog";
import { useCalculatePricing } from "@/Layout/OwnerLayout";

type StepThreeProps = {
  formData: any;
  prevStep: () => void;
  handleSubmit: () => void;
  isLoading?: boolean;
};

export default function StepThreeLitterRegistry({
  formData,
  prevStep,
  handleSubmit,
  isLoading,
}: StepThreeProps) {
  // Date formatting logic
  const formatDate = (d: string) => {
    if (!d) return "-";
    try {
      return new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return d;
    }
  };
    const { litterPrice } = useCalculatePricing();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* 1. Header & Primary Info */}
        <div className="border-b pb-4">
          <div className="flex items-center gap-3 mb-4 text-lg font-semibold text-gray-900">
            <Label className="text-gray-500">Litter Name:</Label>
            <h1 className="text-2xl">{formData.litterName || "-"}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-gray-600">
            <InfoItem
              icon={<LuDna size={18} />}
              label="Breed"
              value={formData.breedName || "-"}
            />
            <InfoItem
              icon={<Users size={18} />}
              label="Total Puppies"
              value={`${formData.puppies?.length || 0} Puppies`}
            />
            <InfoItem
              icon={<Calendar size={18} />}
              label="Date of Birth"
              value={formatDate(formData.dateOfBirth)}
            />
            <InfoItem
              icon={<ShieldCheck size={18} />}
              label="Health Status"
              value={formData.healthNotes ? "Notes Provided" : "Standard"}
            />

            <div className="flex items-start gap-2 col-span-full">
              <MapPin size={18} className="mt-1" />
              <div>
                <p className="text-xs text-gray-400">Registry Location</p>
                <p className="text-sm font-medium">
                  {formData.city || "N/A"}, {formData.state || "N/A"}{" "}
                  {formData.zipCode} {formData.country}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Puppies Detailed List (New Section for Clarity) */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wider">
            Puppies in this Litter
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {formData.puppies?.map((puppy: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div>
                  <p className="font-bold text-gray-800">
                    {puppy.name || `Puppy #${idx + 1}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {puppy.gender} • {puppy.color}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#2B4C8A]">
                    {puppy.weight} lbs
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {puppy.microchipId || "No Microchip"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Gallery Preview */}
        {formData.uploadedImages?.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-sm text-gray-700">
              Gallery Preview
            </h4>
            <div className="flex flex-wrap gap-2">
              {formData.uploadedImages.map((src: string, i: number) => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={src}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Numerical Data Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <DataBox
            label="Generation"
            value={formData.generation || "-"}
            valueColor="text-[#2B4C8A]"
          />
          <DataBox
            label="Mother ID"
            value={formData.motherPcrId || "N/A"}
            valueColor="text-[#2B4C8A]"
          />
          <DataBox
            label="Father ID"
            value={formData.fatherPcrId || "N/A"}
            valueColor="text-[#2B4C8A]"
          />
        </div>

        {/* 5. Genetic Composition Card */}
        <div className="bg-[#1A1A1A] text-white rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-600/20 rounded-lg">
                <Dna className="text-yellow-500" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Genetic Composition</h4>
                <p className="text-xs text-gray-500">Confirmed Breed Lineage</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="border-gray-700 text-yellow-500"
            >
              Verified PCR Link
            </Badge>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">
                  Primary Breed ({formData.breedName})
                </span>
                <span className="text-yellow-500 font-bold">
                  {formData.primaryBreedDNA || 100}%
                </span>
              </div>
              <Progress
                value={Number(formData.primaryBreedDNA) || 100}
                className="h-2 bg-gray-800"
              />
            </div>
          </div>
        </div>

        {/* 6. Health Summary */}
        <div className="w-full">
          <LitterRegistryHealthSummaryDog
            vaccinations={formData.vaccinations}
            clearances={formData.healthClearances}
          />
        </div>

        {/* 7. Document Names Preview */}
        {formData.uploadedDocs?.length > 0 && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Uploaded Documents:
            </h4>
            <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
              {formData.uploadedDocs.map((docName: string, idx: number) => (
                <li key={idx}>{docName}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 8. Action Buttons */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t">
          <button
            type="button"
            onClick={prevStep}
            disabled={isLoading}
            className="px-8 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            Back to Edit
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-10 py-2.5 bg-[#D4AF37] text-white rounded-lg font-bold hover:bg-[#b8952e] shadow-lg shadow-yellow-900/10 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading
              ? "Submitting..."
              : `Pay $${litterPrice.toFixed(2)} for Regisster`}
          </button>
        </div>
      </div>
    </div>
  );
}