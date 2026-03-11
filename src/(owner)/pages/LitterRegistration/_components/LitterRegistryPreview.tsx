/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dog1 from "@/assets/litter/litter.png";
import owner from "@/assets/ownerDetails/profile.jpg";

type Props = {
  formData: any;
};

export default function LitterRegistryPreview({ formData }: Props) {
  // logic to handle image removal if needed from preview
  const firstImage =
    formData.uploadedImages && formData.uploadedImages.length > 0
      ? formData.uploadedImages[0]
      : dog1 || dog1;

  return (
    <div className="bg-white h-min rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview Card</h3>

      <div className="shadow-md rounded-lg overflow-hidden border border-gray-100">
        {/* Dog Image Section */}
        <div className="relative h-48 bg-gray-50">
          <img
            src={firstImage}
            alt="Dog preview"
            className="w-full h-full object-cover"
          />
          {formData.uploadedImages?.length > 0 && (
            <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-bold uppercase">
              {formData.uploadedImages.length}{" "}
              {formData.uploadedImages.length > 1 ? "Photos" : "Photo"}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-4 bg-white">
          <div className="mb-3">
            <h4 className="text-lg font-bold text-gray-900 truncate">
              {formData.name || "Litter/Puppy Name"}
            </h4>
            <p className="text-sm font-medium text-[#D4AF37] mt-0.5">
              {formData.breedName || "Select Breed"}
            </p>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Microchip ID:</span>
              <span className="text-gray-700 font-medium">
                {formData.microchipId || "N/A"}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Generation:</span>
              <span className="text-gray-700 font-medium">
                {formData.generation || "N/A"}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Sex:</span>
              <span className="text-gray-700 font-medium">
                {formData.gender || "Not Selected"}
              </span>
            </div>
          </div>

          <hr className="border-gray-100 mb-4" />

          {/* Owner/Breeder Placeholder */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden ring-2 ring-gray-50">
              <img
                src={owner || owner}
                className="w-full h-full object-cover"
                alt="Breeder"
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-xs text-gray-400 uppercase font-bold tracking-wider"
                style={{ fontSize: "8px" }}
              >
                Breeder/Registrant
              </span>
              <span className="text-sm font-semibold text-gray-900 leading-none">
                Shariyer Shazan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Status Badges */}
      <div className="mt-4 flex flex-wrap gap-2">
        {formData.healthStatus && (
          <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded border border-green-100">
            {formData.healthStatus.toUpperCase()}
          </span>
        )}
        {formData.primaryBreedDNA && (
          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded border border-blue-100">
            {formData.primaryBreedDNA}% DNA
          </span>
        )}
      </div>
    </div>
  );
}
