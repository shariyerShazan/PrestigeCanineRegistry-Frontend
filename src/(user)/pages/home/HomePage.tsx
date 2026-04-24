import AllBlueVerifiedDogs from "./_components/AllBlueVerifiedDogs"
// import AllDogs from "./_components/AllDogs"
import AllGoldVerifiedDogs from "./_components/AllGoldVerifiedDogs"
import Banner from "./_components/Banner"
import PrestigeAmbassadors from "./_components/PrestigeAmbassadors"
import TestimonialSection from "./_components/TestimonialSection"

const HomePage = () => {
  return (
    <div>
      <Banner />
      {/* <AllDogs /> */}
      <PrestigeAmbassadors />
      <AllGoldVerifiedDogs />
      <AllBlueVerifiedDogs />
      <TestimonialSection />
    </div>
  )
}

export default HomePage