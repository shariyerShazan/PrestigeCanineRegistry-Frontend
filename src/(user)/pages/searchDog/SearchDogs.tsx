import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ListFilter, RotateCcw } from "lucide-react";
import DogDetailsCard from "../home/_components/common/DogDetailsCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"; 
import { searchDogData } from "./_data/SearchDogs";
import subtract from "@/assets/search/Subtract.svg"

const ITEMS_PER_PAGE = 6; 

const DogSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDogs = useMemo(() => {
    return searchDogData.filter((dog) =>
      dog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dog.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dog.pcrId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Pagination logic
  const pageCount = Math.ceil(filteredDogs.length / ITEMS_PER_PAGE);
  const paginatedDogs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredDogs.slice(startIndex, endIndex);
  }, [currentPage, filteredDogs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // reset page on new search
  };

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
<section className="py-22 px-4 text-center relative">
  {/* BACKGROUND */}
  <div
    className="absolute inset-0 bg-cover bg-center pointer-events-none"
    style={{ backgroundImage: `url(${subtract})` }}
  />

  {/* INTERACTIVE CONTENT */}
  <div className="relative z-10">
    {/* HERO */}
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      Real dogs, real verification, real trust
    </h1>

    <p className="text-gray-600 mb-8">
      See registered dogs with verified DNA and microchip data
    </p>

    <div className="max-w-4xl mx-auto flex gap-2 bg-[#2B4C8A] p-4 rounded-xl shadow-lg">
      <Input
        placeholder="Search by name, PCR ID, or breed..."
        className="bg-white h-12 text-lg focus:ring-1 focus:ring-[#D4AF37]"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Button className="bg-[#D4AF37] hover:bg-[#C5A028] h-12 px-8">
        Search
      </Button>
    </div>

    {/* FILTER BAR (INSIDE HERO, SAFE) */}
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Showing {filteredDogs.length} results
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-gray-600 font-medium mr-2">
            <ListFilter size={20} />
            <span>Filters</span>
          </div>

          {["Breed", "Color", "Tire", "Region"].map((filter) => (
            <Select key={filter}>
              <SelectTrigger className="w-[110px] bg-[#E2E2E2] border-none rounded-md cursor-pointer">
                <SelectValue placeholder={filter} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filter}s</SelectItem>
              </SelectContent>
            </Select>
          ))}

          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 cursor-pointer"
            onClick={() => {
              setSearchQuery("");
              setCurrentPage(1);
            }}
          >
            <RotateCcw size={18} />
            Reset filters
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>



      <div className="max-w-7xl mx-auto px-6 py-8">
     
        {/* --- RESULTS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {paginatedDogs.map((dog) => (
            <DogDetailsCard
              key={dog.id + dog.pcrId} // unique key
              id={dog.id}
              name={dog.name}
              breed={dog.breed}
              pcrId={dog.pcrId}
              imageUrl={dog.imageUrl}
              ownerName={dog.ownerName}
              ownerAvatar={dog.ownerAvatar}
              verifyType={dog.verifyType}
            />
          ))}
        </div>

        {/* --- PAGINATION --- */}
            <div className="mt-10 flex justify-start">
                <div>
                        <Pagination aria-label="Dog list pagination">
                            <PaginationPrevious
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            />
                            <PaginationContent>
                            {Array.from({ length: pageCount }, (_, i) => (
                                <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={currentPage === i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                                </PaginationItem>
                            ))}
                            </PaginationContent>
                            <PaginationNext
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
                            />
                     </Pagination>
                </div>
            </div>

      </div>
    </div>
  );
};

export default DogSearchPage;
