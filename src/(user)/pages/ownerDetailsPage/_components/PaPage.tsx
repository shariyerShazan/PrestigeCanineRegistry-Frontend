
import { useGetBreederProfileQuery } from "@/redux/features/blog/breederProgramApi";
import { Loader2, MapPin, Calendar, Globe, Shield } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useGetUserProfileQuery } from "@/redux/features/auth/authApi";
import palogo from "@/assets/ambasedor/pa.svg"
import PaBlogLitterSection from "./PaBlogLitterSection";

const PaDetails = () => {
  const { ownerId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ownerId]);

  const { data: response, isLoading: userLoading } = useGetUserProfileQuery(ownerId as string, { skip: !ownerId });
  const owner = response?.data;

  const { data: program, isLoading: programLoading } = useGetBreederProfileQuery(owner?.id, {
    skip: !owner?.id
  });

  if (userLoading || programLoading) {
    return (
      <div className="flex justify-center py-20 w-full bg-[#f9fafb] min-h-screen">
        <Loader2 className="animate-spin text-gray-400" size={36} />
      </div>
    );
  }

  if (!owner || !program) {
    return (
      <div className="text-center py-20 text-gray-500 bg-[#f9fafb] min-h-screen">
        No breeder program found for this user.
      </div>
    );
  }

  const renderSection = (title: string, intro: string, points: string[], outro: string) => {
    if (!intro && (!points || points.length === 0) && !outro) return null;

    return (
      <div className="bg-white rounded-xl p-5 md:p-[26px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-gray-100 mb-[14px] ">
        <h3 className="text-[16px] md:text-[17px] font-bold text-gray-900 mb-[14px]">{title}</h3>
        <div className="text-[14px] md:text-[14.5px] text-gray-700 leading-[1.6] space-y-4">
          {intro && <p className="whitespace-pre-wrap">{intro}</p>}

          {points?.length > 0 && (
            <ul className="space-y-[4px]">
              {points.map((point: string, idx: number) => (
                <li key={idx} className="flex flex-row items-start gap-[6px]">
                  <span className="shrink-0 font-bold text-gray-600 mt-[0px] md:mt-[1px]">•</span>
                  <span className="whitespace-pre-wrap">{point}</span>
                </li>
              ))}
            </ul>
          )}

          {outro && <p className="whitespace-pre-wrap">{outro}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#f9fafb] min-h-screen font-sans pb-20 mt-12">
      <div className="max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row gap-[18px] mb-[18px]">

          {/* Main Banner Area */}
          <div className="flex-[3] h-[280px] md:h-[400px] lg:h-[420px] rounded-xl overflow-hidden relative shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-200/50">
            {program.bannerUrl ? (
              <img src={program.bannerUrl} alt="Kennel Banner" className="w-full h-full object-cover" />
            ) : owner.coverImage?.url ? (
              <img src={owner.coverImage.url} alt="Owner Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-black flex items-center justify-center text-slate-500 italic">
                Pawhalla Premium Banner
              </div>
            )}

            {/* Prestige Ambassador Badge */}
            {owner.pcrPrefix === "PA" && (
              <div className="absolute top-4 left-4 md:top-[18px] md:left-[18px] flex flex-col items-center">
                <img src={palogo} alt="PA Logo" className="w-[72px] h-[72px] md:w-[86px] md:h-[86px] object-contain drop-shadow-xl" />
              </div>
            )}
          </div>

          {/* User Info Card (Floating Right) */}
          <div className="lg:w-[320px] xl:w-[340px] flex-shrink-0">
            <div className="bg-white rounded-xl p-[22px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-gray-100 h-full flex flex-col">
              <div className="flex items-center gap-[14px] border-b border-gray-100 pb-[18px] mb-[18px]">
                <Avatar className="h-[48px] w-[48px] border border-gray-100 shadow-sm">
                  <AvatarImage src={owner.profileImage?.url} className="object-cover" />
                  <AvatarFallback className="bg-slate-900 text-[#D4AF37] font-bold text-[16px]">
                    {owner.fullName?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-[17px] font-bold text-gray-900 leading-tight">{owner.fullName}</h2>
              </div>

              <div className="space-y-[12px]">
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin className="w-[15px] h-[15px] text-gray-400 mt-[2px] shrink-0" strokeWidth={2} />
                  <span className="text-[13.5px] leading-tight font-medium text-gray-700">{program.programName || "Pawhalla Kennels"}</span>
                </div>

                <div className="flex items-start gap-3 text-gray-600">
                  <Calendar className="w-[15px] h-[15px] text-gray-400 mt-[2px] shrink-0" strokeWidth={2} />
                  <span className="text-[13.5px] leading-tight text-gray-500">Member since {format(new Date(owner.createdAt || new Date()), 'MMM yyyy')}</span>
                </div>

                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin className="w-[15px] h-[15px] text-gray-400 mt-[2px] shrink-0" strokeWidth={2} />
                  <span className="text-[13.5px] leading-tight text-gray-500">{program.location || "Dallas, TX"}</span>
                </div>

                {program.website && (
                  <div className="flex items-start gap-3 text-gray-600">
                    <Globe className="w-[15px] h-[15px] text-gray-400 mt-[2px] shrink-0" strokeWidth={2} />
                    <a href={program.website} target="_blank" className="text-[13.5px] leading-tight text-gray-500 hover:text-gray-900 hover:underline transition-colors truncate">
                      {program.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}

                <div className="flex items-start gap-3 text-gray-600">
                  <Shield className="w-[15px] h-[15px] text-gray-400 mt-[2px] shrink-0" strokeWidth={2} />
                  <span className="text-[13.5px] leading-tight text-gray-500">{program.programName?.split(' ')[0] || "Pawhalla"}</span>
                </div>

                <div className="flex items-start gap-3 text-gray-600">
                  <Calendar className="w-[15px] h-[15px] text-gray-400 mt-[2px] shrink-0" strokeWidth={2} />
                  <span className="text-[13.5px] leading-tight text-gray-500">Member since {format(new Date(owner.createdAt || new Date()), 'MMM yyyy')}</span>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Sections (About, Philosophy, etc.) */}
        <div className="flex flex-col gap-0 w-full mb-10 ">
          {renderSection(
            program.programName ? `About ${program.programName}` : "About Pawhalla Kennels",
            program.aboutIntro,
            program.aboutPoints,
            program.aboutOutro
          )}
          {renderSection(
            "Our Breeding Philosophy",
            program.philosophyIntro,
            program.philosophyPoints,
            program.philosophyOutro
          )}
          {renderSection(
            program.programName ? `${program.programName} Goals` : "Pawhallas Goals",
            program.goalsIntro,
            program.goalsPoints,
            program.goalsOutro
          )}
          {renderSection(
            "Litter Practices",
            program.litterIntro,
            program.litterPoints,
            program.litterOutro
          )}
          {renderSection(
            "Our Screening Process",
            program.screeningIntro,
            program.screeningPoints,
            program.screeningOutro
          )}
        </div>
      </div>

      <PaBlogLitterSection program={program} />
    </div>
  );
};

export default PaDetails;