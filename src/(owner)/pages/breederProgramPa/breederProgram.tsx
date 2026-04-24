import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreedProgrameSection from "./_components/BreedProgrameSection";
import BreedBlogLitterSection from "./_components/BreedBlogLitterSection";

const BreederProgramPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      <Tabs defaultValue="details" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="details">Program Details</TabsTrigger>
            <TabsTrigger value="litters">View Litters</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="details">
          <BreedProgrameSection />
        </TabsContent>

        <TabsContent value="litters">
          <BreedBlogLitterSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BreederProgramPage;