type Props = {
  currentStep: number
}

export default function RegistryStepIndicator({ currentStep }: Props) {
  return (
    <div className="mb-8">
      <div className="flex flex-col mb-6">
        <div className="flex justify-between">
          <h2 className="text-2xl">{currentStep === 1 ? "Basic Information" : currentStep === 2 ? "Microchip, DNA & Health Report" : "Preview Information"}</h2>
          <p className="text-lg text-gray-500">Step {currentStep} of 3</p>
        </div>

        <div className="flex gap-4 flex-1 border-b pb-4 border-b-gray-400">
          <div className="relative w-full">
            <div
              className="h-1 bg-[#D4AF37] mt-2 transition-all duration-500 ease-out rounded-full"
              style={{ width: currentStep >= 1 ? "100%" : "0px" }}
            ></div>
            <p className="text-sm  my-2">Basic Information</p>
          </div>

          <div className="relative w-full">
            <div className="relative w-full bg-black">
              <div
                className="h-1 mt-2 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: currentStep >= 2 ? "100%" : "0%",
                  backgroundColor: currentStep >= 2 ? "#D4AF37" : "#FFFFFF",
                }}
              ></div>
            </div>
            <p className={`text-sm my-2 }`}>
              Microchip, DNA & Health Report
            </p>
          </div>
          <div className="relative w-full">
            <div className="relative w-full bg-black">
              <div
                className="h-1 mt-2 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: currentStep >= 3 ? "100%" : "0%",
                  backgroundColor: currentStep >= 3 ? "#D4AF37" : "#FFFFFF",
                }}
              ></div>
            </div>
            <p className={`text-sm my-2 "}`}>
              Preview Information
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
