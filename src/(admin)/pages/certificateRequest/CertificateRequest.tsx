import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import CommonTable, { type Column } from '@/(admin)/_components/CommonTable';
import dog1 from "@/assets/dogSearchPage/dog1.jpg"
import dog2 from "@/assets/dogSearchPage/dog2.png"
import owner from "@/assets/ownerDetails/profile.jpg"

interface CertRequest {
  id: string;
  dogName: string;
  dogImage: string;
  dogId: string;
  ownerName: string;
  ownerImage: string;
  ownerId: string;
  requestDate: string;
  issuedDate: string;
  status: "Pending" | "Approved";
}

const CertificateRequest: React.FC = () => {
  const requestData: CertRequest[] = [
    {
      id: "CERT-001",
      dogName: "Luna Belle",
      dogImage: dog1, 
      dogId: "#PCR-LR-009876",
      ownerName: "Michael Chen",
      ownerImage: owner,
      ownerId: "#OW-009876",
      requestDate: "11/26/2024",
      issuedDate: "-- -- -- -- --",
      status: "Pending",
    },
    {
      id: "CERT-002",
      dogName: "Max Thunder",
      dogImage: dog2,
      dogId: "#PCR-LR-009876",
      ownerName: "Sarah Johnson",
      ownerImage: owner,
      ownerId: "#OW-009876",
      requestDate: "11/27/2024",
      issuedDate: "11/26/2024",
      status: "Approved",
    },
  ];

  const columns: Column<CertRequest>[] = [
    { header: "REQUEST ID", key: "id" },
    { 
      header: "DOG NAME", 
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={row.dogImage} className="object-cover" />
            <AvatarFallback>DG</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-slate-800">{row.dogName}</p>
            <p className="text-xs text-slate-400">{row.dogId}</p>
          </div>
        </div>
      )
    },
    { 
      header: "OWNER", 
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={row.ownerImage} className=' object-cover'/>
            <AvatarFallback>OW</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-slate-800">{row.ownerName}</p>
            <p className="text-xs text-slate-400">{row.ownerId}</p>
          </div>
        </div>
      )
    },
    { header: "REQUEST DATE", key: "requestDate" },
    { header: "ISSUED DATE", key: "issuedDate" },
    { 
      header: "STATUS", 
      render: (row) => (
        <span className={`px-4 py-1 rounded-full text-xs font-medium ${
          row.status === 'Approved' 
          ? 'bg-green-100 text-[#00A63E]' 
          : 'bg-orange-100 text-[#E17100]'
        }`}>
          {row.status}
        </span>
      )
    },
    { 
      header: "ACTIONS", 
      render: () => (
        <div className="flex items-center gap-3">
            <FiEye className="text-[#155DFC] cursor-pointer size-4 hover:opacity-70 transition-opacity" />
            <FiEdit size={22} className="text-[#155DFC] cursor-pointer size-4" />
            <FiTrash2 className="text-[#E7000B] cursor-pointer size-4 hover:opacity-70 transition-opacity" />
        </div>
      )
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-sm text-slate-600 mb-2">Review and approve certificate requests</h2>
      <CommonTable columns={columns} data={requestData} />
    </div>
  );
};

export default CertificateRequest;