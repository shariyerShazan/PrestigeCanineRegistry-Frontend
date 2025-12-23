import { Badge } from "@/components/ui/badge"
import { ShieldCheck } from "lucide-react"
import { 
 Dna, MapPin, 
  Calendar,  Palette, 
  VenusAndMars
} from 'lucide-react';


import { LuDna } from "react-icons/lu";

import { DataBox, InfoItem } from "@/(user)/pages/dogProfile/DogProfilePage";
import { Label } from "@radix-ui/react-label";
import { Progress } from "@/components/ui/progress";
import RegistryHealthSummaryDog from "./RegistryHealthSummaryDog";


type StepThreeProps = {
  formData?: any
  prevStep: () => void
  handleSubmit: () => void
}

export default function StepThreeRegistry({ formData: _formData, prevStep, handleSubmit }: StepThreeProps) {
  const form = _formData || {}

  const formatDate = (d: string) => {
    if (!d) return "-"
    try {
      const dt = new Date(d)
      return dt.toLocaleDateString()
    } catch {
      return d
    }
  }

  const renderImage = (src: any, i: number) => (
    <div key={i} className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
      <img src={src} alt={`img-${i}`} className="w-full h-full object-cover" />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* Title + Basic Info */}
        <div>
          <div className="flex items-center gap-3 mb-4 text-lg font-semibold text-gray-900">
            <Label>Name:</Label>
            <h1 className="">{form.dogName || "-"}</h1>
          </div>

          <div className="grid grid-cols-1 gap-y-3 text-gray-600">
            <InfoItem icon={<LuDna size={18} />} label="Breed" value={form.breed || "-"} />
            <InfoItem icon={<Palette size={18} />} label="Color" value={form.color || "-"} />
            <InfoItem icon={<VenusAndMars size={18} />} label="Sex" value={form.sex || "-"} />
            <InfoItem icon={<MapPin size={18} />} label="Location" value={form.location || "-"} />
            <InfoItem icon={<Calendar size={18} />} label="Date of Birth" value={formatDate(form.dateOfBirth)} />
            <InfoItem icon={<ShieldCheck size={18} />} label="Health Status" value={form.healthStatus || "-"} />
          </div>
        </div>

        {/* Images preview */}
        {((form.uploadedImages || []).length > 0) && (
          <div>
            <h4 className="font-semibold mb-2">Uploaded Images</h4>
            <div className="flex gap-2">{(form.uploadedImages || []).map((src: any, i: number) => renderImage(src, i))}</div>
          </div>
        )}

        {/* DATA GRID */}
        <div className="grid grid-cols-2 gap-3">
          <DataBox label="PCR ID" value={form.pcrId || "-"} valueColor="text-[#2B4C8A]" />
          <DataBox label="Microchip" value={form.microchipId || "-"} valueColor="text-[#2B4C8A]" />
          <DataBox label="Weight" value={form.weight || "-"} valueColor="text-[#2B4C8A]" />
          <DataBox label="Primary Breed DNA" value={form.primaryBreedDNA ? `${form.primaryBreedDNA} (${form.primaryBreedPercent || "-"}%)` : "-"} valueColor="text-[#2B4C8A]" />
        </div>

        <div className="flex flex-col mt-6 gap-6">
          {/* DNA REPORT (summary) */}
          <div className="bg-[#1A1A1A] text-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <Dna className="text-yellow-500" size={20} />
                </div>
                <h4 className="font-bold">DNA Report Breakdown</h4>
              </div>
              <Badge variant="outline" className="text-[10px] h-8 px-3 py-1 text-gray-400 border-gray-700 text-sm">
               <span className="w-2 h-2  rounded-full bg-yellow-500 mr-2"></span> Golden Retriever
            </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Primary breeds:</span>
                </div>
                <div className="flex justify-between font-bold mb-1">
                  <span>{form.primaryBreedDNA || "-"}</span>
                  <span className="text-yellow-500">{form.primaryBreedPercent ? `${form.primaryBreedPercent}%` : "-"}</span>
                </div>
                <Progress value={Number(form.primaryBreedPercent) || 0} indicatorClassName="bg-[#D4AF37]" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 text-gray-400">
                  <span>Secondary breeds:</span>
                </div>
                <div className="flex justify-between font-bold mb-1">
                  <span>{form.secondaryBreedDNA || "-"}</span>
                  <span className="text-blue-400 text-sm">{form.secondaryBreedPercent ? `${form.secondaryBreedPercent}%` : "-"}</span>
                </div>
                <Progress value={Number(form.secondaryBreedPercent) || 0} className="h-2 bg-gray-800" indicatorClassName="bg-[#2B4C8A]" />
              </div>
            </div>
          </div>

          {/* HEALTH SUMMARY (component) */}
          <div className="w-full">
            <RegistryHealthSummaryDog />
          </div>
        </div>

        {/* Vaccinations, Clearances, Documents */}
        <div className="px-3">
          <h4 className="font-bold mb-3">Additional Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Vaccinations</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {(form.vaccinations || []).length > 0 ? (
                  (form.vaccinations || []).map((v: string, i: number) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-[#D4AF37] text-black text-sm">{v}</span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">None</p>
                )}
              </div>

              <p className="font-medium mt-4">Health Clearances</p>
              <div className="mt-2">
                {(form.healthClearances || []).length > 0 ? (
                  <ul className="list-disc list-inside text-sm">
                    {(form.healthClearances || []).map((c: string, i: number) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">None</p>
                )}
              </div>
            </div>

            <div>
              <p className="font-medium">Uploaded Documents</p>
              <div className="mt-2">
                {(form.uploadedDocuments || []).length > 0 ? (
                  <ul className="text-sm">
                    {(form.uploadedDocuments || []).map((f: any, i: number) => (
                      <li key={i} className="mb-1">{f?.name || String(f)}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">None</p>
                )}

              <p className="font-medium mt-4">Health Notes</p>
              <p className="text-sm text-gray-700 mt-2">{form.healthNotes || "-"}</p>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 cursor-pointer"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#D4AF37] text-white rounded-lg font-medium hover:bg-[#C19B2E] cursor-pointer"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
      </div>
  )
}
