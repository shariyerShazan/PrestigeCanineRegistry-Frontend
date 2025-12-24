import { SidebarTrigger } from '@/components/ui/sidebar'
import { MdOutlineNotificationsNone } from 'react-icons/md'
export function AdminTopNav({
  name = 'John Doe',
  role = 'Owner',
  avatar = '/src/assets/gogDetails/owner.jpg',
}) {
  return (
    <header className="h-14 w-full flex items-center justify-between px-4 bg-white border-b">
      {/* LEFT: Sidebar Trigger */}
      <SidebarTrigger className='cursor-pointer'/>

      {/* RIGHT: Profile */}
      <div className='flex justify-center items-center gap-3 cursor-pointer'>
        <div className='p-1 rounded-md bg-[#2B4C8A30] text-[#2B4C8A] '>
            <MdOutlineNotificationsNone size={25}/>
          </div>
        <div className="flex items-center gap-3 mr-10">
        <img
                src={avatar}
                alt={name}
                className="w-9 h-9 rounded-full object-cover"
                />
        <div className="hidden sm:flex flex-col text-">
            
          <span className="font-medium text-sm">{name}</span>
          <span className="text-xs text-muted-foreground">{role}</span>
        </div>
      </div>
      </div>
    </header>
  )
}
