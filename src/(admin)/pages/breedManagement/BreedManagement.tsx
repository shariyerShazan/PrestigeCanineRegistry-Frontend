import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch, FiTrash2, FiEdit, FiPlus, FiEye } from "react-icons/fi";
import CommonTable, { type Column } from "@/(admin)/_components/CommonTable";
import BreedDialog from "./_components/BreedDialog";
// import BreedDetailsDialog from "./_components/BreedDetailsDialog";
import { useGetBreedsWithPaginationQuery, useDeleteBreedMutation } from "@/redux/features/breed/breed.api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CommonPagination from "@/components/common/pagination/CommonPagination";
import BreedDetailsDialog from "./_components/BreedDetailsDialog";

const BreedManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState<any>(null);
  const [viewBreedId, setViewBreedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { data: response, isLoading } = useGetBreedsWithPaginationQuery({
    page,
    limit: 10,
    search: search || undefined,
  });

  const [deleteBreed] = useDeleteBreedMutation();

  const handleEdit = (breed: any) => {
    setSelectedBreed(breed);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedBreed(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (breedId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E7000B",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBreed(breedId).unwrap();
        Swal.fire("Deleted!", "Breed has been removed.", "success");
      } catch (err: any) {
        toast.error(err.data?.message || "Delete failed");
      }
    }
  };

  const columns: Column<any>[] = [
    { header: "Breed Name", key: "name" },
    { header: "Code", render: (row) => <span className="font-semibold text-slate-700">{row.breedCode}</span> },
    { header: "Acronym", key: "acronym" },
    { 
      header: "Type", 
      render: (row) => (
        <span className={`px-3 py-1 text-xs rounded-full font-medium ${row.type === 'DESIGNER' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-[#2B4C8A]'}`}>
            {row.type}
        </span>
      )
    },
    { header: "Tier Eligibility", render: (row) => row.tierEligibility || "N/A" },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-3">
          <FiEye
            onClick={() => {
              setViewBreedId(row.id);
              setIsViewOpen(true);
            }}
            className="text-[#155DFC] cursor-pointer size-4 hover:scale-110 transition-transform"
          />
          <FiEdit
            onClick={() => handleEdit(row)}
            className="text-amber-500 cursor-pointer size-4 hover:scale-110 transition-transform"
          />
          <FiTrash2
            onClick={() => handleDelete(row.id)}
            className="text-[#E7000B] cursor-pointer size-4 hover:scale-110 transition-transform"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-10 w-64 h-10 border-[#2B4C8A]/20"
              placeholder="Search breed..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleAddNew}
            className="bg-[#E17100] cursor-pointer hover:bg-[#c96500] text-white gap-2 h-10 px-4 rounded-lg"
          >
            <FiPlus className="size-5" /> Add New Breed
          </Button>
        </div>
      </div>

      <CommonTable
        columns={columns}
        data={response?.data || []}
        loading={isLoading}
      />
      
      <CommonPagination
        currentPage={page}
        totalPages={response?.meta?.totalPages || 1}
        onPageChange={(p) => setPage(p)}
      />

      <BreedDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        editData={selectedBreed}
      />

      <BreedDetailsDialog
        open={isViewOpen}
        setOpen={setIsViewOpen}
        breedId={viewBreedId}
      />
    </div>
  );
};

export default BreedManagement;
