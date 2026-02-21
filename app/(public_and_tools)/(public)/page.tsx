'use client';

import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { ToolCardSkeleton } from '@/features/tools/components/ToolCardSkeleton';
import { ToolsCard } from '@/features/tools/components/ToolsCard';
import { useAuth } from '@/store/auth/useAuth';
import { TOOLS_INFO } from '@/utils/tools-info';

const Home = () => {
  const { loading, isAuth } = useAuth()

  return (
    <div className="max-w-7xl mx-auto py-12 lg:px-6">
      <Hero />
      <Stats />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-12 border-l-4 border-blue-600 pl-6">
        <div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Available Tools</h2>
          <p className="text-zinc-500 text-sm">Specialized AI models for your development needs.</p>
        </div>
      </div>

      {loading ?
        <ToolCardSkeleton /> :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOOLS_INFO.map((tool) => (
            <ToolsCard
              key={tool.id}
              tool={tool}
              isGuest={!isAuth}
            />
          ))}
        </div>}
    </div>
  );
};

export default Home;