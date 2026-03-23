/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Loader2, Dog, Fingerprint, Award, Layers } from "lucide-react";
import { useGetBreedsWithPaginationQuery } from "@/redux/features/breed/breed.api";
import CommonPagination from "@/components/common/pagination/CommonPagination";
import { Badge } from "@/components/ui/badge";

const ITEMS_PER_PAGE = 10;

const BreedArchive = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // 1. Logic: API calling with all parameters
  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetBreedsWithPaginationQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: searchQuery || undefined,
    sortBy,
    sortOrder,
  });

  const breeds = response?.data || [];
  const meta = response?.meta;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#2B4C8A] tracking-tight">
              Breed Archive
            </h1>
            <p className="text-slate-500 mt-2 text-lg italic">
              Explore our comprehensive database of verified dog breeds and
              standards.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                placeholder="Search by breed name or code..."
                className="pl-10 h-11 bg-white border-slate-200 focus:ring-[#2B4C8A]"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
              <SelectTrigger className="w-[160px] !h-11 bg-white">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Breed Name</SelectItem>
                <SelectItem value="breedCode">Breed Code</SelectItem>
                <SelectItem value="type">Breed Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Data Table Area */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {isLoading ? (
            <div className="py-32 flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-[#2B4C8A] mb-4" size={48} />
              <p className="text-slate-500 font-medium">
                Loading breed database...
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="w-[120px] font-bold text-[#2B4C8A]">
                        Code
                      </TableHead>
                      <TableHead className="font-bold text-[#2B4C8A]">
                        Breed Name
                      </TableHead>
                      <TableHead className="font-bold text-[#2B4C8A]">
                        Acronym
                      </TableHead>
                      <TableHead className="font-bold text-[#2B4C8A]">
                        Type
                      </TableHead>
                      <TableHead className="font-bold text-[#2B4C8A]">
                        Eligibility
                      </TableHead>
                      <TableHead className="font-bold text-[#2B4C8A]">
                        Gens
                      </TableHead>
                      <TableHead className="text-right font-bold text-[#2B4C8A]">
                        Registered
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {breeds.length > 0 ? (
                      breeds.map((breed: any) => (
                        <TableRow
                          key={breed.id}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          <TableCell className="font-mono text-sm font-semibold text-slate-600">
                            #{breed.breedCode}
                          </TableCell>
                          <TableCell className="font-bold text-slate-800 text-base">
                            {breed.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-slate-100 text-slate-600 border-none px-3"
                            >
                              {breed.acronym}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                breed.type === "INTERNAL"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-purple-100 text-purple-700"
                              }`}
                            >
                              {breed.type}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-slate-600">
                            <div className="flex items-center gap-1.5">
                              <Award size={14} className="text-[#D4AF37]" />
                              {breed.tierEligibility}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-slate-500 italic">
                            {breed.eligibleGen || "N/A"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex flex-col items-end">
                              <span className="font-bold text-[#2B4C8A] flex items-center gap-1">
                                {breed._count?.canines} <Dog size={14} />
                              </span>
                              <span className="text-[10px] text-slate-400 uppercase tracking-tighter">
                                Canines
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="h-40 text-center text-slate-400"
                        >
                          No breeds found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {meta && meta.totalPages > 1 && (
                <div className="p-6 border-t border-slate-100 flex justify-center">
                  <CommonPagination
                    currentPage={currentPage}
                    totalPages={meta.totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Info Cards - Stats at Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-[#2B4C8A] p-6 rounded-2xl text-white flex items-center gap-5 shadow-lg shadow-blue-900/10">
            <div className="p-4 bg-white/10 rounded-xl">
              <Layers size={32} />
            </div>
            <div>
              <h3 className="text-3xl font-bold">{meta?.total || 0}</h3>
              <p className="opacity-80 text-sm">Total Recognized Breeds</p>
            </div>
          </div>
          <div className="bg-[#D4AF37] p-6 rounded-2xl text-black flex items-center gap-5 shadow-lg shadow-yellow-600/10">
            <div className="p-4 bg-black/5 rounded-xl">
              <Fingerprint size={32} />
            </div>
            <div>
              <h3 className="text-3xl font-bold">Verified</h3>
              <p className="opacity-80 text-sm font-medium">
                DNA & Standard Backed
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl text-[#2B4C8A] border border-slate-200 flex items-center gap-5 shadow-sm">
            <div className="p-4 bg-slate-100 rounded-xl">
              <Dog size={32} />
            </div>
            <div>
              <h3 className="text-3xl font-bold">100%</h3>
              <p className="text-slate-500 text-sm font-medium">
                Registry Accuracy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedArchive;
