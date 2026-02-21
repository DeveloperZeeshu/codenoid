'use client';

import FormattedOutput from '@/features/tools/components/FormattedOutput';
import PDFDownloadButton from '@/features/tools/components/PDFDownloadButton';
import { promptSchema } from '@/features/tools/schemas/prompt.schema';
import { useCompletion } from '@ai-sdk/react';
import { ArrowLeft, BookOpen, ShieldAlert, Bug, FileDown, Zap, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';

export default function BugReportPage() {
  const { input, handleInputChange, handleSubmit, completion, isLoading } = useCompletion({
    api: '/api/ai',
    streamProtocol: 'text',
    body: { type: 'report' },
    onFinish: () => toast.success('Report created!'),
    onError: () => toast.error('Quota reached or server error.')
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
    <div className="max-w-7xl mx-auto lg:px-6 pb-10 flex flex-col min-h-screen">
      <Link href="/tools" className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 text-sm transition-colors w-fit shrink-0">
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <header className="flex justify-between items-end mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Bug Architect</h1>
          <p className="text-zinc-500 text-sm font-medium">Identify security flaws and logical errors.</p>
        </div>
        {!isLoading && completion && 
          <PDFDownloadButton content={completion}/>
        }
      </header>

      <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 lg:h-[600px]">

        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-900/20 h-[500px] lg:h-full overflow-hidden">
          <form onSubmit={(e) => submit(e)} className="p-4 pt-8 lg:p-8 flex flex-col flex-1 gap-6 overflow-hidden">
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase tracking-widest">
                <BookOpen size={14} className="text-blue-400" /> 1. Source Code
              </div>
              <span className={`text-[10px] font-mono ${input.length > 5000 ? 'text-red-500' : 'text-zinc-600'}`}>
                {input.length}
              </span>
            </div>

            <textarea
              value={input}
              onChange={handleInputChange}
              className="flex-1 bg-transparent border-none font-mono text-sm focus:outline-none resize-none placeholder:text-zinc-700 custom-scrollbar"
              placeholder="Paste buggy code here..."
            />

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className='w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-black text-sm disabled:bg-zinc-800 disabled:text-zinc-500 flex justify-center gap-2 items-center transition-all active:scale-95 shrink-0'>
              {isLoading ? <Loader2 size={16} className='animate-spin' /> : <Zap size={16} />}
              {isLoading ? 'ANALYZING...' : 'GENERATE REPORT'}
            </button>
          </form>

          <div className="p-4 lg:p-8 lg:pt-0 grid grid-cols-1 gap-3 shrink-0">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Live Audit</span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>
            <div className="flex flex-col gap-2">
              <AuditItem icon={<ShieldAlert size={16} className="text-red-500" />} title="Security" value={completion ? "Checked" : "Ready"} />
              <AuditItem icon={<Bug size={16} className="text-yellow-500" />} title="Logic" value={completion ? "Found" : "Ready"} />
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 flex flex-col h-[500px] lg:h-full overflow-hidden">
          <div className="p-4 lg:p-8 pb-4 flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase tracking-widest shrink-0">
            <Sparkles size={14} className="text-yellow-400" /> 2. Architect Analysis
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="px-4 lg:px-8 pb-10">
              {completion ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                  <FormattedOutput content={completion} />
                </div>
              ) : (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                  <Bug size={40} />
                  <p className="text-sm font-medium">Analysis will appear here...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const AuditItem = ({ icon, title, value }: { icon: any, title: string, value: string }) => (
  <div className="flex items-center justify-between p-3 bg-zinc-800/30 border border-zinc-800/50 rounded-xl">
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-xs font-bold text-zinc-400">{title}</span>
    </div>
    <span className="text-[10px] font-medium text-zinc-600 uppercase">{value}</span>
  </div>
);