import { useState } from "react"
import type { ChangeEvent } from "react"
import { FiUpload, FiX } from "react-icons/fi"
import dog1 from "@/assets/home/allDogs/dog1.png"
import dog2 from "@/assets/home/allDogs/dog2.png"

type StepOneProps = {
  formData: any
  updateFormData: (d: any) => void
  nextStep: () => void
}

export default function StepOneRegistry({ formData, updateFormData, nextStep }: StepOneProps) {
  const [activeTab, setActiveTab] = useState("basic")

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    const imageUrls = files.map((file: File) => URL.createObjectURL(file))
    updateFormData({ uploadedImages: [...(formData.uploadedImages || []), ...imageUrls] })
  }

  const removeImage = (index: number) => {
    const newImages = (formData.uploadedImages || []).filter((_: any, i: number) => i !== index)
    updateFormData({ uploadedImages: newImages })
  }

  const handleContinue = () => {
    // Validate required fields
    if (!formData.dogName || !formData.breed || !formData.sex) {
      alert("Please fill in all required fields")
      return
    }
    nextStep()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form Section */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            className={`pb-3 px-1 font-medium text-sm relative ${
              activeTab === "basic" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Information
          </button>
          <button className="pb-3 px-1 font-medium text-sm text-gray-400 cursor-not-allowed" disabled>
            DNA & Microchip Report
          </button>
          <button className="pb-3 px-1 font-medium text-sm text-gray-400 cursor-not-allowed" disabled>
            Preview & submit
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
          <span className="text-sm text-gray-600">Step 1</span>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Dog Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dog Name</label>
              <input
                type="text"
                value={formData.dogName}
                onChange={(e) => updateFormData({ dogName: e.target.value })}
                placeholder="e.g. Bella Daisy"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Breed */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
              <select
                value={formData.breed}
                onChange={(e) => updateFormData({ breed: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Select Breed</option>
                <option value="Golden Retriever">Golden Retriever</option>
                <option value="Labrador">Labrador</option>
                <option value="German Shepherd">German Shepherd</option>
                <option value="French Bulldog">French Bulldog</option>
                <option value="Beagle">Beagle</option>
              </select>
            </div>
          </div>

          {/* Sex and Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateFormData({ sex: "Male" })}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    formData.sex === "Male" ? "bg-[#D4AF37] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => updateFormData({ sex: "Female" })}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    formData.sex === "Female"
                      ? "bg-[#D4AF37] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Color and Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => updateFormData({ color: e.target.value })}
                placeholder="e.g. Golden Black"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => updateFormData({ weight: e.target.value })}
                placeholder="e.g. 25 lbs"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location (City, State)</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => updateFormData({ location: e.target.value })}
              placeholder="e.g. New York"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <label className="flex flex-col items-center justify-center cursor-pointer">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                  <FiUpload className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-blue-600 font-medium">Upload Image</span>
                <span className="text-xs text-gray-500 mt-1">or drag and drop an image</span>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>

              {/* Uploaded Images */}
              {(formData.uploadedImages || []).length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {(formData.uploadedImages || []).map((image: string, index: number) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleContinue}
            className="px-6 py-2 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#C19B2E]"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Dog Image */}
            <div className="relative h-48 bg-gray-100">
              <img src={formData.uploadedImages[0] || dog1} alt="Dog preview" className="w-full h-full object-cover" />
              <button className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <FiX className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Dog Info */}
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-900 mb-1">Name: {formData.dogName || "Bella Daisy"}</h4>
              <p className="text-sm text-[#D4AF37] mb-2">Breed: {formData.breed || "Golden Retriever"}</p>
              <p className="text-sm text-gray-600 mb-4">PKD ID: #PCR-LR-009876</p>

              {/* Owner Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                  <img src={dog2 || "/placeholder.svg"} alt="Owner" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-medium text-gray-900">Sarah Johnson</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
