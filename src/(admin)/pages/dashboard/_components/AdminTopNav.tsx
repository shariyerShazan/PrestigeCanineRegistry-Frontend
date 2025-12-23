import { SidebarTrigger } from '@/components/ui/sidebar'
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
      <div className="flex items-center gap-3">
        <img
                src={avatar}
                alt={name}
                className="w-9 h-9 rounded-full object-cover"
                />
        <div className="hidden sm:flex flex-col text-right">
            
          <span className="font-medium text-sm">{name}</span>
          <span className="text-xs text-muted-foreground">{role}</span>
        </div>
        
      </div>
    </header>
  )
}
