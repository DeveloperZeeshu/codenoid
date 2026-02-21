import { SITE_CONFIG } from '@/config/site-config';
import { useAuth } from '@/store/auth/useAuth';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  const { isAuth } = useAuth()
  return (
    <section className="text-center space-y-8 mb-20">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 uppercase tracking-widest">
        <Terminal size={14} />
        <span>Built for Modern Engineers</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
        The Intelligent Layer <br />
        <span className="text-blue-500 font-black italic">for your Workflow.</span>
      </h1>

      <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
        An AI-powered assistant designed to generate clean code, explain complex logic,
        and automate your bug reporting process in seconds.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href={isAuth ? '/tools' : '/auth/login'}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center gap-2 group shadow-lg shadow-blue-600/20">
          Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <a
          href={SITE_CONFIG.links.github}
          target='_blank'
          rel='noopener noreferrer'
          className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all">
          View Docs
        </a>
      </div>
    </section>
  );
};