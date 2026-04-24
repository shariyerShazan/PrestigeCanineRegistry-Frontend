"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Edit2, Save, X, Loader2, Plus, Trash2, Info, Camera, Globe, MapPin 
} from "lucide-react";
import { 
  useGetBreederProfileQuery, 
  useUpsertBreederProfileMutation 
} from "@/redux/features/blog/breederProgramApi";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";


/* ---------------- DYNAMIC CONTENT SECTION ---------------- */

interface StructuredSectionProps {
  title: string;
  data: any;
  prefix: string;
  isEditing: boolean;
  onUpdate: (key: string, value: any) => void;
}

const StructuredSection = ({ title, data, prefix, isEditing, onUpdate }: StructuredSectionProps) => {
  const introKey = `${prefix}Intro`;
  const pointsKey = `${prefix}Points`;
  const outroKey = `${prefix}Outro`;

  const handleAddPoint = () => {
    const currentPoints = data[pointsKey] || [];
    onUpdate(pointsKey, [...currentPoints, ""]);
  };

  const handleRemovePoint = (index : any) => {
    const currentPoints = [...(data[pointsKey] || [])];
    currentPoints.splice(index, 1);
    onUpdate(pointsKey, currentPoints);
  };

  const handlePointChange = (index : any, value: any) => {
    const currentPoints = [...(data[pointsKey] || [])];
    currentPoints[index] = value;
    onUpdate(pointsKey, currentPoints);
  };

  return (
    <Card className="border border-slate-100 shadow-sm rounded-xl overflow-hidden bg-white mb-6">
      <div className="px-6 py-4 border-b bg-slate-50/50 flex items-center gap-2">
        <Info className="w-4 h-4 text-[#2B4C8A]" />
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      </div>
      <CardContent className="p-6 space-y-6">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Intro Description</label>
              <Textarea 
                value={data[introKey] || ""} 
                onChange={(e) => onUpdate(introKey, e.target.value)}
                placeholder="Write a brief introduction..."
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Bullet Points</label>
              <div className="space-y-2 mt-2">
                {(data[pointsKey] || []).map((point : any, idx : any) => (
                  <div key={idx} className="flex gap-2">
                    <Input 
                      value={point} 
                      onChange={(e) => handlePointChange(idx, e.target.value)}
                      placeholder={`Point ${idx + 1}`}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemovePoint(idx)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddPoint}
                  className="w-full border-dashed border-2 text-[#2B4C8A]"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add New Point
                </Button>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Conclusion / Outro</label>
              <Textarea 
                value={data[outroKey] || ""} 
                onChange={(e) => onUpdate(outroKey, e.target.value)}
                placeholder="Final thoughts..."
                className="mt-1"
              />
            </div>
          </div>
        ) : (
          <div className="prose prose-slate max-w-none">
            {data[introKey] && <p className="text-slate-700 leading-relaxed">{data[introKey]}</p>}
            {data[pointsKey]?.length > 0 && (
              <ul className="my-4 space-y-2">
                {data[pointsKey].map((point: any, i: any) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2B4C8A] shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
            {data[outroKey] && <p className="text-slate-600 italic text-sm border-l-4 border-slate-200 pl-4 mt-4">{data[outroKey]}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

const BreedProgrameSection = () => {
  const { data: userData } = useGetMeQuery(undefined);
  const user = userData?.data;
  const { data: program, isLoading } = useGetBreederProfileQuery(user?.id as any, { skip: !user?.id });
  const [upsertProfile, { isLoading: isUpdating }] = useUpsertBreederProfileMutation();

  const bannerRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  useEffect(() => {
    if (program) {
      setFormData({ ...program });
      setBannerPreview(program.bannerUrl);
    }
  }, [program]);

  const handleUpdateField = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev : any) => ({ ...prev, banner: file }));
      setBannerPreview(URL.createObjectURL(file));
    }
  };

const handleSubmit = async () => {
    try {
      const fd = new FormData();
      const pointFields = ["aboutPoints", "philosophyPoints", "goalsPoints", "litterPoints", "screeningPoints"];

      Object.entries(formData).forEach(([key, value] : any) => {
        if (value === null || key === "bannerUrl" || key === "user") return;

        if (pointFields.includes(key)) {
          const cleanPoints = ((value || []) as any).filter((p: any) => p.trim() !== "");
          
          cleanPoints.forEach((point : any) => {
            fd.append(key, point); 
          });
        } else if (key === "banner" || key === "profile") {
          fd.append(key, value);
        } else {
          fd.append(key, value);
        }
      });

      await upsertProfile(fd).unwrap();
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (e: any) {
      const errorMsg = e.data?.message;
      toast.error(Array.isArray(errorMsg) ? errorMsg[0] : "Failed to save profile");
    }
  };

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#2B4C8A]" /></div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      {/* HEADER ACTIONS */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <h1 className="text-xl font-bold text-slate-800">Kennels Settings</h1>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}><X className="w-4 h-4 mr-2" /> Cancel</Button>
              <Button size="sm" onClick={handleSubmit} disabled={isUpdating} className="bg-[#2B4C8A]">
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => setIsEditing(true)}><Edit2 className="w-4 h-4 mr-2" /> Edit Profile</Button>
          )}
        </div>
      </div>

      {/* BANNER & LOGO SECTION */}
      <div className="relative group">
        <div className="h-64 w-full rounded-2xl overflow-hidden bg-slate-200 relative border-4 border-white shadow-md">
          {bannerPreview ? (
            <img src={bannerPreview} alt="Banner" className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">No Banner Image</div>
          )}
          {isEditing && (
            <div 
              className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
              onClick={() => bannerRef.current?.click()}
            >
              <Camera className="text-white w-10 h-10 opacity-80" />
              <input type="file" ref={bannerRef} hidden onChange={handleFileChange} accept="image/*" />
            </div>
          )}
        </div>
      </div>

      {/* BASIC INFO CARD */}
      <Card className="border-none shadow-sm overflow-visible -mt-12 relative z-10 mx-6 bg-white/90 backdrop-blur">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kennels Name</label>
              {isEditing ? (
                <Input value={formData.programName || ""} onChange={(e) => handleUpdateField("programName", e.target.value)} />
              ) : (
                <h2 className="text-2xl font-bold text-slate-800">{formData.programName || "New Program"}</h2>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                {isEditing ? (
                  <Input value={formData.location || ""} onChange={(e) => handleUpdateField("location", e.target.value)} />
                ) : (
                  <span className="text-slate-600">{formData.location || "Location not set"}</span>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Website</label>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                {isEditing ? (
                  <Input value={formData.website || ""} onChange={(e) => handleUpdateField("website", e.target.value)} />
                ) : (
                  <a href={formData.website} target="_blank" className="text-blue-500 hover:underline">{formData.website || "No link"}</a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* STRUCTURED SECTIONS */}
      <div className="grid grid-cols-1 gap-2 pt-4">
        <StructuredSection title="About Our Kennels" data={formData} prefix="about" isEditing={isEditing} onUpdate={handleUpdateField} />
        <StructuredSection title="Breeding Philosophy" data={formData} prefix="philosophy" isEditing={isEditing} onUpdate={handleUpdateField} />
        <StructuredSection title="Our Goals" data={formData} prefix="goals" isEditing={isEditing} onUpdate={handleUpdateField} />
        <StructuredSection title="Litter Practices" data={formData} prefix="litter" isEditing={isEditing} onUpdate={handleUpdateField} />
        <StructuredSection title="Screening Process" data={formData} prefix="screening" isEditing={isEditing} onUpdate={handleUpdateField} />
      </div>
    </div>
  );
};

export default BreedProgrameSection;