export const ToolCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[1, 2, 3].map((i) => (
        <div 
          key={i}
          className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between h-[360px] animate-pulse"
        >
          <div>
            {/* Icon Box Skeleton */}
            <div className="w-14 h-14 bg-zinc-800 rounded-2xl mb-6" />
            
            {/* Title Skeleton */}
            <div className="h-7 w-3/4 bg-zinc-800 rounded-lg mb-3" />
            
            {/* Description Skeleton */}
            <div className="space-y-2 mb-6">
              <div className="h-3 w-full bg-zinc-800/50 rounded" />
              <div className="h-3 w-2/3 bg-zinc-800/50 rounded" />
            </div>

            {/* Tags Skeleton */}
            <div className="flex gap-2 mb-8">
              <div className="h-6 w-12 bg-zinc-800 rounded-md" />
              <div className="h-6 w-16 bg-zinc-800 rounded-md" />
            </div>
          </div>

          {/* Footer Skeleton */}
          <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50">
            <div className="h-3 w-24 bg-zinc-800 rounded" />
            <div className="w-5 h-5 bg-zinc-800 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};