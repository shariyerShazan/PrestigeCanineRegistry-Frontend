/* eslint-disable @typescript-eslint/no-explicit-any */
import dog1 from "@/assets/home/allDogs/dog1.png";
import owner from "@/assets/ownerDetails/profile.jpg";
import { FiX } from "react-icons/fi";

type Props = {
  formData: any;
};

export default function RegistryPreview({ formData }: Props) {
  // logic to get the first image preview if available
  const imagePreview =
    formData.uploadedImages && formData.uploadedImages.length > 0
      ? formData.uploadedImages[0]
      : dog1;

  return (
    <div className="bg-white h-min rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>

      <div className="shadow-md rounded-lg overflow-hidden border border-gray-100">
        {/* Dog Image Section */}
        <div className="relative h-48 bg-gray-100">
          <img
            src={imagePreview}
            alt="Dog preview"
            className="w-full h-full object-cover"
          />
          {formData.uploadedImages?.length > 0 && (
            <button
              type="button"
              className="absolute top-2 right-2 w-8 h-8 bg-white/70 hover:bg-white rounded-full transition-all flex items-center justify-center shadow-sm"
            >
              <FiX className="w-5 h-5 text-red-500" />
            </button>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 bg-white">
          <div className="flex justify-between items-start mb-1">
            <h4 className="text-lg font-bold text-gray-900 truncate flex-1">
              {formData.name || "Dog Name"}
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded uppercase">
              {formData.gender || "Gender"}
            </span>
          </div>

          <p className="text-sm font-semibold text-[#D4AF37] mb-1">
            {formData.breedName || "Selected Breed"}
          </p>

          {formData.generation && (
            <p className="text-[11px] font-medium text-blue-600 mb-2">
              Generation: {formData.generation}
            </p>
          )}

          <div className="space-y-1.5 mb-4">
            <div className="flex justify-between text-[11px] text-gray-500 border-b border-gray-50 pb-1">
              <span>Microchip:</span>
              <span className="text-gray-800 font-mono">
                {formData.microchipId || "N/A"}
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-gray-500 border-b border-gray-50 pb-1">
              <span>DNA:</span>
              <span className="text-gray-800">
                {formData.primaryBreedDNA
                  ? `${formData.primaryBreedDNA}%`
                  : "N/A"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
            <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden border border-gray-100">
              <img
                src={owner}
                className="w-full h-full object-cover"
                alt="Owner"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-gray-900 leading-tight">
                Shariyer Shazan
              </span>
              <span className="text-[10px] text-gray-500">
                Registered Owner
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Tip */}
      <p className="mt-4 text-[11px] text-gray-400 text-center italic">
        * This is a live preview of how the dog will appear in our registry.
      </p>
    </div>
  );
}
