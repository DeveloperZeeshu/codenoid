'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Terminal, LogOut } from 'lucide-react';
import { useLogout } from '@/hooks/auth/useLogout';
import { useAuth } from '@/store/auth/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { name: string; slug: string }[];
}

const PublicSidebar = ({ isOpen, onClose, navItems }: SidebarProps) => {
  const pathname = usePathname();
  const { loading: logoutLoading, mutate } = useLogout()
  const { isAuth, loading } = useAuth()

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#0a0a0a] border-r border-zinc-800 z-[70] transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Header of Sidebar */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <Terminal size={20} className="text-blue-500" />
              <span className="font-black text-white italic tracking-tighter">CODENOID</span>
            </div>
            <button onClick={onClose} className="text-zinc-500 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-2 flex-grow text-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={item.slug}
                  onClick={onClose}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all ${isActive
                    ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20'
                    : 'text-zinc-500 hover:bg-zinc-900 hover:text-white border border-transparent'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className=" mt-auto space-y-4">
            {!loading && isAuth && <button
              className='flex items-center gap-2 text-xs uppercase px-2 text-zinc-500 hover:text-white cursor-pointer tracking-widest font-semibold'
              title='logout'
              disabled={logoutLoading}
              onClick={() => mutate()}>
              <LogOut size={15} />
              {logoutLoading ? 'Logging out...' : 'Log out'}
            </button>}

            <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.2em] px-2 border-t border-zinc-700 pt-4">
              v2.0 Stable Build
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default PublicSidebar;