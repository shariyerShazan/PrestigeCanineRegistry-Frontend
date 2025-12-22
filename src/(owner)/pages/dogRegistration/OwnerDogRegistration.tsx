

import { useState } from "react"
import StepOneRegistry from "./_components/StepOneRegistry"
import StepTwoRegistry from "./_components/StepTwoRegistry"
import StepThreeRegistry from "./_components/StepThreeRegistry"


export default function OwnerDogRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1 - Basic Information
    dogName: "",
    breed: "",
    sex: "",
    dateOfBirth: "",
    color: "",
    weight: "",
    location: "",
    uploadedImages: [],

    // Step 2 - Microchip, DNA & Health Report
    microchipId: "",
    primaryBreedDNA: "",
    primaryBreedPercent: "",
    secondaryBreedDNA: "",
    secondaryBreedPercent: "",
    healthStatus: "",
    vaccinations: [],
    healthClearances: [],
    healthNotes: "",
    uploadedDocuments: [],
  })

  const updateFormData = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("[v0] Final form data:", formData)
    // Handle final submission here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Real dogs, real verification, real trust</h1>
          <p className="text-gray-600">Complete the form below to receive your verified PCR ID</p>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <StepOneRegistry formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
        )}

        {currentStep === 2 && (
          <StepTwoRegistry
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {currentStep === 3 && (
          <StepThreeRegistry
            formData={formData}
            updateFormData={updateFormData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  )
}
