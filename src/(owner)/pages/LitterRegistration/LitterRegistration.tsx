/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import StepOneLitterRegistry from "./_components/StepOneLitterRegistry";
import StepThreeLitterRegistry from "./_components/StepThreeLitterRegistry";
import RegistryPreview from "./_components/LitterRegistryPreview";
import LitterRegistryStepIndicator from "./_components/LitterRegistryStepIndicator";
import subtract from "@/assets/search/Subtract.svg";
import { useRegisterLitterMutation } from "@/redux/features/litter/litter.api";
import { toast } from "react-toastify";

export default function LitterRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [registerLitter, { isLoading }] = useRegisterLitterMutation();

  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    breedId: "",
    breedName: "",
    selectedBreed: null as any,
    generation: "",
    microchipId: "",

    // Parentage
    motherPcrId: "",
    fatherPcrId: "",

    // DNA
    dateOfBirth: "",

    // Location
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Health
    healthStatus: "Excellent",
    gender: "MALE", // Default value
    color: "",
    weight: 0,
    vaccinations: [] as string[],
    healthClearances: [] as string[],
    healthNotes: "",

    // Files (Images)
    uploadedImages: [] as string[], // For previews
    rawImages: [] as File[], // Actual files

    // Files (Documents)
    uploadedDocs: [] as string[], // Names for UI preview
    rawDocs: [] as File[], // Actual files for backend
  });

  const updateFormData = (data: Partial<typeof formData>) =>
    setFormData((prev) => ({ ...prev, ...data }));

  const handleSubmit = async () => {
    try {
      const submissionData = new FormData();

      // 1. Data processing
      const skipKeys = [
        "rawImages",
        "uploadedImages",
        "rawDocs",
        "uploadedDocs",
        "selectedBreed",
        "breedName",
      ];

      Object.entries(formData).forEach(([key, value]) => {
        if (skipKeys.includes(key)) return;

        // Array format handle (e.g. vaccinations, healthClearances)
        if (Array.isArray(value)) {
          // Backend jodi direct array na nite pare, tahole JSON stringify kora lagte pare
          // Normally FormData te same key multiple bar append korle array hisebe jay
          value.forEach((val) => submissionData.append(key, val));
        } else if (value !== undefined && value !== null && value !== "") {
          submissionData.append(key, value.toString());
        }
      });

      // 2. Append Physical Image Files
      formData.rawImages.forEach((file) => {
        submissionData.append("images", file);
      });

      // 3. Append Physical Document Files
      formData.rawDocs.forEach((file) => {
        submissionData.append("documents", file);
      });

      const res = await registerLitter(submissionData).unwrap();
      toast.success(res?.message || "Litter registered successfully!");

      // 4. Reset on Success
      setCurrentStep(1);
      // setFormData (reset logi placeholder)
    } catch (error: any) {
      const errorMsg = error?.data?.message || "Registration failed";
      toast.error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
    }
  };

  return (
    <div className="min-h-screen relative py-8 px-4">
      <div
        className="fixed inset-0 bg-contain bg-no-repeat pointer-events-none -z-10 opacity-30"
        style={{ backgroundImage: `url(${subtract})` }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Real dogs, real verification
          </h1>
          <p className="text-gray-600">Complete the form for verified PCR ID</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <LitterRegistryStepIndicator currentStep={currentStep} />

            {currentStep === 1 && (
              <StepOneLitterRegistry
                formData={formData}
                updateFormData={updateFormData}
                nextStep={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 2 && (
              <StepThreeLitterRegistry
                formData={formData}
                prevStep={() => setCurrentStep(1)}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Real-time Preview Sidebar */}
          <RegistryPreview formData={formData} />
        </div>
      </div>
    </div>
  );
}
