
import { OwnerProfileSection } from './_components/OwnerProfileSection'
import {  OwnerAccountSettings } from './_components/AccountSettings'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

const OwnerProfile = () => {
  const navigate = useNavigate()
  return (
    <div className=' max-w-7xl my-6 mx-auto'>
           <button onClick={()=> navigate(-1)} className="flex mb-6 items-center gap-1 text-gray-700 font-semibold hover:opacity-70 cursor-pointer">
               <ChevronLeft size={20} /> Back
            </button>
       <div className='space-y-5 '>
                <OwnerProfileSection />
                <OwnerAccountSettings />
       </div>
    </div>
  )
}

export default OwnerProfile