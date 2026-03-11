/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChangeEvent } from "react";
import { FiX } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";

// Enums from your Prisma Schema
const VaccinationTypes = [
  "RABIES",
  "DHPP",
  "BORDETELLA",
  "LEPTOSPIROSIS",
  "LYME",
  "INFLUENZA",
];
const HealthClearances = [
  { label: "Hip Dysplasia Clear", value: "HIP_DYSPLASIA" },
  { label: "Elbow Clear", value: "ELBOW_CLEAR" },
  { label: "Eye Clearance (CERF)", value: "EYE_CLEARANCE_CERF" },
  { label: "Heart Clearance", value: "HEART_CLEARANCE" },
  { label: "PRA Clear", value: "PRA_CLEAR" },
  { label: "DM Clear", value: "DM_CLEAR" },
];

type StepTwoProps = {
  formData: any;
  updateFormData: (d: any) => void;
  prevStep: () => void;
  nextStep: () => void;
};

export default function StepTwoRegistry({
  formData,
  updateFormData,
  prevStep,
  nextStep,
}: StepTwoProps) {
  
  const isDesigner = formData.selectedBreed?.type === "DESIGNER";
  const eligibleGens = formData.selectedBreed?.eligibleGen
    ? formData.selectedBreed.eligibleGen.split(",").map((g: string) => g.trim())
    : [];

  const handleDocUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    updateFormData({
      uploadedDocs: [...(formData.uploadedDocs || []), ...files.map(f => f.name)],
      rawDocs: [...(formData.rawDocs || []), ...files],
    });
  };

  const toggleVaccination = (vax: string) => {
    const current = formData.vaccinations || [];
    const updated = current.includes(vax) 
      ? current.filter((v: string) => v !== vax) 
      : [...current, vax];
    updateFormData({ vaccinations: updated });
  };

  const toggleClearance = (val: string) => {
    const current = formData.healthClearances || [];
    const updated = current.includes(val) 
      ? current.filter((v: string) => v !== val) 
      : [...current, val];
    updateFormData({ healthClearances: updated });
  };
  
const removeDoc = (idx: any) => {
  console.log("upcomming", idx);
};
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Microchip ID */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Microchip ID *</label>
        <input
          type="text"
          value={formData.microchipId}
          onChange={(e) => updateFormData({ microchipId: e.target.value })}
          placeholder="15 digit microchip number"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none"
        />
      </div>

      {/* DNA DNA DNA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <div className="relative">
           <label className="block text-sm font-semibold text-gray-700 mb-1">Primary Breed DNA *</label>
           <div className="relative">
             <input
               type="number"
               value={formData.primaryBreedDNA}
               onChange={(e) => updateFormData({ primaryBreedDNA: e.target.value })}
               placeholder="write dna percentage"
               className="w-full px-4 py-2 border border-gray-200 rounded-lg pr-8"
             />
             <span className="absolute right-3 top-2 text-gray-500">%</span>
           </div>
        </div>
        <div>
           <label className="block text-sm font-semibold text-gray-700 mb-1">Secondary Breed DNA (optional)</label>
           <div className="relative">
             <input
               type="number"
               value={formData.secondaryBreedDNA}
               onChange={(e) => updateFormData({ secondaryBreedDNA: e.target.value })}
               placeholder="write dna percentage"
               className="w-full px-4 py-2 border border-gray-200 rounded-lg pr-8"
             />
             <span className="absolute right-3 top-2 text-gray-500">%</span>
           </div>
        </div>
        <p className="text-xs text-[#D4AF37] absolute -bottom-5 left-0 italic">
          Note: Should match with authorized DNA report to prevent rejection
        </p>
      </div>


      {/* Health Status */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Health Status</label>
        <select
          value={formData.healthStatus}
          onChange={(e) => updateFormData({ healthStatus: e.target.value })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37]"
        >
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
        </select>
      </div>

      {/* Vaccinations */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Vaccinations</label>
        <div className="flex flex-wrap gap-2">
          {VaccinationTypes.map((vax) => (
            <button
              key={vax}
              type="button"
              onClick={() => toggleVaccination(vax)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                formData.vaccinations?.includes(vax)
                  ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]"
              }`}
            >
              {vax.charAt(0) + vax.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Health Clearances */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Health Clearances (Optional)</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {HealthClearances.map((item) => (
            <label key={item.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.healthClearances?.includes(item.value)}
                onChange={() => toggleClearance(item.value)}
                className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Generation Selection - Fixed logic here */}
      {isDesigner && (
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <label className="block text-sm font-bold text-gray-800 mb-3">Generation Selection *</label>
          <div className="flex flex-wrap gap-2">
            {eligibleGens.map((gen: string) => (
              <button
                key={gen}
                type="button"
                onClick={() => updateFormData({ generation: gen })}
                className={`px-6 py-2 rounded-lg text-sm font-bold border transition-all cursor-pointer ${
                  formData.generation === gen 
                  ? "bg-[#2B4C8A] text-white border-[#2B4C8A] shadow-md scale-105" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#2B4C8A]"
                }`}
              >
                {gen}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-500 mt-3 italic">Generation is required for designer breeds to determine registration tier.</p>
        </div>
      )}

      {/* Health Notes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Health Notes</label>
        <textarea
          rows={3}
          value={formData.healthNotes}
          onChange={(e) => updateFormData({ healthNotes: e.target.value })}
          placeholder="Any additional health information..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none"
        />
      </div>

      {/* Document Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Upload DNA Reports & Other Documents</label>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 bg-white">
          <div className="flex flex-col items-center justify-center text-center">
            <IoCloudUploadOutline className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-700">Drag and drop photos here, or click to browse</p>
            <p className="text-xs text-gray-400 mt-1 mb-4">Supports: JPG, PNG (Max 5MB per file)</p>
            <label className="bg-[#2B4C8A] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-[#1e3a6d] transition-colors">
              Choose a Files
              <input type="file" multiple className="hidden" onChange={handleDocUpload} />
            </label>
          </div>
        </div>

        {/* Uploaded Docs Preview List */}
        {formData.uploadedDocs?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.uploadedDocs.map((name: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded text-xs text-gray-600">
                <span className="truncate max-w-[150px]">{name}</span>
                <FiX className="cursor-pointer text-red-500" onClick={() => removeDoc(idx)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
        <button type="button" onClick={prevStep} className="px-8 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
          Back
        </button>
        <button
          type="button"
          onClick={() => {
            if(!formData.microchipId || !formData.primaryBreedDNA) {
              alert("Required fields missing");
              return;
            }
            nextStep();
          }}
          className="px-8 py-2 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#C19B2E] transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}