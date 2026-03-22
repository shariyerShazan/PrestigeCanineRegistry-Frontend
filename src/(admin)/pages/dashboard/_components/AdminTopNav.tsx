
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useGetNotificationsQuery } from '@/redux/features/notification/notificationsApi';
import { MdOutlineNotificationsNone } from 'react-icons/md'
import { useNavigate } from 'react-router';


export function AdminTopNav({
  name = 'John Doe',
  role = 'Owner',
  avatar = '/src/assets/gogDetails/owner.jpg',
}) {
  const navigate = useNavigate();

  // 1. Fetch notifications with high limit to get all unread counts
  const { data: response } = useGetNotificationsQuery({
    isRead: false, // Sudhu unread gulo count korar jonno
    limit: 500,
    page: 1,
  });
// console.log(response);
  // 2. Total unread count ber kora
  const unreadCount = response?.meta?.total || 0;

  return (
    <header className="h-14 w-full flex items-center justify-between px-4 bg-white border-b">
      {/* LEFT: Sidebar Trigger */}
      <SidebarTrigger className="cursor-pointer" />

      {/* RIGHT: Profile & Notifications */}
      <div className="flex justify-center items-center gap-6 mr-4">
        {/* Notification Icon with Badge */}
        <div
          onClick={() => navigate("/admin/dashboard/Activity-Logs")} // Apnar activity log path onujayi change korun
          className="relative p-2 rounded-md bg-[#2B4C8A15] text-[#2B4C8A] cursor-pointer hover:bg-[#2B4C8A25] transition-all"
        >
          <MdOutlineNotificationsNone size={24} />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src={avatar}
            alt={name}
            className="w-9 h-9 rounded-full object-cover border border-slate-200"
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-sm text-slate-800 leading-tight">
              {name}
            </span>
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
              {role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}