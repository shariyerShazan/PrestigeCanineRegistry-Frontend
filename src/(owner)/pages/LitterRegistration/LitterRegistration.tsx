
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
    // 1. Basic Info (Matches CreateLitterDto)
    litterName: "",
    dateOfBirth: "",
    breedId: "",
    breedName: "", // For UI
    selectedBreed: null as any, // For UI
    generation: "",
    
    // 2. Parentage
    motherPcrId: "",
    fatherPcrId: "",

    // 3. Multi-Puppy Support (Matches PuppyDetailDto[])
    puppies: [
      { name: "", gender: "MALE", color: "", weight: 0, microchipId: "" }
    ],

    // 4. Health & Common (Litter Level)
    vaccinations: [] as string[],
    healthClearances: [] as string[],
    healthNotes: "",

    // 5. Location
    city: "",
    state: "",
    zipCode: "",
    country: "USA",

    // 6. Media Previews & Raw Files
    uploadedImages: [] as string[], // Previews
    rawImages: [] as File[],        // Physical Files (images)
    uploadedDocs: [] as string[],   // Filenames
    rawDocs: [] as File[],          // Physical Files (DNAdocuments)
  });

  const updateFormData = (data: Partial<typeof formData>) =>
    setFormData((prev) => ({ ...prev, ...data }));

const handleSubmit = async () => {
  try {
    const submissionData = new FormData();

    // 1. Simple Strings/Numbers
    submissionData.append("litterName", formData.litterName);
    submissionData.append("dateOfBirth", formData.dateOfBirth);
    submissionData.append("breedId", formData.breedId);
    submissionData.append("city", formData.city);
    submissionData.append("state", formData.state);
    submissionData.append("zipCode", formData.zipCode);
    submissionData.append("country", formData.country);
    submissionData.append("healthNotes", formData.healthNotes || "");

    if (formData.motherPcrId)
      submissionData.append("motherPcrId", formData.motherPcrId);
    if (formData.fatherPcrId)
      submissionData.append("fatherPcrId", formData.fatherPcrId);

    // 2. Arrays (Enums) - NestJS style multiple append
    formData.vaccinations.forEach((v) =>
      submissionData.append("vaccinations[]", v),
    );
    formData.healthClearances.forEach((h) =>
      submissionData.append("healthClearances[]", h),
    );

    // 3. Nested Puppies Fix (Backend syntax: puppies[0][name])
    formData.puppies.forEach((pup, index) => {
      submissionData.append(`puppies[${index}][name]`, pup.name);
      submissionData.append(`puppies[${index}][gender]`, pup.gender);
      submissionData.append(`puppies[${index}][color]`, pup.color);
      submissionData.append(`puppies[${index}][weight]`, String(pup.weight));
      submissionData.append(`puppies[${index}][microchipId]`, pup.microchipId);
    });

    // 4. Physical Files (Field name must match Backend Interceptor)
    formData.rawImages.forEach((file) => {
      submissionData.append("images", file);
    });

    // BACKEND-E docs NAAM-E INTERCEPTOR CHHILO, TAI docs HOBE
    formData.rawDocs.forEach((file) => {
      submissionData.append("docs", file);
    });

    const res = await registerLitter(submissionData).unwrap();

    // 5. Payment Redirect Logic
    if (res?.url) {
      // Jodi payment session URL ashe, tobe redirect koro
      window.location.href = res.url;
    } else {
      toast.success(res?.message || "Litter registered successfully!");
      // Reset logic only for free registration
      resetForm();
    }
  } catch (error: any) {
    const errorMsg = error?.data?.message || "Registration failed";
    toast.error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
  }
};

const resetForm = () => {
  setCurrentStep(1);
  setFormData({
    litterName: "",
    dateOfBirth: "",
    breedId: "",
    breedName: "",
    selectedBreed: null,
    generation: "",
    motherPcrId: "",
    fatherPcrId: "",
    puppies: [
      { name: "", gender: "MALE", color: "", weight: 0, microchipId: "" },
    ],
    vaccinations: [],
    healthClearances: [],
    healthNotes: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    uploadedImages: [],
    rawImages: [],
    uploadedDocs: [],
    rawDocs: [],
  });
};

  return (
    <div className="min-h-screen relative py-8 px-4">
      {/* Background Decor */}
      <div
        className="fixed inset-0 bg-contain bg-no-repeat pointer-events-none -z-10 opacity-30"
        style={{ backgroundImage: `url(${subtract})` }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Litter Group Registration
          </h1>
          <p className="text-gray-600">Register multiple puppies under one verified litter profile.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Form Area */}
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