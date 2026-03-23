/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ListFilter,
  RotateCcw,
  Loader2,
  Search as SearchIcon,
} from "lucide-react";
import DogDetailsCard from "../home/_components/common/DogDetailsCard";
import subtract from "@/assets/search/Subtract.svg";
import { useGetAllCaninesQuery } from "@/redux/features/canine/canine.api";
import { useGetAllBreedsQuery } from "@/redux/features/breed/breed.api";
import CommonPagination from "@/components/common/pagination/CommonPagination";

const ITEMS_PER_PAGE = 10;

const DogSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [filters, setFilters] = useState({
    tier: searchParams.get("tier") || "all",
    gender: "all",
    breedId: searchParams.get("breedId") || "all",
    color: "",
  });

  // logic: Sync state when URL changes (e.g., searching from Banner)
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setFilters((prev) => ({
      ...prev,
      tier: searchParams.get("tier") || "all",
      breedId: searchParams.get("breedId") || "all",
    }));
    setCurrentPage(1);
  }, [searchParams]);

  const { data: breedsRes } = useGetAllBreedsQuery(undefined);
  const breeds = breedsRes || [];

  const queryParams = {
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: searchQuery || undefined,
    tier: filters.tier !== "all" ? filters.tier : undefined,
    gender: filters.gender !== "all" ? filters.gender : undefined,
    breedId: filters.breedId !== "all" ? filters.breedId : undefined,
    color: filters.color || undefined,
    status: "APPROVED",
  };

  const { data, isLoading, isFetching } = useGetAllCaninesQuery(queryParams);

  const updateURL = (newFilters: any, newSearch: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newFilters.tier !== "all") params.set("tier", newFilters.tier);
    if (newFilters.breedId !== "all") params.set("breedId", newFilters.breedId);
    setSearchParams(params);
  };

  const handleFilterChange = (key: string, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    setCurrentPage(1);
    updateURL(updatedFilters, searchQuery);
  };

  const handleReset = () => {
    setSearchQuery("");
    setFilters({ tier: "all", gender: "all", breedId: "all", color: "" });
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-22 px-4 text-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${subtract})` }}
        />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Real dogs, real verification, real trust
          </h1>
          <p className="text-gray-600 mb-8">
            See registered dogs with verified DNA and microchip data
          </p>

          <div className="max-w-4xl mx-auto flex gap-2 bg-[#2B4C8A] p-4 rounded-xl shadow-lg">
            <div className="relative flex-1">
              <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Search by name, PCR ID, or microchip ID..."
                className="bg-white h-12 pl-10 text-lg focus:ring-1 focus:ring-[#D4AF37]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={() => updateURL(filters, searchQuery)}
              className="bg-[#D4AF37] hover:bg-[#C5A028] h-12 px-8 font-bold text-[#2B4C8A] cursor-pointer"
            >
              SEARCH
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {isFetching
              ? "Updating..."
              : `Showing ${data?.meta?.total || 0} results`}
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600 font-medium mr-2">
              <ListFilter size={20} /> <span>Filters</span>
            </div>

            <Select
              value={filters.breedId}
              onValueChange={(val) => handleFilterChange("breedId", val)}
            >
              <SelectTrigger className="w-[160px] bg-[#E2E2E2] border-none rounded-md cursor-pointer">
                <SelectValue placeholder="Breed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Breeds</SelectItem>
                {breeds.map((b: any) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.tier}
              onValueChange={(val) => handleFilterChange("tier", val)}
            >
              <SelectTrigger className="w-[120px] bg-[#E2E2E2] border-none rounded-md cursor-pointer">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="GOLD">Gold</SelectItem>
                <SelectItem value="BLUE">Blue</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 cursor-pointer"
              onClick={handleReset}
            >
              <RotateCcw size={18} /> Reset filters
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#2B4C8A] mb-2" size={40} />
            <p className="text-gray-500 font-medium">
              Loading verified data...
            </p>
          </div>
        ) : (
          <>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 transition-opacity ${isFetching ? "opacity-50" : "opacity-100"}`}
            >
              {data?.data?.map((dog: any) => (
                <DogDetailsCard
                  key={dog.id}
                  {...dog}
                  breed={dog.breedRelation?.name}
                  imageUrl={dog.images?.[0]?.url}
                  verifyType={dog.tier}
                />
              ))}
            </div>
            {data?.data?.length === 0 && (
              <p className="text-center py-20 text-xl text-gray-400">
                No results found.
              </p>
            )}
          </>
        )}

        {data?.meta?.totalPages > 1 && (
          <div className="mt-16">
            <CommonPagination
              currentPage={currentPage}
              totalPages={data.meta.totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DogSearchPage;
