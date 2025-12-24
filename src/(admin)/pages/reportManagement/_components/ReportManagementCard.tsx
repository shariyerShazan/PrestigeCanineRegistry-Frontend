import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiEye, FiTrash2, FiMail } from "react-icons/fi";
import { HiOutlineFlag } from "react-icons/hi";
import { LuCheckCheck, LuClock3 } from "react-icons/lu";

interface ReportProps {
  id: string;
  status: "Unread" | "Read" | "Resolved";
  priority: string;
  category: string;
  title: string;
  description: string;
  reporterName: string;
  reporterEmail: string;
  dogName: string;
  dogId: string;
  ownerName: string;
  ownerId: string;
  date: string;
}

const ReportManagementCard: React.FC<ReportProps> = ({
  id, status, priority, category, title, description,
  reporterName, reporterEmail, dogName, dogId, ownerName, ownerId, date
}) => {
  const statusStyles = {
    Unread: "bg-red-50 text-[#9F0712]",
    Read: "bg-blue-50 text-[#193CB8]",
    Resolved: "bg-green-50 text-[#016630]",
  };

  return (
    <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
      <CardContent className="p-6 space-y-4">
        {/* Header Badges */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2  font-bold">
              <HiOutlineFlag className="size-5 text-[#F54900]" />
              <span>{id}</span>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-bold rounded">
                {priority}
              </span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusStyles[status]}`}>
            {status}
          </span>
        </div>

        {/* Category & Title */}
        <div className="space-y-2">
          <div className='flex '>
            <p className="px-3 py-1 mb-2  bg-slate-100 text-slate-500 text-[11px] font-medium rounded-full">
              {category}
            </p>
          </div>
          <h3 className="text-lg font-bold text-slate-800 leading-tight">{title}</h3>
          <p className="text-md text-slate-600 line-clamp-2">{description}</p>
        </div>

        {/* Reporter Section */}
        <div className="p-4 bg-[#F9FAFB rounded-2xl border border-gray-200">
          <p className="text-xs text-slate-600 font-medium mb-1 uppercase tracking-wider">Reporter</p>
          <p className="font-bold text-slate-800 text-md">{reporterName}</p>
          <p className="text-sm text-slate-600">{reporterEmail}</p>
        </div>

        {/* Dog & Owner Section */}
        <div className="p-4 bg-[#F9FAFB] rounded-2xl border border-gray-200">
          <p className="text-xs text-slate-600 font-medium mb-2 uppercase tracking-wider">Reported Dog & Owner</p>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-slate-600">Dog</p>
              <p className="font-bold text-slate-800 text-md">{dogName}</p>
              <p className="text-xs text-slate-600 uppercase">PRC ID: {dogId}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600">Owner</p>
              <p className="font-bold text-slate-800 text-md">{ownerName}</p>
              <p className="text-xs text-slate-600 uppercase">{ownerId}</p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col gap-3 justify-between pt-2">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <LuClock3 />
            <span>{date}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="h-9 px-6 flex-1 cursor-pointer bg-blue-50 text-[#155DFC] hover:bg-blue-100 rounded-xl font-bold gap-2">
              <FiEye className="size-4" /> View
            </Button>
            {status === "Unread" && (
              <>
                <Button variant="ghost" className="size-9 p-0 bg-blue-50 text-[#155DFC] rounded-xl cursor-pointer"><FiMail /></Button>
                <Button variant="ghost" className="size-9 p-0 bg-green-50 text-[#00A63E] rounded-xl cursor-pointer"><LuCheckCheck /></Button>
              </>
            )}
            <Button variant="ghost" className="size-9 p-0 bg-red-50 text-red-500 rounded-xl cursor-pointer">
              <FiTrash2 />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportManagementCard;