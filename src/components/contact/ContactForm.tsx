'use client';

import { useState } from 'react';
import { User, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(res => setTimeout(res, 1500));
    setLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-[800px] h-[480px] mx-auto bg-[#09090b] flex flex-col items-center justify-center rounded-[24px] border border-blue-500/20 bg-gradient-to-b from-blue-500/5 to-transparent shadow-2xl">
        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
          <CheckCircle2 size={32} className="text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message Received</h3>
        <p className="text-zinc-500 text-sm text-center max-w-[280px] leading-relaxed">
          Thanks for reaching out! We have received your inquiry and will get back to you shortly.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="mt-8 text-[10px] font-black text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px] mx-auto bg-[#09090b] px-5 p-8 rounded-[24px] border border-[#27272a] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 px-1">
              <User size={14} className="text-zinc-500" />
              <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.1em]">Full Name</label>
            </div>
            <input 
              required
              type="text" 
              className="w-full bg-[#121214] border border-[#27272a] rounded-[14px] p-4 py-3 text-[14px] text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner" 
              placeholder="John Doe" 
            />
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center gap-2 px-1">
              <Mail size={14} className="text-zinc-500" />
              <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.1em]">Email Address</label>
            </div>
            <input 
              required
              type="email" 
              className="w-full bg-[#121214] border border-[#27272a] rounded-[14px] p-4 py-3 text-[14px] text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner" 
              placeholder="john@example.com" 
            />
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2 px-1">
            <MessageSquare size={14} className="text-zinc-500" />
            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.1em]">Your Message</label>
          </div>
          <textarea 
            required
            rows={5} 
            className="w-full bg-[#121214] border border-[#27272a] rounded-[18px] p-4 text-[14px] text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none shadow-inner" 
            placeholder="Describe your project or inquiry..." 
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full h-[50px] bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-[13px] rounded-[16px] transition-all flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(37,99,235,0.2)] active:scale-[0.98] uppercase tracking-wider"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Sending...
            </span>
          ) : (
            <>
              Send Message
              <Send size={16} />
            </>
          )}
        </button>
        
        <p className="text-center text-zinc-600 text-[10px] uppercase tracking-widest font-medium">
          Typical response time: &lt; 24 hours
        </p>
      </form>
    </div>
  );
};