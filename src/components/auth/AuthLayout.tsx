import { useGoogleAuth } from '@/hooks/auth/useGoogleAuth';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Github, Loader2, Mail, Terminal, X } from 'lucide-react';
import { forwardRef, useState } from 'react';

export const AuthInput = forwardRef(({ label, error, type, ...props }: any, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';
  const toggleVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="space-y-1.5 w-full">
      <label className="text-[10px] font-black uppercase tracking-[0.12em] text-zinc-500 ml-1">
        {label}
      </label>

      <div className="relative group">
        <input
          {...props}
          ref={ref}
          type={isPasswordField && showPassword ? 'text' : type}
          className={cn(
            "w-full bg-[#09090b] rounded-xl px-4 py-3 text-[13px] text-white placeholder:text-zinc-700 focus:outline-none transition-all border",
            isPasswordField && "pr-11",
            error
              ? "border-red-600/50 focus:border-red-600 focus:ring-1 focus:ring-red-600/20"
              : "border-zinc-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20"
          )}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff size={16} strokeWidth={2.5} />
            ) : (
              <Eye size={16} strokeWidth={2.5} />
            )}
          </button>
        )}
      </div>

      {error && (
        <span className="flex text-red-500 items-center gap-1 text-xs mt-1">
          <X size={14} strokeWidth={3} />
          {error.message}
        </span>
      )}
    </div>
  );
});

AuthInput.displayName = "AuthInput";


export const SocialAuth = () => {
  const { loading, handleAuth } = useGoogleAuth()
  return (
    <div className="space-y-3 w-full mt-6">
      <div className="relative flex items-center justify-center py-2">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-800" /></div>
        <span className="relative bg-[#0c0c0e] px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Or</span>
      </div>
      <button
        disabled={loading}
        onClick={handleAuth}
        className="flex items-center justify-center gap-2 h-11 bg-[#09090b] border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors text-xs font-bold text-white w-full">
        {loading ? <Loader2 className='animate-spin' size={16} /> : <Mail size={16} />}
        {loading ? 'Loading...' : 'Google'}
      </button>
    </div>
  )
};

export const VisualSidebar = ({ quote }: { quote: string }) => (
  <div className="hidden lg:flex bg-[#09090b] p-16 flex-col justify-between relative overflow-hidden border-l border-zinc-800  h-full">
    <div className="absolute top-0 right-0 w-full h-full bg-blue-600/[0.03] blur-[120px]" />
    <div className="relative z-10">
      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-10 shadow-lg shadow-blue-600/20">
        <Terminal className="text-white" size={20} />
      </div>
      <h3 className="text-xl font-bold text-white leading-relaxed max-w-[280px] italic">
        {quote}
      </h3>
    </div>
    <div className="relative z-10">
      <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">AICODE Intelligence v2.0</p>
    </div>
  </div>
);