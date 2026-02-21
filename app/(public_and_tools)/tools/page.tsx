'use client';

import { Sparkles } from 'lucide-react';
import { TOOLS_INFO } from '@/utils/tools-info';
import { ToolsCard } from '@/features/tools/components/ToolsCard';
import { useAuth } from '@/store/auth/useAuth';
import { ToolCardSkeleton } from '@/features/tools/components/ToolCardSkeleton';

const ToolsPage = () => {
  const { loading, isAuth } = useAuth()

  return (
    <main className="max-w-7xl mx-auto py-12 lg:px-6">
      <header className="mb-16 space-y-4">
        <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">
          <Sparkles size={14} />
          <span>Engineering Suite</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic">
          Specialized <span className="text-zinc-500">AI Models</span>
        </h1>
        <p className="text-zinc-500 max-w-xl leading-relaxed font-medium">
          Select a tool to begin. Each model is fine-tuned for specific development
          tasks to ensure the highest code quality and accuracy.
        </p>
      </header>

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
        </div>
      }
    </main>
  );
};

export default ToolsPage;