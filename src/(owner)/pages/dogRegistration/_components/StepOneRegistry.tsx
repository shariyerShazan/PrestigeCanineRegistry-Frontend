/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllBreedsQuery } from "@/redux/features/breed/breed.api";
import type { ChangeEvent } from "react";
import { FiX } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

type StepOneProps = {
  formData: any;
  updateFormData: (d: any) => void;
  nextStep: () => void;
};

export default function StepOneRegistry({
  formData,
  updateFormData,
  nextStep,
}: StepOneProps) {
  // RTK Query for dynamic breeds
  const { data: breedsRes, isLoading: loadingBreeds } =
    useGetAllBreedsQuery(undefined);
const navigate = useNavigate()
  const breeds = breedsRes || [];

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

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const imageUrls = files.map((file: File) => URL.createObjectURL(file));

    updateFormData({
      uploadedImages: [...(formData.uploadedImages || []), ...imageUrls],
      rawImages: [...(formData.rawImages || []), ...files],
    });
  };

  const removeImage = (index: number) => {
    const newPreviews = (formData.uploadedImages || []).filter(
      (_: any, i: number) => i !== index,
    );
    const newRaw = (formData.rawImages || []).filter(
      (_: any, i: number) => i !== index,
    );
    updateFormData({ uploadedImages: newPreviews, rawImages: newRaw });
  };

  const handleContinue = () => {
    if (
      !formData.name ||
      !formData.breedId ||
      !formData.gender ||
      !formData.dateOfBirth ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode ||
      !formData.country
    ) {
      alert("Please fill in all required fields");
      return;
    }
    nextStep();
  };

  return (
    <div className="space-y-6">
      {/* Dog Name and Breed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dog Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            placeholder="e.g. Bella Daisy"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
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

      {/* Sex and Date of Birth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Color and Weight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            type="text"
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

      {/* Upload Image Section */}
      <div className="flex justify-between items-start pt-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <label className="flex gap-2 bg-[#2B4C8A] px-8 py-3 rounded-lg text-white items-center justify-center cursor-pointer hover:bg-[#1e3a6d] transition-colors">
            <IoCloudUploadOutline className="w-6 h-6" />
            <span className="font-medium">Upload Image</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <p className="text-[#D4AF37] text-sm mt-1">
            First image will be used as thumbnail.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap max-w-[300px] justify-end">
          {(formData.uploadedImages || []).map(
            (image: string, index: number) => (
              <div key={index} className="relative group">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Upload ${index + 1}`}
                  className="w-20 h-16 object-cover rounded border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-1 -right-1 bg-white rounded-full shadow-md p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <FiX className="w-3 h-3 text-red-500" />
                </button>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="px-6 py-2 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#C19B2E] transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
