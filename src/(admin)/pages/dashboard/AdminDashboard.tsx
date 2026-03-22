import OverViewAdmin from "@/(admin)/pages/dashboard/_components/OverViewAdmin"
import AdminStats from "./_components/AdminStats"


const AdminDashboard = () => {
  return (
    <div>
      <AdminStats />
         <OverViewAdmin />
    </div>
  )
}

export default AdminDashboard