

import { useState } from "react"
import RegistryPreview from "./_components/LitterRegistryPreview"
import subtract from "@/assets/search/Subtract.svg"
import LitterRegistryStepIndicator from "./_components/LitterRegistryStepIndicator"
import StepOneLitterRegistry from "./_components/StepOneLitterRegistry"
import StepThreeLitterRegistry from "./_components/StepThreeLitterRegistry"


export default function LitterRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<any>({
    dogName: "",
    breed: "",
    sex: "",
    dateOfBirth: "",
    color: "",
    weight: "",
    location: "",
    uploadedImages: [],
    microchipId: "",
    primaryBreedDNAPercent: "",
    secondaryBreedDNAPercent: "",
    healthStatus: "",
    vaccinations: [],
    healthClearances: [],
    healthNotes: "",
    uploadedDocuments: [],
  })

  const updateFormData = (data: any) =>
    setFormData((prev: any) => ({ ...prev, ...data }))

  const handleSubmit = ()=> {
    //
  }

  return (
    <div className="min-h-screen relative py-8 px-4">
      {/* decorative SVG fixed behind content; use contain so it doesn't get zoomed */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-contain  bg-no-repeat pointer-events-none -z-10 opacity-30"
        style={{ backgroundImage: `url(${subtract})` }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text- mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Real dogs, real verification, real trust
          </h1>
          <p className="text-gray-600">
            Complete the form below to receive your verified PCR ID
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT */}
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
              />
            )}
          </div>

          {/* RIGHT */}
          <RegistryPreview formData={formData} />
        </div>
      </div>
    </div>
  )
}
