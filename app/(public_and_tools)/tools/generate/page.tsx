'use client';

import FormattedOutput from '@/features/tools/components/FormattedOutput';
import { promptSchema } from '@/features/tools/schemas/prompt.schema';
import { useCompletion } from '@ai-sdk/react';
import { ArrowLeft, BookOpen, Loader2, Zap } from 'lucide-react';
import Link from 'next/link';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';

export default function GeneratorPage() {
  const {
    completion,
    handleInputChange,
    handleSubmit,
    input,
    isLoading,
    error,
    setInput
  } = useCompletion({
    api: '/api/ai',
    streamProtocol: 'text',
    body: { type: 'generate' },
    onFinish: () => {
      toast.success('Generation complete!')
      setInput('')
    },
    onError: (err) => toast.error('Quota reached or server error.')
  })

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
    <div className="max-w-7xl mx-auto lg:px-6 pb-10">
      <Link href="/tools" className="flex items-center gap-2 text-zinc-500 hover:text-white mb-6 lg:mb-8 text-sm transition-colors w-fit">
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl lg:rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-125 lg:min-h-150">

        {/* Input Pane */}
        <form
          onSubmit={(e) => submit(e)}
          className="p-4 lg:p-8 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between gap-8">
          <div className="space-y-6">

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase tracking-widest">
                <BookOpen size={14} className="text-blue-400" /> 1. Describe Logic
              </div>
              <span className={`text-[10px] font-mono ${input.length > 5000 ? 'text-red-500' : 'text-zinc-600'}`}>
                {input.length}
              </span>
            </div>

            <textarea
              onChange={handleInputChange}
              value={input}
              className="w-full bg-transparent border-none text-base font-medium focus:outline-none placeholder:text-zinc-800 resize-none h-32 lg:h-40"
              placeholder="e.g. A React hook for local storage..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-full py-3 bg-blue-600 font-black rounded-xl flex items-center justify-center gap-2 hover:bg-blue-500 transition-all disabled:bg-zinc-800 disabled:text-zinc-500 mt-auto">
            {isLoading ? <Loader2 size={20} className='animate-spin' /> : <Zap size={20} />}
            {isLoading ? 'BUILDING...' : 'BUILD SNIPPET'}
          </button>
        </form>

        {/* Code Pane */}
        <div className="bg-zinc-950 flex flex-col h-full border-t lg:border-t-0 border-zinc-800">

          <div className="p-4 lg:px-8 lg:pt-8 pb-0 flex items-center gap-2 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-4 lg:p-8 h-125">
              {completion ? (
                <FormattedOutput content={completion} />
              ) : (
                <pre className="text-blue-400 font-mono text-sm leading-relaxed">
                  <code>// AI output will be rendered here...</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}