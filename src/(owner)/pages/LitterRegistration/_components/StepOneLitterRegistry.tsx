
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllBreedsQuery } from "@/redux/features/breed/breed.api";
import type { ChangeEvent } from "react";
import {  FiPlus, FiTrash2 } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

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
  const { data: breedsRes} = useGetAllBreedsQuery(undefined);
  const breeds = breedsRes || [];
  const navigate = useNavigate();

  const handleBreedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedBreedObj = breeds.find((b: any) => b.id === selectedId);

    updateFormData({
      breedId: selectedId,
      breedName: selectedBreedObj?.name || "",
      selectedBreed: selectedBreedObj,
      generation: "",
    });
  };


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

  const addPuppy = () => {
    updateFormData({
      puppies: [
        ...formData.puppies,
        { name: "", gender: "MALE", color: "", weight: 0, microchipId: "" },
      ],
    });
  };

  const removePuppy = (index: number) => {
    if (formData.puppies.length <= 1) return;
    updateFormData({
      puppies: formData.puppies.filter((_: any, i: number) => i !== index),
    });
  };

  const updatePuppyField = (index: number, field: string, value: any) => {
    const newPuppies = [...formData.puppies];
    newPuppies[index] = { ...newPuppies[index], [field]: value };
    updateFormData({ puppies: newPuppies });
  };

  const toggleVaccination = (vaxValue: string) => {
    const current = formData.vaccinations || [];
    const updated = current.includes(vaxValue)
      ? current.filter((v: string) => v !== vaxValue)
      : [...current, vaxValue];
    updateFormData({ vaccinations: updated });
  };

  const toggleHealthClearance = (clearanceValue: string) => {
    const current = formData.healthClearances || [];
    const updated = current.includes(clearanceValue)
      ? current.filter((c: string) => c !== clearanceValue)
      : [...current, clearanceValue];
    updateFormData({ healthClearances: updated });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    updateFormData({
      uploadedImages: [...(formData.uploadedImages || []), ...imageUrls],
      rawImages: [...(formData.rawImages || []), ...files],
    });
  };

  const handleDocUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    updateFormData({
      uploadedDocs: [...(formData.uploadedDocs || []), ...files.map((f) => f.name)],
      rawDocs: [...(formData.rawDocs || []), ...files],
    });
  };

  const handleContinue = () => {
    // DTO Validation Match
    const isLitterInvalid = !formData.litterName || !formData.dateOfBirth || !formData.breedId || !formData.city || !formData.state || !formData.zipCode;
    const arePuppiesInvalid = formData.puppies.some((p: any) => !p.name || !p.color || !p.weight);

    if (isLitterInvalid || arePuppiesInvalid) {
      alert("Required fields are missing: Litter details, City, State, Zip, or Puppy Info.");
      return;
    }
    nextStep();
  };

  return (
    <div className="space-y-8">
      {/* 1. Primary Litter Data */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">
          Litter Identification
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Litter Name *
            </label>
            <input
              type="text"
              value={formData.litterName}
              onChange={(e) => updateFormData({ litterName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Breed *
            </label>
            <select
              value={formData.breedId}
              onChange={handleBreedChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="">Select Breed</option>
              {breeds.map((b: any) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 2. Parentage */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mother PCR ID
          </label>
          <input
            type="text"
            value={formData.motherPcrId}
            onChange={(e) => updateFormData({ motherPcrId: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Father PCR ID
          </label>
          <input
            type="text"
            value={formData.fatherPcrId}
            onChange={(e) => updateFormData({ fatherPcrId: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg outline-none"
          />
        </div>
      </section>

      {/* 3. Multi-Puppy Support */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-xl font-bold text-gray-800">Puppies Details *</h3>
          <button
            type="button"
            onClick={addPuppy}
            className="flex items-center gap-1 bg-[#2B4C8A] text-white px-3 py-1.5 rounded-md text-sm font-medium"
          >
            <FiPlus /> Add Puppy
          </button>
        </div>

        <div className="space-y-6">
          {formData.puppies.map((puppy: any, idx: number) => (
            <div
              key={idx}
              className="p-5 border rounded-lg bg-white relative grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {formData.puppies.length > 1 && (
                <button
                  onClick={() => removePuppy(idx)}
                  className="absolute top-2 right-2 text-red-500 p-1"
                >
                  <FiTrash2 size={18} />
                </button>
              )}

              {/* Puppy Name */}
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Puppy Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={puppy.name}
                  onChange={(e) =>
                    updatePuppyField(idx, "name", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-md outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  value={puppy.gender}
                  onChange={(e) =>
                    updatePuppyField(idx, "gender", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-md outline-none focus:border-[#D4AF37] bg-white"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Color *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Black"
                  value={puppy.color}
                  onChange={(e) =>
                    updatePuppyField(idx, "color", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-md outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Weight (lbs) *
                </label>
                <input
                  type="number"
                  placeholder="0.0"
                  value={puppy.weight}
                  onChange={(e) =>
                    updatePuppyField(idx, "weight", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border rounded-md outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Microchip ID */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Microchip ID
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="15 digit microchip number"
                  value={puppy.microchipId}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 15) {
                      updatePuppyField(idx, "microchipId", value);
                    }
                  }}
                  maxLength={15}
                  className="w-full px-3 py-2 border rounded-md outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Location Details (Matches DTO) */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
          Location Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* City */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              City *
            </label>
            <input
              type="text"
              placeholder="e.g. Dallas"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
            />
          </div>

          {/* State */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              State *
            </label>
            <input
              type="text"
              placeholder="e.g. TX"
              value={formData.state}
              onChange={(e) => updateFormData({ state: e.target.value })}
              className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
            />
          </div>

          {/* Zip Code */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Zip Code *
            </label>
            <input
              type="text"
              placeholder="e.g. 75201"
              value={formData.zipCode}
              onChange={(e) => updateFormData({ zipCode: e.target.value })}
              className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
            />
          </div>

          {/* Country */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Country *
            </label>
            <input
              type="text"
              placeholder="e.g. USA"
              value={formData.country}
              onChange={(e) => updateFormData({ country: e.target.value })}
              className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
            />
          </div>
        </div>
      </section>

      {/* 5. Health & Files */}
      <section className="space-y-6">
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700">
            Health Notes
          </label>
          <textarea
            value={formData.healthNotes}
            onChange={(e) => updateFormData({ healthNotes: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37] outline-none"
            placeholder="Vaccination cycles, medical history..."
          />
        </div>

        <div className="grid grid-cols-1  gap-8">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">
              Vaccinations
            </label>
            <div className="flex flex-wrap gap-2">
              {vaccinations.map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => toggleVaccination(v.value)}
                  className={`px-3 py-1 text-sm border cursor-pointer rounded-full ${
                    (formData.vaccinations || []).includes(v.value)
                      ? "bg-[#D4AF37] text-white"
                      : "bg-white"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">
              Health Clearances
            </label>
            <div className="grid grid-cols-1 gap-1">
              {healthClearancesList.map((c) => (
                <label
                  key={c.value}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={(formData.healthClearances || []).includes(
                      c.value,
                    )}
                    onChange={() => toggleHealthClearance(c.value)}
                  />
                  {c.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Media Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border-2 border-dashed rounded-lg">
            <label className="flex flex-col items-center cursor-pointer">
              <IoCloudUploadOutline size={30} className="text-gray-400" />
              <span className="text-xs mt-2">Litter Group Photos</span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <div className="p-4 border-2 border-dashed rounded-lg">
            <label className="flex flex-col items-center cursor-pointer">
              <IoCloudUploadOutline size={30} className="text-gray-400" />
              <span className="text-xs mt-2">DNA & Pedigree Docs</span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleDocUpload}
              />
            </label>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleContinue}
          className="px-10 py-2 bg-[#D4AF37] text-white rounded-lg font-bold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}