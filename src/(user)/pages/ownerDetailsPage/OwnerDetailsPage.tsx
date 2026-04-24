/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Calendar, Award, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import OwnerDogs from "./_components/OwnerDogs";
import { useNavigate, useParams } from "react-router";
import { format } from "date-fns";
import { useGetUserProfileQuery } from "@/redux/features/auth/authApi";
import { useEffect } from "react";

const OwnerDetailsPage = () => {
  const navigate = useNavigate()
  const { ownerId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ownerId]);
  

  // 1. Logic: Fetch dynamic data based on URL param
  const {
    data: response,
    isLoading,
    isError,
  } = useGetUserProfileQuery(ownerId as string, { skip: !ownerId });

  const owner = response?.data;

  // 2. Logic: Time and Duration Calculation
  const memberSinceDate = owner?.createdAt
    ? new Date(owner.createdAt)
    : new Date();

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="animate-spin text-[#2B4C8A]" size={48} />
      </div>
    );
  }

  if (isError || !owner) {
    return (
      <div className="text-center py-20 font-bold text-gray-500">
        Owner profile not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 p-4 md:p-8 min-h-screen font-sans">
          {/* 3. Logic: Banner Section with Prestige Badge */}
          <div className="relative h-[300px] md:h-[400px] w-full rounded-3xl overflow-hidden shadow-lg mb-10">
        <img
          src={
            owner.coverImage?.url ||
            "[https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop](https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop)"
          }
          alt="Owner Banner"
          className="w-full h-full object-cover brightness-75"
        />
        {owner.pcrPrefix === "PA" && (
          <div onClick={() => navigate(`/pa-details/${owner.id}`)} className=" cursor-pointer absolute top-6 right-6">
            <Badge className="bg-[#D4AF37] hover:bg-[#B8962E] text-white px-4 py-2 flex items-center gap-2 border-none text-sm font-semibold rounded-lg shadow-md">
              <Award size={20} />
              {"Prestige Ambassador"}
            </Badge>
          </div>
        )}
        {/* 4. Logic: Floating Identity Card (Apnar Design Onujayi) */}
        <div className="absolute top-6 left-6 flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-4 border-white shadow-xl">
              <AvatarImage
                src={owner.profileImage?.url}
                alt={owner.fullName}
                className="object-cover"
              />
              <AvatarFallback className="bg-[#2B4C8A] text-white text-xl">
                {owner.fullName?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="bg-white/95 backdrop-blur-sm px-2 py-2 rounded-xl shadow-2xl min-w-[240px] border border-white/20">
            <h1 className="text-2xl font-semibold border-b border-gray-300 pb-2 text-gray-900 mb-3 px-2">
              {owner.fullName}
            </h1>

            <div className="space-y-2 px-2">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <span className="text-sm font-light text-gray-700">
                  {owner.city ? `${owner.city}, ${owner.country}` : "Global"}
                </span>
              </div>

              <div className="h-[1px] w-full bg-gray-100 my-1" />

              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-sm font-light text-gray-700">
                  Member since {format(memberSinceDate, "MMMM yyyy")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Logic: About Section with Active Time Badge */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">About Owner</h2>
        </div>
        <p className="text-gray-600 leading-relaxed text-md">
          {owner.about || "This owner has not provided a bio yet."}
        </p>
      </div>

      {/* 6. Logic: Registry Stats Card (Optional) */}
      {/* <div className="bg-[#0F172A] text-white rounded-2xl p-6 shadow-xl mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
            Official Registry ID
          </p>
          <p className="text-xl font-mono font-bold tracking-tighter">
            {owner.pcrId}
          </p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
          <ShieldCheck size={18} /> Verified PCR Account
        </div>
      </div> */}

      {/* Dynamic Dogs List */}
      <OwnerDogs ownerId={owner.id} ownerName={owner.fullName} />
    </div>
  );
};

// Dummy ShieldCheck icon component reference
// const ShieldCheck = ({ size }: { size: number }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//     <path d="m9 12 2 2 4-4" />
//   </svg>
// );

export default OwnerDetailsPage;
