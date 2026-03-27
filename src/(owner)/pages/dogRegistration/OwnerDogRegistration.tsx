/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import StepOneRegistry from "./_components/StepOneRegistry";
import StepTwoRegistry from "./_components/StepTwoRegistry";
import StepThreeRegistry from "./_components/StepThreeRegistry";
import RegistryStepIndicator from "./_components/RegistryStepIndicator";
import RegistryPreview from "./_components/RegistryPreview";
import subtract from "@/assets/search/Subtract.svg";
import { toast } from "react-toastify";
import { useRegisterCanineMutation } from "@/redux/features/canine/canine.api";
import { useNavigate } from "react-router";

export default function OwnerDogRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [registerCanine, { isLoading: isSubmitting }] =
    useRegisterCanineMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({
    name: "",
    breedId: "",
    breedName: "",
    gender: "",
    dateOfBirth: "",
    color: "",
    weight: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    microchipId: "",
    primaryBreedDNA: "",
    secondaryBreedDNA: "",
    healthStatus: "Excellent",
    vaccinations: [],
    healthClearances: [],
    healthNotes: "",
    uploadedImages: [],
    rawImages: [],
    uploadedDocs: [],
    rawDocs: [],
  });

  const updateFormData = (data: any) =>
    setFormData((prev: any) => ({ ...prev, ...data }));

  const handleSubmit = async () => {
    const data = new FormData();

    // Mapping fields exactly as per RegisterCanineDto
    data.append("name", formData.name);
    data.append("breedId", formData.breedId);
    data.append("gender", formData.gender); // Ensure it's MALE or FEMALE
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("color", formData.color);
    data.append("weight", formData.weight.toString());
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("zipCode", formData.zipCode);
    data.append("country", formData.country);
    data.append("microchipId", formData.microchipId);
    data.append("primaryBreedDNA", formData.primaryBreedDNA);

    if (formData.secondaryBreedDNA) {
      data.append("secondaryBreedDNA", formData.secondaryBreedDNA);
    }

    data.append("healthStatus", formData.healthStatus);
    data.append("healthNotes", formData.healthNotes || "");

    // Arrays: Backend expects multiple appends for the same key or vaccinations[]
    if (formData.vaccinations?.length > 0) {
      formData.vaccinations.forEach((v: string) =>
        data.append("vaccinations", v),
      );
    }

    if (formData.healthClearances?.length > 0) {
      formData.healthClearances.forEach((h: string) =>
        data.append("healthClearances", h),
      );
    }

    // File fields (images and DNAdocuments as per DTO)
    if (formData.rawImages?.length > 0) {
      formData.rawImages.forEach((file: File) => data.append("images", file));
    }
    if (formData.rawDocs?.length > 0) {
      formData.rawDocs.forEach((file: File) =>
        data.append("DNAdocuments", file),
      );
    }

    try {
      const res = await registerCanine(data).unwrap();
      if (res?.url) {
        toast.info("Redirecting to payment...");
        window.location.href = res.url;
      } else {
        toast.success(res?.message || "Registered successfully!");
        navigate("/owner/dashboard");
      }
    } catch (error: any) {
      const errorMsg = error?.data?.message || "Registration failed";
      toast.error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
    }
  };

  return (
    <div className="min-h-screen relative py-8 px-4">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-contain bg-no-repeat pointer-events-none -z-10 opacity-30"
        style={{ backgroundImage: `url(${subtract})` }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <RegistryStepIndicator currentStep={currentStep} />

            {currentStep === 1 && (
              <StepOneRegistry
                formData={formData}
                updateFormData={updateFormData}
                nextStep={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 2 && (
              <StepTwoRegistry
                formData={formData}
                updateFormData={updateFormData}
                prevStep={() => setCurrentStep(1)}
                nextStep={() => setCurrentStep(3)}
              />
            )}

            {currentStep === 3 && (
              <StepThreeRegistry
                formData={formData}
                prevStep={() => setCurrentStep(2)}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          <div className="md:col-span-1">
            <RegistryPreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}
