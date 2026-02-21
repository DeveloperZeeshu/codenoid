'use client';

import FormattedOutput from '@/features/tools/components/FormattedOutput';
import { promptSchema } from '@/features/tools/schemas/prompt.schema';
import { useCompletion } from '@ai-sdk/react';
import { ArrowLeft, BookOpen, Sparkles, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';

export default function ExplainPage() {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error
  } = useCompletion({
    api: '/api/ai',
    streamProtocol: 'text',
    body: { type: 'explain' },
    onFinish: () => toast.success("Analysis complete!"),
    onError: (err) => toast.error("Quota reached or server error."),
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parsedInput = promptSchema.safeParse({ prompt: input })
    if (!parsedInput.success) {
      const error = parsedInput.error.issues[0].message
      toast.error(error)
      return
    }
    handleSubmit(e)
  }

  return (
    <div className="max-w-7xl mx-auto lg:px-6 pb-10 flex flex-col">
      <Link href="/tools" className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 text-sm transition-colors w-fit">
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[600px] flex-1">

        <form onSubmit={(e) => submit(e)} className="p-4 pt-8 py-4 lg:p-8 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase tracking-widest">
              <BookOpen size={14} className="text-blue-400" /> 1. Paste Source Code
            </div>
            <span className={`text-[10px] font-mono ${input.length > 5000 ? 'text-red-500' : 'text-zinc-600'}`}>
              {input.length}
            </span>
          </div>

          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={handleInputChange}
              className="w-full h-full min-h-[300px] lg:min-h-full bg-transparent border-none font-mono text-sm focus:outline-none resize-none placeholder:text-zinc-700"
              placeholder="paste your function or logic here..."
              required
            />

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-xl transition-all active:scale-95"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {isLoading ? "Analyzing..." : "EXPLAIN CODE"}
            </button>
          </div>
        </form>

        <div className="bg-zinc-950/50 flex flex-col lg:h-auto relative">
          <div className="p-4 pt-5 lg:p-8 flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase tracking-widest shrink-0">
            <Sparkles size={14} className="text-yellow-400" /> 2. AI Breakdown
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            <div className="p-4 lg:p-8 pt-0 lg:pt-0 h-[500px] flex flex-col">
              {completion ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 flex-1">
                  <FormattedOutput content={completion} />
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                  <Sparkles size={32} />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Ready for input</p>
                    <p className="text-xs max-w-[180px]">Analysis will appear here in real-time.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="absolute top-12 left-0 right-0 h-8 bg-gradient-to-b from-zinc-950/80 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}