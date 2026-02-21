import { cn } from "@/lib/utils"
import { ArrowRight, Lock, LucideIcon } from "lucide-react"
import Link from "next/link"

type Tool = {
    id: string
    title: string
    desc: string
    icon: LucideIcon,
    color: string
    path: string
    tags: string[]
}

type ToolProps = {
    tool: Tool
    isGuest: boolean
}

export const ToolsCard = ({ tool, isGuest }: ToolProps) => {
    return (
        <Link
            href={isGuest ? '/auth/login' : tool.path}
            key={tool.id}
            className="group relative bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
        >
            {isGuest && (
                <div className="absolute top-6 right-6 text-zinc-600 group-hover:text-blue-500 transition-colors">
                    <Lock size={16} />
                </div>
            )}

            <div className={`absolute inset-0 bg-${tool.color}-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />

            <div className={cn("relative z-10", isGuest && "opacity-80")}>
                <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <tool.icon className={`text-${tool.color}-500`} />
                </div>
                <h2 className="text-xl font-bold text-white mb-3 tracking-tight">{tool.title}</h2>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    {tool.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                    {tool.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-zinc-600 bg-zinc-950 border border-zinc-800 px-2 py-1 rounded-md uppercase tracking-tighter">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-zinc-800/50">
                <span className="text-xs font-black text-zinc-400 uppercase tracking-widest group-hover:text-white transition-colors">
                    {isGuest ? "Get Started" : "Initialize Tool"}
                </span>
                <ArrowRight size={18} className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
        </Link>
    )
}