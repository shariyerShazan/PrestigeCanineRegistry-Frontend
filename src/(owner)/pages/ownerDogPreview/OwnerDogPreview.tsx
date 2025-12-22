
import { 
  ChevronLeft, Flag, Share2, Dna, MapPin, 
  Calendar, ShieldCheck, Camera,  Palette, 
  VenusAndMars
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dog1 from "@/assets/dogSearchPage/dog1.jpg"
import dog2 from "@/assets/dogSearchPage/dog2.png"
import dog3 from "@/assets/dogSearchPage/dog3.jpg"
import { LuDna } from "react-icons/lu";
import owner from "@/assets/gogDetails/owner.jpg"
import { PiMedalThin } from "react-icons/pi";
import { Progress } from "@/components/ui/progress"
import HealthSummaryOfOwnerDog from './_components/HealthSummary';



const OwnerDogPreview = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen font-sans">
      {/* --- TOP NAVIGATION --- */}
      <div className="flex justify-between items-center mb-6">
        <button className="flex items-center gap-1 text-gray-700 font-semibold hover:opacity-70 cursor-pointer">
          <ChevronLeft size={20} /> Back
        </button>
        <div className="flex gap-4 text-gray-500">
          <button className="flex items-center gap-1 text-sm hover:underline cursor-pointer"><Flag size={16} /> Report</button>
          <button className="flex items-center gap-1 text-sm hover:underline cursor-pointer"><Share2 size={16} /> Share</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* --- LEFT: IMAGE GALLERY --- */}
        <div>
          <div className="rounded-2xl overflow-hidden mb-4 aspect-square">
            <img 
              src={dog1} 
              alt="Bella Daisy" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-3">
            <img src={dog2}  className="w-20 h-20 rounded-lg object-cover border" />
            <img src={dog3}  className="w-20 h-20 rounded-lg object-cover border" />
            <div className="w-20 h-20 rounded-lg bg-gray-100 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-200">
              <Camera size={20} />
              <span className="text-xs font-medium">3 photos</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT: INFO & OWNER --- */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl font-bold text-gray-900">Bella Daisy</h1>
              
              <Badge className="bg-[#2B4C8A] hover:bg-[#2B4C8A] flex gap-1 items-center py-1">
                <ShieldCheck size={20} className="text-yellow-500" /> Gold Verified
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-y-3 text-gray-600">
              <InfoItem icon={<LuDna size={18} />} label="Breed" value="Golden Retriever" />
              <InfoItem icon={<Palette size={18} />} label="Color" value="Golden" />
              <InfoItem icon={<VenusAndMars size={18} />} label="Sex" value="Male" />
              <InfoItem icon={<MapPin size={18} />} label="Location" value="San Diego, CA" />
              <InfoItem icon={<Calendar size={18} />} label="Registered" value="January 15, 2024" />
              <InfoItem icon={<ShieldCheck size={18} />} label="Status" value="Verified & Active" color="text-[#2B4C8A]" />
            </div>
          </div>

          {/* DATA GRID */}
          <div className="grid grid-cols-2 gap-3">
            <DataBox label="PCR ID" value="PCR-GR-2024-001234" valueColor="text-[#2B4C8A]" />
            <DataBox label="Microchip" value="985112001234567" valueColor="text-[#2B4C8A]" />
            <DataBox label="Date of Birth" value="March 15, 2021" valueColor="text-[#2B4C8A]" />
            <DataBox label="Weight" value="65 lbs" valueColor="text-[#2B4C8A]" />
          </div>

          {/* OWNER CARD */}
          <div className="bg-[#2B4C8A] rounded-xl p-6 text-white">
            <p className="text-sm font-medium opacity-80 mb-4">Owner Information</p>
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-14 w-14 border-2 border-white/20">
                <AvatarImage src={owner} className='object-cover'/>
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">Sarah Johnson</h3>
            </div>
            <div className="space-y-2 text-sm opacity-90">
              <p className="flex items-center gap-2"><PiMedalThin size={14} /> Gold Member</p>
              <p className="flex items-center gap-2"><MapPin size={14} /> San Diego, CA</p>
              <p className="flex items-center gap-2"><Calendar size={14} /> Member since June 2023</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-10 border-gray-200" />

      {/* --- BOTTOM: DNA & HEALTH --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DNA REPORT */}
        <div className="bg-[#1A1A1A] text-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-600/20 rounded-lg">
                <Dna className="text-yellow-500" size={20} />
              </div>
              <h4 className="font-bold">DNA Report Breakdown</h4>
            </div>
            <Badge variant="outline" className="text-[10px] h-6 text-gray-400 border-gray-700">
               <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span> Golden Retriever
            </Badge>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Primary breeds:</span>
              </div>
              <div className="flex justify-between font-bold mb-1">
                <span>Golden Retriever</span>
                <span className="text-yellow-500">98.5%</span>
              </div>
           <Progress value={95.5} indicatorClassName="bg-[#D4AF37]" />



            </div>

            <div>
              <div className="flex justify-between text-sm mb-2 text-gray-400">
                <span>Secondary breeds:</span>
              </div>
              <div className="flex justify-between font-bold mb-1">
                <span>Labrador Retriever</span>
                <span className="text-blue-400 text-sm">1.5%</span>
              </div>
              <Progress value={4.5} className="h-2 bg-gray-800" indicatorClassName="bg-[#2B4C8A]" />
            </div>
          </div>
        </div>

        {/* HEALTH SUMMARY (BLURRED SECTION) */}
        <div className="w-full">
                      <HealthSummaryOfOwnerDog />
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const InfoItem = ({ icon, label, value, color = "text-gray-900" } : {icon: any, label : string , value: string, color? : string}) => (
  <div className="flex items-center gap-3 text-sm">
    <span className="text-blue-800">{icon}</span>
    <span className="w-24 text-gray-500 font-medium">{label}:</span>
    <span className={`font-semibold ${color}`}>{value}</span>
  </div>
);

const DataBox = ({ label, value, valueColor }: { label : any , value : string , valueColor : string }) => (
  <div className="bg-gray-100 p-3 rounded-lg">
    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">{label}</p>
    <p className={`text-sm font-bold ${valueColor}`}>{value}</p>
  </div>
);

export default OwnerDogPreview;