
import { MapPin, Calendar, Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ownerProfile from "@/assets/ownerDetails/profile.jpg"
import ownerBanner from "@/assets/ownerDetails/ownerBan.jpg"
import OwnerDogs from './_components/OwnerDogs';

const OwnerDetailsPage = () => {

  const ownerData = {
    name: "Sarah Johnson",
    location: "San Diego, CA",
    memberSince: "June 2023",
    avatarUrl: ownerProfile, 
    bannerUrl: ownerBanner, 
    aboutText: "At the forefront of the UAE's construction evolution, Alpha Build Construction is the digital hub for builders, designers, and visionaries. With over 25 years of experience, we've established ourselves as a leading manufacturer, supplier, and contractor specializing in premium building materials and construction services."
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8  min-h-screen font-sans">
      
  
      <div className="relative h-[300px] md:h-[400px] w-full rounded-3xl overflow-hidden shadow-lg mb-10">
        <img 
          src={ownerData.bannerUrl} 
          alt="Owner Banner" 
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute top-6 right-6">
            <Badge className="bg-[#D4AF37] hover:bg-[#B8962E] text-white px-4 py-2 flex items-center gap-2 border-none text-sm font-semibold rounded-lg shadow-md">
            <span className="flex items-center">
                <Award size={20} />
            </span>
            Prestige Ambassadors
            </Badge>


        </div>

        <div className="absolute top-6 left-6 flex items-start gap-4">
          <div className="relative">
             <Avatar className="h-20 w-20 border-4 border-white shadow-xl">
                <AvatarImage src={ownerData.avatarUrl} alt={ownerData.name} className=' object-cover'/>
                <AvatarFallback className="bg-[#2B4C8A] text-white text-xl">SJ</AvatarFallback>
              </Avatar>
          </div>

          <div className="bg-white/95 backdrop-blur-sm px-2 py-2  rounded-xl shadow-2xl min-w-[240px] border border-white/20">
            <h1 className="text-2xl font-semibold  border-b border-gray-300 pb-2 text-gray-900 mb-3">{ownerData.name}</h1>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 ">
                <MapPin size={16} className="" />
                <span className="text-sm font-light">{ownerData.location}</span>
              </div>
              
              <div className="h-[1px] w-full bg-gray-100 my-1" /> {/* Divider line */}
              
              <div className="flex items-center gap-2">
                <Calendar size={16} className="" />
                <span className="text-sm font-light">Member since {ownerData.memberSince}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">About Owner</h2>
        <p className="text-gray-600 leading-relaxed text-md">
          {ownerData.aboutText}
        </p>
      </div>


    <OwnerDogs/>
    </div>
  );
};

export default OwnerDetailsPage;