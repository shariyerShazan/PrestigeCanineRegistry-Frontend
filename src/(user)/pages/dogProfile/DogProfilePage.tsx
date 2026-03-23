/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChevronLeft,
  Flag,
  Share2,
  Dna,
  MapPin,
  Calendar,
  ShieldCheck,
  Camera,
  Palette,
  VenusAndMars,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LuDna } from "react-icons/lu";
import { PiMedalThin } from "react-icons/pi";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router";
import { useGetCanineByIdQuery } from "@/redux/features/canine/canine.api";
import { Skeleton } from "@/components/ui/skeleton";
import ViewMoreOfThiOwner from "./_components/ViewMoreOfThiOwner";
import { useSendHealthRequestMutation } from "@/redux/features/health-request/healthRequest.api";
import { toast } from "react-toastify";
import { HealthSummaryOfOwnerDog } from "@/(owner)/pages/ownerDogPreview/_components/HealthSummary";
import CanineReportDialog from "./_components/CanineReportDialog";
import { useEffect, useState } from "react";
// import { HealthSummaryOfOwnerDog } from "./_components/HealthSummaryOfOwnerDog";

const DogProfilePage = () => {
  const { canineId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [canineId]);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const navigate = useNavigate();

  // RTK Queries
  const { data: canine, isLoading, isError } = useGetCanineByIdQuery(canineId);
  const [sendRequest, { isLoading: isRequesting }] =
    useSendHealthRequestMutation();

  if (isLoading)
    return (
      <div className="p-10">
        <Skeleton className="h-[600px] w-full" />
      </div>
    );

  if (isError || !canine)
    return (
      <div className="p-10 text-center text-red-500">
        Canine data could not be loaded.
      </div>
    );

  // Logic to determine if data is hidden
  const isHidden = canine.primaryBreedDNA === "HIDDEN";

  const handleRequestAccess = async () => {
    try {
      await sendRequest({ canineId: canine.id }).unwrap();
      toast.success("Request sent to owner successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send request");
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-12 bg-white min-h-screen font-sans">
      {/* --- TOP NAVIGATION --- */}
      <div className="flex justify-between items-center mb-6 px-4 lg:px-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-700 font-semibold hover:opacity-70 cursor-pointer"
        >
          <ChevronLeft size={20} /> Back
        </button>
        <div className="flex gap-4 text-gray-500">
          <button
            onClick={() => setIsReportModalOpen(true)} // Click handler add kora hoyeche
            className="flex items-center gap-1 text-sm hover:underline cursor-pointer text-red-500 font-medium"
          >
            <Flag size={16} /> Report
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Profile link copied to clipboard!");
            }}
            className="flex items-center gap-1 text-sm hover:underline cursor-pointer hover:text-[#2B4C8A] transition-colors"
          >
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 px-4 lg:px-0">
        {/* --- LEFT: IMAGE GALLERY --- */}
        <div>
          <div className="rounded-2xl overflow-hidden mb-4 aspect-square border shadow-sm">
            <img
              src={canine.images?.[0]?.url || "/placeholder-dog.jpg"}
              alt={canine.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-3">
            {canine.images?.slice(1, 4).map((img: any) => (
              <img
                key={img.id}
                src={img.url}
                className="w-20 h-20 rounded-lg object-cover border"
              />
            ))}
            <div className="w-20 h-20 rounded-lg bg-gray-100 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-200">
              <Camera size={20} />
              <span className="text-xs font-medium">
                {canine.images?.length || 0} photos
              </span>
            </div>
          </div>
        </div>

        {/* --- RIGHT: INFO & OWNER --- */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl font-bold text-gray-900 capitalize">
                {canine.name}
              </h1>
              <Badge className="bg-[#2B4C8A] hover:bg-[#2B4C8A] flex gap-1 items-center py-1">
                <ShieldCheck size={20} className="text-yellow-500" />{" "}
                {canine.tier} Verified
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-y-3 text-gray-600">
              <InfoItem
                icon={<LuDna size={18} />}
                label="Breed"
                value={canine.breedRelation?.name || "N/A"}
              />
              <InfoItem
                icon={<Palette size={18} />}
                label="Color"
                value={canine.color}
              />
              <InfoItem
                icon={<VenusAndMars size={18} />}
                label="Sex"
                value={canine.gender}
              />
              <InfoItem
                icon={<MapPin size={18} />}
                label="Location"
                value={`${canine.city}, ${canine.country}`}
              />
              <InfoItem
                icon={<Calendar size={18} />}
                label="Registered"
                value={new Date(canine.createdAt).toLocaleDateString()}
              />
              <InfoItem
                icon={<ShieldCheck size={18} />}
                label="Status"
                value={canine.status}
                color="text-[#2B4C8A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <DataBox
              label="PCR ID"
              value={canine.pcrId}
              valueColor="text-[#2B4C8A]"
            />
            <DataBox
              label="Microchip"
              value={canine.microchipId || "N/A"}
              valueColor="text-[#2B4C8A]"
            />
            <DataBox
              label="Date of Birth"
              value={new Date(canine.dateOfBirth).toLocaleDateString()}
              valueColor="text-[#2B4C8A]"
            />
            <DataBox
              label="Weight"
              value={`${canine.weight} lbs`}
              valueColor="text-[#2B4C8A]"
            />
          </div>

          {/* OWNER CARD */}
          <div className="bg-[#2B4C8A] rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm font-medium opacity-80 mb-4">
              Owner Information
            </p>
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-14 w-14 border-2 border-white/20">
                <AvatarImage
                  src={canine.owner?.profileImage}
                  className="object-cover"
                />
                <AvatarFallback className="text-black">
                  {canine.owner?.fullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{canine.owner?.fullName}</h3>
            </div>
            <div className="space-y-2 text-sm opacity-90">
              <p className="flex items-center gap-2">
                <PiMedalThin size={14} /> Gold Member
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={14} /> {canine.city}
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={14} /> PCR ID: {canine.owner?.pcrId}
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-10 border-gray-200" />

      {/* --- BOTTOM: DNA & HEALTH --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 lg:px-0 mb-12">
        {/* DNA REPORT SECTION */}
        <div
          className={`bg-[#1A1A1A] text-white rounded-lg p-6 relative overflow-hidden min-h-[350px]`}
        >
          <div
            className={`flex justify-between items-center mb-8 ${isHidden ? "blur-sm grayscale" : ""}`}
          >
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-600/20 rounded-lg">
                <Dna className="text-yellow-500" size={20} />
              </div>
              <h4 className="font-bold">DNA Report Breakdown</h4>
            </div>
          </div>

          {!isHidden ? (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Primary breeds:</span>
                </div>
                <div className="flex justify-between font-bold mb-1">
                  <span>{canine.breedRelation?.name}</span>
                  <span className="text-yellow-500">
                    {canine.primaryBreedDNA}%
                  </span>
                </div>
                <Progress
                  value={Number(canine.primaryBreedDNA)}
                  indicatorClassName="bg-[#D4AF37]"
                  className="h-2 bg-gray-800"
                />
              </div>
              {canine.secondaryBreedDNA && (
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-gray-400 text-sm font-normal">
                      Secondary: Mixed
                    </span>
                    <span className="text-blue-400 text-sm">
                      {canine.secondaryBreedDNA}%
                    </span>
                  </div>
                  <Progress
                    value={Number(canine.secondaryBreedDNA)}
                    className="h-2 bg-gray-800"
                    indicatorClassName="bg-[#2B4C8A]"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] p-6 text-center">
              <Dna size={40} className="text-gray-500 mb-2 opacity-20" />
              <p className="text-gray-400 text-sm font-medium">
                DNA details are private
              </p>
            </div>
          )}
        </div>

        {/* HEALTH SUMMARY SECTION */}
        <div className="relative rounded-xl overflow-hidden min-h-[300px] shadow-2xl">
          {/* Actual Content with Blur */}
          <div
            className={`h-full transition-all duration-700 ${
              isHidden
                ? "blur-[4px] opacity-70 pointer-events-none select-none"
                : ""
            }`}
          >
            <HealthSummaryOfOwnerDog
              status={canine.healthStatus}
              vaccinations={canine.vaccinations}
              clearances={canine.healthClearances}
            />
          </div>

          {/* Floating "Request Health Reports" Button Overlay */}
          {isHidden && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                disabled={isRequesting}
                onClick={handleRequestAccess}
                className="bg-[#D4AF37] cursor-pointer hover:bg-[#B8962E] text-gray-900 font-bold px-8 py-7 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.4)] cursor-pointer active:scale-95 transition-all text-base border-none"
              >
                {isRequesting ? (
                  <Loader2 className="animate-spin mr-2" size={20} />
                ) : null}
                {isRequesting ? "Sending Request..." : "Request Health Reports"}
              </Button>
            </div>
          )}
        </div>
      </div>

      <ViewMoreOfThiOwner ownerId={canine?.owner?.id}/>

      <CanineReportDialog
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        canineId={canine.id}
        targetName={canine.name}
      />
    </div>
  );
};

// Reusable Sub-components
export const InfoItem = ({
  icon,
  label,
  value,
  color = "text-gray-900",
}: any) => (
  <div className="flex items-center gap-3 text-sm">
    <span className="text-blue-800">{icon}</span>
    <span className="w-24 text-gray-500 font-medium">{label}:</span>
    <span className={`font-semibold capitalize ${color}`}>{value}</span>
  </div>
);

export const DataBox = ({ label, value, valueColor }: any) => (
  <div className="bg-gray-100 p-3 rounded-lg">
    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">
      {label}
    </p>
    <p className={`text-sm font-bold ${valueColor}`}>{value}</p>
  </div>
);

export default DogProfilePage;
