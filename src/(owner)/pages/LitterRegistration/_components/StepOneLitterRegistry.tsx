
import type { ChangeEvent } from "react"
import {  FiX } from "react-icons/fi"
import { IoCloudUploadOutline } from "react-icons/io5";

type StepOneProps = {
  formData: any
  updateFormData: (d: any) => void
  nextStep: () => void
}

export default function StepOneLitterRegistry({ formData, updateFormData, nextStep }: StepOneProps) {


      const vaccinations = ["Rabies", "DHPP", "Bordetella", "Leptospirosis", "Lyme", "Influenza"]
      const healthClearancesList = [
        "Hip Dysplasia Clear",
        "Elbow Clear",
        "Eye Clearance (CERF)",
        "Heart Clearance",
        "PRA Clear",
        "DM Clear",
      ]
    
      const toggleVaccination = (vax: string) => {
        const current: string[] = formData.vaccinations || []
        if (current.includes(vax)) {
          updateFormData({ vaccinations: current.filter((v: string) => v !== vax) })
        } else {
          updateFormData({ vaccinations: [...current, vax] })
        }
      }
    
      const toggleHealthClearance = (clearance: string) => {
        const current: string[] = formData.healthClearances || []
        if (current.includes(clearance)) {
          updateFormData({ healthClearances: current.filter((c: string) => c !== clearance) })
        } else {
          updateFormData({ healthClearances: [...current, clearance] })
        }
      }
    
    


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
              <label className="block text-sm font-medium text-gray-700 mb-2">Puppies Name:</label>
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


                    <div>
            <label className="block text-base font-medium text-gray-900 mb-2">
              Microchip ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.microchipId}
              onChange={(e) => updateFormData({ microchipId: e.target.value })}
              placeholder="15 digit microchip number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">
                Dam (mother) PCR ID: <span className="text-red-500">*</span>
              </label>
              <div className="flex relative gap-2">
                <input
                  type="text"
                  value={formData.primaryBreedDNAPercent}
                  onChange={(e) => updateFormData({ primaryBreedDNAPercent: e.target.value })}
                  placeholder="Enter mother PCR ID"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
               {/* <span className="text-gray-600 absolute right-3 top-2/10">%</span> */}
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">Stud (father) PCR ID:</label>
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={formData.secondaryBreedDNAPercent}
                  onChange={(e) => updateFormData({ secondaryBreedDNAPercent: e.target.value })}
                  placeholder="Enter father PCR ID"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
                {/* <span className="text-gray-600 absolute right-3 top-2/10">%</span> */}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-[#D4AF37] bg-yellow-50 p-3 rounded-lg">
            <span className="font-medium">Note:</span>
            <span>Both the  Dam & Stud should be verified PCR registered.</span>
          </div>

          {/* Primary and Secondary Breed DNA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">
                Primary Breed DNA <span className="text-red-500">*</span>
              </label>
              <div className="flex relative gap-2">
                <input
                  type="text"
                  value={formData.primaryBreedDNAPercent}
                  onChange={(e) => updateFormData({ primaryBreedDNAPercent: e.target.value })}
                  placeholder="write dna percentage"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
               <span className="text-gray-600 absolute right-3 top-2/10">%</span>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-900 mb-2">Secondary Breed DNA (optional)</label>
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={formData.secondaryBreedDNAPercent}
                  onChange={(e) => updateFormData({ secondaryBreedDNAPercent: e.target.value })}
                  placeholder="write dna percentage"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
                <span className="text-gray-600 absolute right-3 top-2/10">%</span>
              </div>
            </div>
          </div>

         <div className="flex items-start gap-2 text-sm text-[#D4AF37] bg-yellow-50 p-3 rounded-lg">
            <span className="font-medium">Note:</span>
            <span>Special match with authorized DNA report to prevent repetition</span>
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



                            {/* Health Status */}
          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">Health Status</label>
            <select
              value={formData.healthStatus}
              onChange={(e) => updateFormData({ healthStatus: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            >
              <option value="">Select status</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          {/* Vaccinations */}
          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">Vaccinations</label>
            <div className="flex flex-wrap gap-2">
              {vaccinations.map((vax) => (
                <button
                  key={vax}
                  type="button"
                  onClick={() => toggleVaccination(vax)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    (formData.vaccinations || []).includes(vax)
                      ? "bg-[#D4AF37] text-white"
                      : "bg-white border border-gray-300 cursor-pointer hover:bg-[#D4AF3720]"
                  }`}
                >
                  {vax}
                </button>
              ))}
            </div>
          </div>

          {/* Health Clearances */}
          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">Health Clearances</label>
            <div className="space-y-2">
              {healthClearancesList.map((clearance) => (
                <label key={clearance} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(formData.healthClearances || []).includes(clearance)}
                    onChange={() => toggleHealthClearance(clearance)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{clearance}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Health Notes */}
          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">Additional Notes:</label>
            <textarea
              value={formData.healthNotes}
              onChange={(e) => updateFormData({ healthNotes: e.target.value })}
              placeholder="Any additional health information..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none"
            />
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
