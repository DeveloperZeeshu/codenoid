'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Menu } from 'lucide-react';
import PublicSidebar from '../PublicSidebar/PublicSidebar';
import { UserNav } from '@/features/tools/components/UserNav';
import { useAuth } from '@/store/auth/useAuth';

const PublicHeader = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { loading, isAuth } = useAuth()

  const navItems = [
    { name: 'Home', slug: '/' },
    { name: 'Tools', slug: '/tools' },
    { name: 'About', slug: '/about' },
    { name: 'Contact', slug: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-[50] w-full border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Terminal size={18} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter text-white uppercase italic">
              CODE<span className="text-blue-500">NOID</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.slug}
                href={item.slug}
                className={`text-[11px] font-black uppercase tracking-[0.15em] transition-colors ${pathname === item.slug ? 'text-blue-500' : 'text-zinc-500 hover:text-white'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {loading && <ActionSkeleton />}
            {!loading && isAuth && <UserNav />}
            {!loading && !isAuth &&
              <>
                <Link href="/auth/login" className="hidden sm:block text-[11px] font-black uppercase text-zinc-500 hover:text-white">Sign In</Link>
                <Link href="/auth/register" className="px-4 py-2 bg-white text-black text-[11px] font-black rounded-lg uppercase italic hover:bg-gray-200">Join</Link>
              </>
            }

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-zinc-400 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <PublicSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navItems={navItems}
      />
    </>
  );
};

export default PublicHeader;


export const ActionSkeleton = () => {
  return (
    <div className='animate-pulse h-8 w-15 rounded-lg bg-zinc-600' />
  )
}