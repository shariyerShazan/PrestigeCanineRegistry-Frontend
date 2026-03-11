/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllBreedsQuery } from "@/redux/features/breed/breed.api";
import type { ChangeEvent } from "react";
import { FiX } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";

type StepOneProps = {
  formData: any;
  updateFormData: (d: any) => void;
  nextStep: () => void;
};

export default function StepOneLitterRegistry({
  formData,
  updateFormData,
  nextStep,
}: StepOneProps) {
  const { data: breedsRes, isLoading: loadingBreeds } =
    useGetAllBreedsQuery(undefined);

  const breeds = breedsRes || [];

  // FIX: Find the breed object from the array using the selected breedId
 const handleBreedChange = (e: ChangeEvent<HTMLSelectElement>) => {
   const selectedId = e.target.value;
   const selectedBreedObj = breeds.find((b: any) => b.id === selectedId);

   updateFormData({
     breedId: selectedId,
     breedName: selectedBreedObj?.name || "",
     selectedBreed: selectedBreedObj, // Step 2 er logic er jonno full object rakha hocche
     generation: "", // Breed change hole generation reset hobe
   });
 };
   const isDesigner = formData.selectedBreed?.type === "DESIGNER";
   const eligibleGens = formData.selectedBreed?.eligibleGen
     ? formData.selectedBreed.eligibleGen
         .split(",")
         .map((g: string) => g.trim())
     : [];
 

  const vaccinations = [
    { label: "Rabies", value: "RABIES" },
    { label: "DHPP", value: "DHPP" },
    { label: "Bordetella", value: "BORDETELLA" },
    { label: "Leptospirosis", value: "LEPTOSPIROSIS" },
    { label: "Lyme", value: "LYME" },
    { label: "Influenza", value: "INFLUENZA" },
  ];

  const healthClearancesList = [
    { label: "Hip Dysplasia Clear", value: "HIP_DYSPLASIA" },
    { label: "Elbow Clear", value: "ELBOW_CLEAR" },
    { label: "Eye Clearance (CERF)", value: "EYE_CLEARANCE_CERF" },
    { label: "Heart Clearance", value: "HEART_CLEARANCE" },
    { label: "PRA Clear", value: "PRA_CLEAR" },
    { label: "DM Clear", value: "DM_CLEAR" },
  ];

  const toggleVaccination = (vaxValue: string) => {
    const current: string[] = formData.vaccinations || [];
    const updated = current.includes(vaxValue)
      ? current.filter((v) => v !== vaxValue)
      : [...current, vaxValue];
    updateFormData({ vaccinations: updated });
  };

  const toggleHealthClearance = (clearanceValue: string) => {
    const current: string[] = formData.healthClearances || [];
    const updated = current.includes(clearanceValue)
      ? current.filter((c) => c !== clearanceValue)
      : [...current, clearanceValue];
    updateFormData({ healthClearances: updated });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const imageUrls = files.map((file: File) => URL.createObjectURL(file));
    updateFormData({
      uploadedImages: [...(formData.uploadedImages || []), ...imageUrls],
      rawImages: [...(formData.rawImages || []), ...files],
    });
  };

  const removeImage = (index: number) => {
    const newImages = (formData.uploadedImages || []).filter(
      (_: any, i: number) => i !== index,
    );
    const newFiles = (formData.rawImages || []).filter(
      (_: any, i: number) => i !== index,
    );
    updateFormData({ uploadedImages: newImages, rawImages: newFiles });
  };


    const handleDocUpload = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      updateFormData({
        uploadedDocs: [...(formData.uploadedDocs || []), ...files.map(f => f.name)],
        rawDocs: [...(formData.rawDocs || []), ...files],
      });
    };

    const removeDoc = (idx: any) => {
      console.log("upcomming", idx);
    };

  const handleContinue = () => {
    const isRequiredMissing =
      !formData.name ||
      !formData.breedId ||
      !formData.microchipId ||
      (isDesigner && !formData.generation);

    if (isRequiredMissing) {
      alert("Please fill in all required fields marked with *");
      return;
    }
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Litter/Puppy Name *
          </label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => updateFormData({ name: e.target.value })}
            placeholder="e.g. Litter 01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Breed
          </label>
          <select
            value={formData.breedId}
            onChange={handleBreedChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          >
            <option value="">
              {loadingBreeds ? "Loading..." : "Select Breed"}
            </option>
            {breeds.map((b: any) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Microchip ID *
          </label>
          <input
            type="number"
            value={formData.microchipId || ""}
            onChange={(e) => updateFormData({ microchipId: e.target.value })}
            placeholder="15 digit number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Dam (Mother) PCR ID
          </label>
          <input
            type="text"
            value={formData.motherPcrId || ""}
            onChange={(e) => updateFormData({ motherPcrId: e.target.value })}
            placeholder="PCR-G301..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Stud (Father) PCR ID
          </label>
          <input
            type="text"
            value={formData.fatherPcrId || ""}
            onChange={(e) => updateFormData({ fatherPcrId: e.target.value })}
            placeholder="PCR-B301..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
          />
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Primary Breed DNA *
          </label>
          <input
            type="number"
            value={formData.primaryBreedDNA || ""}
            onChange={(e) =>
              updateFormData({ primaryBreedDNA: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Secondary DNA (Optional)
          </label>
          <input
            type="number"
            value={formData.secondaryBreedDNA || ""}
            onChange={(e) =>
              updateFormData({ secondaryBreedDNA: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
          />
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sex
          </label>
          <div className="flex gap-2">
            {["MALE", "FEMALE"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => updateFormData({ gender: g })}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                  formData.gender === g
                    ? "bg-[#D4AF37] text-white"
                    : "border-gray-300 border text-gray-700 hover:bg-[#D4AF3720]"
                }`}
              >
                {g === "MALE" ? "Male" : "Female"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Color and Weight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => updateFormData({ color: e.target.value })}
            placeholder="e.g. Black and Tan"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (lbs)
          </label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => updateFormData({ weight: Number(e.target.value) })}
            placeholder="e.g. 65.5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          />
        </div>
      </div>

      <div className="">
        {isDesigner && (
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <label className="block text-sm font-bold text-gray-800 mb-3">
              Generation Selection *
            </label>

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
          </div>
        )}
      </div>

      {/* Location Row 1: City & State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            placeholder="Dallas"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => updateFormData({ state: e.target.value })}
            placeholder="TX"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          />
        </div>
      </div>

      {/* Location Row 2: Zip & Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zip Code
          </label>
          <input
            type="number"
            value={formData.zipCode}
            onChange={(e) => updateFormData({ zipCode: e.target.value })}
            placeholder="75201"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => updateFormData({ country: e.target.value })}
            placeholder="USA"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-base font-medium text-gray-900">
          Vaccinations
        </label>
        <div className="flex flex-wrap gap-2">
          {vaccinations.map((vax) => (
            <button
              key={vax.value}
              type="button"
              onClick={() => toggleVaccination(vax.value)}
              className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-colors border ${
                (formData.vaccinations || []).includes(vax.value)
                  ? "bg-[#D4AF37] text-white shadow-md border-[#D4AF37]"
                  : "bg-white border-gray-300 hover:bg-yellow-50"
              }`}
            >
              {vax.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-base font-medium text-gray-900">
          Health Clearances
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {healthClearancesList.map((clearance) => (
            <label
              key={clearance.value}
              className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={(formData.healthClearances || []).includes(
                  clearance.value,
                )}
                onChange={() => toggleHealthClearance(clearance.value)}
                className="w-4 h-4 accent-[#D4AF37]"
              />
              <span className="text-sm text-gray-700">{clearance.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Photos
        </label>
        <div className="flex flex-wrap gap-4">
          <label className="flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <IoCloudUploadOutline className="w-6 h-6 text-gray-400" />
            <span className="text-[10px] mt-1 text-gray-400 font-bold">
              UPLOAD
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {(formData.uploadedImages || []).map(
            (image: string, index: number) => (
              <div key={index} className="relative group w-28 h-28">
                <img
                  src={image}
                  alt="Upload"
                  className="w-full h-full object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                >
                  <FiX size={14} />
                </button>
              </div>
            ),
          )}
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
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none"
        />
      </div>

      {/* Document Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Upload DNA Reports & Other Documents
        </label>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 bg-white">
          <div className="flex flex-col items-center justify-center text-center">
            <IoCloudUploadOutline className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-700">
              Drag and drop photos here, or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1 mb-4">
              Supports: JPG, PNG (Max 5MB per file)
            </p>
            <label className="bg-[#2B4C8A] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-[#1e3a6d] transition-colors">
              Choose a Files
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleDocUpload}
              />
            </label>
          </div>
        </div>

        {/* Uploaded Docs Preview List */}
        {formData.uploadedDocs?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.uploadedDocs.map((name: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded text-xs text-gray-600"
              >
                <span className="truncate max-w-[150px]">{name}</span>
                <FiX
                  className="cursor-pointer text-red-500"
                  onClick={() => removeDoc(idx)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          className="px-8 py-2 border rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-all"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="px-10 py-2 bg-[#D4AF37] text-white rounded-lg font-bold hover:bg-[#B5942E] shadow-lg transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
