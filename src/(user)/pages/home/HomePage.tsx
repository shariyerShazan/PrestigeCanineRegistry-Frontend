import AllBlueVerifiedDogs from "./_components/AllBlueVerifiedDogs"
import AllDogs from "./_components/AllDogs"
import AllGoldVerifiedDogs from "./_components/AllGoldVerifiedDogs"
import Banner from "./_components/Banner"
import TestimonialSection from "./_components/TestimonialSection"

const HomePage = () => {
  return (
    <div>
      <Banner />
      <AllDogs />
      <AllGoldVerifiedDogs />
      <AllBlueVerifiedDogs />
      <TestimonialSection />
    </div>
  )
}

export default HomePage