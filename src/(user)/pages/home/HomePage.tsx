import AllBlueVerifiedDogs from "./_components/AllBlueVerifiedDogs"
import AllDogs from "./_components/AllDogs"
import AllGoldVerifiedDogs from "./_components/AllGoldVerifiedDogs"
import Banner from "./_components/Banner"

const HomePage = () => {
  return (
    <div>
      <Banner />
      <AllDogs />
      <AllGoldVerifiedDogs />
      <AllBlueVerifiedDogs />
    </div>
  )
}

export default HomePage