import { useEffect, useRef, useState } from 'react';
import { Bell, LogOut, User as UserIcon, Settings } from 'lucide-react';
import { useLogout } from '@/hooks/auth/useLogout';
import { useAuth } from '@/store/auth/useAuth';

export const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, loading } = useLogout()
  const containerRef = useRef<HTMLDivElement>(null)

  const { name } = useAuth()

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className="flex items-center gap-4 relative">
      {/* Notifications */}
      <button className="text-zinc-500 hover:text-white transition-colors relative">
        <Bell size={20} />
        <span className="absolute top-0 right-0 w-2 h-2 bg-blue-600 rounded-full border-2 border-black" />
      </button>

      {/* User Profile Trigger */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 pl-2 border-l border-zinc-800 hover:opacity-80 transition-opacity"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white leading-none">{name ?? 'User'}</p>
            <p className="text-[10px] text-zinc-500 leading-none mt-1">Free Plan</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center border border-white/10 shadow-lg shadow-indigo-500/20">
            <span className="text-xs font-black text-white">{name[0].toUpperCase() ?? 'U'}</span>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

            <div className="absolute right-0 mt-2 w-48 bg-[#09090b] border border-zinc-800 rounded-xl shadow-2xl z-20 overflow-hidden">
              <div className="px-4 py-2 border-b border-zinc-800 sm:hidden">
                <p className="text-xs font-bold text-white">{name ?? 'User'}</p>
                <p className="text-[10px] text-zinc-500">Free Plan</p>
              </div>

              <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors">
                <UserIcon size={14} /> Profile
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors">
                <Settings size={14} /> Settings
              </button>

              <div className="h-px bg-zinc-800" />

              <button
                title='logout'
                disabled={loading}
                onClick={() => mutate()}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={14} /> {loading ? 'Logging out...' : 'Log out'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};