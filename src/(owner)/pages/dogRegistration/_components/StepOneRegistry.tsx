
import type { ChangeEvent } from "react"
import {  FiX } from "react-icons/fi"
import { IoCloudUploadOutline } from "react-icons/io5";

type StepOneProps = {
  formData: any
  updateFormData: (d: any) => void
  nextStep: () => void
}

export default function StepOneRegistry({ formData, updateFormData, nextStep }: StepOneProps) {


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
    <div className=" ">
      {/* Form Section */}


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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              />
            </div>

            {/* Breed */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
              <select
                value={formData.breed}
                onChange={(e) => updateFormData({ breed: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
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
                    formData.sex === "Male" ? "bg-[#D4AF37] text-white cursor-pointer" : "border-gray-300 border text-gray-700 cursor-pointer hover:bg-[#D4AF3720]"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => updateFormData({ sex: "Female" })}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    formData.sex === "Female"
                      ? "bg-[#D4AF37] text-white cursor-pointer "
                      : "border-gray-300 border text-gray-700 hover:bg-[#D4AF3720] cursor-pointer"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => updateFormData({ weight: e.target.value })}
                placeholder="e.g. 25 lbs"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
          </div>

          {/* Upload Image */}
          <div className="flex justify-between">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
              <div className="flex ">
                <label className="flex gap-2 bg-[#2B4C8A] px-8 rounded-lg text-white   items-center justify-center cursor-pointer">
                <div className="w-12 h-9  rounded-full flex items-center justify-center mb-2">
                  <IoCloudUploadOutline className="w-6 h-6" />
                </div>
                <span className=" w-full "> Uplaod Image</span>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                
              </label>
              </div>
              <span className="text-[#D4AF37] text-sm">First image will be used as thumbnail.</span>
           </div>
              {/* Uploaded Images */}
              {(formData.uploadedImages || []).length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {(formData.uploadedImages || []).map((image: string, index: number) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className="w-32 h-20 object-cover rounded-sm"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1  bg-opacity-50 rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <FiX className="w-5 h-5 text-red-500 bg-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
  )
}
