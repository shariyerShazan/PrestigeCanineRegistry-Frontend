/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChangeEvent } from "react";
import { FiX } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";

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
  const handleDocUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    updateFormData({
      uploadedDocs: [
        ...(formData.uploadedDocs || []),
        ...files.map((f) => f.name),
      ],
      rawDocs: [...(formData.rawDocs || []), ...files],
    });
  };

  const removeDoc = (idx: number) => {
    const newDocs = formData.uploadedDocs.filter(
      (_: any, i: number) => i !== idx,
    );
    const newRaw = formData.rawDocs.filter((_: any, i: number) => i !== idx);
    updateFormData({ uploadedDocs: newDocs, rawDocs: newRaw });
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

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Microchip ID */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Microchip ID *
        </label>
        <input
          type="text"
          inputMode="numeric" // Mobile keyboard-e numeric keypad open hobe
          value={formData.microchipId}
          onChange={(e) => {
            const value = e.target.value;
            // Shudhu numbers allow korbe ebong max 15 digit check korbe
            if (/^\d*$/.test(value) && value.length <= 15) {
              updateFormData({ microchipId: value });
            }
          }}
          maxLength={15} // HTML level-e restrict kore dibe
          placeholder="15 digit microchip number"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none"
        />
      </div>

      {/* DNA Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Primary Breed DNA *
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.primaryBreedDNA}
              onChange={(e) =>
                updateFormData({ primaryBreedDNA: e.target.value })
              }
              placeholder="write dna percentage"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Secondary Breed DNA (Optional)
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.secondaryBreedDNA}
              onChange={(e) =>
                updateFormData({ secondaryBreedDNA: e.target.value })
              }
              placeholder="write dna percentage"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Health Status */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Health Status
        </label>
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
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Vaccinations
        </label>
        <div className="flex flex-wrap gap-2">
          {VaccinationTypes.map((vax) => (
            <button
              key={vax}
              type="button"
              onClick={() => toggleVaccination(vax)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                formData.vaccinations?.includes(vax)
                  ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {vax}
            </button>
          ))}
        </div>
      </div>

      {/* Health Clearances */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Health Clearances (Optional)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {HealthClearances.map((item) => (
            <label
              key={item.value}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={formData.healthClearances?.includes(item.value)}
                onChange={() => toggleClearance(item.value)}
                className="w-4 h-4 rounded border-gray-300 text-[#D4AF37]"
              />
              <span className="text-sm text-gray-600">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Health Notes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Health Notes
        </label>
        <textarea
          rows={3}
          value={formData.healthNotes}
          onChange={(e) => updateFormData({ healthNotes: e.target.value })}
          placeholder="Any additional health information..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none"
        />
      </div>

      {/* Document Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Upload DNA Reports & Documents
        </label>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 bg-white text-center">
          <IoCloudUploadOutline className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-4">
            Click to upload DNA reports (PDF/Images)
          </p>
          <label className="bg-[#2B4C8A] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-[#1e3a6d]">
            Browse Files
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleDocUpload}
            />
          </label>
        </div>

        {formData.uploadedDocs?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.uploadedDocs.map((name: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded text-xs"
              >
                <span>{name}</span>
                <FiX
                  className="cursor-pointer text-red-500"
                  onClick={() => removeDoc(idx)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-10 pt-6 border-t">
        <button
          type="button"
          onClick={prevStep}
          className="px-8 py-2 border border-gray-300 rounded-lg"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => {
            if (!formData.microchipId || !formData.primaryBreedDNA) {
              alert("Microchip and Primary DNA are required.");
              return;
            }
            nextStep();
          }}
          className="px-8 py-2 bg-[#D4AF37] text-white rounded-lg font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
