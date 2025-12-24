import dog1 from "@/assets/home/allDogs/dog1.png"
import owner from "@/assets/ownerDetails/profile.jpg"
import { FiX } from "react-icons/fi"

type Props = {
  formData: any
}

export default function RegistryPreview({ formData }: Props) {
  return (
    <div className="bg-white h-min rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>

      <div className="shadow-md rounded-lg overflow-hidden">
        <div className="relative h-48 bg-gray-100">
          <img
            src={formData.uploadedImages?.[0] || dog1}
            alt="Dog preview"
            className="w-full h-full object-cover"
          />
          <button className="absolute top-2 right-2 w-8 h-8 bg-white  bg-opacity-50 rounded-sm cursor-pointer flex items-center justify-center">
            <FiX className="w-7 h-7 text-red-500" />
          </button>
        </div>

        <div className="p-4">
          <h4 className="text-lg font-bold text-gray-900 mb-1">
            Name: {formData.dogName || "Bella Daisy"}
          </h4>
          <p className="text-sm text-[#D4AF37] mb-2">
            Breed: {formData.breed || "Golden Retriever"}
          </p>
          <p className="text-sm text-gray-600 mb-4">PKD ID: #PCR-LR-009876</p>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
              <img src={owner} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-medium text-gray-900">
              Sarah Johnson
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
