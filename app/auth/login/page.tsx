'use client'

import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { AuthInput, SocialAuth, VisualSidebar } from '@/components/auth/AuthLayout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormData, loginSchema } from '@/features/auth/schemas/login.schema';
import { zodResolver } from '@hookform/resolvers/zod'
import { handleAxiosError } from '@/axios/handleAxiosError';
import { loginUser } from '@/features/auth/apis/auth.api';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useGoogleAuth } from '@/hooks/auth/useGoogleAuth';

export default function LoginPage() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const { loading: googleAuthLoading } = useGoogleAuth()

  const [loading, setLoading] = useState<boolean>(false)

  const submit: SubmitHandler<LoginFormData> = async (data) => {
    setLoading(true)
    try {
      await loginUser(data)
      toast.success('Logged in successfully')
      window.location.href = '/'
    } catch (err) {
      handleAxiosError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 bg-[#0c0c0e] border border-zinc-800 rounded-[32px] overflow-hidden shadow-2xl">

        <div className="p-5 md:p-16 flex flex-col justify-center items-center">
          <div className="w-full max-w-[320px]">
            <header className="mb-8">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Welcome Back</h2>
              <p className="text-zinc-500 text-xs mt-1 font-medium">Identify security flaws in seconds.</p>
            </header>

            <form
              className="space-y-4"
              onSubmit={handleSubmit(submit)}>
              <AuthInput
                label="Email"
                error={errors.email}
                type="email"
                placeholder="dev@example.com"
                {...register('email')}
              />
              <AuthInput
                label="Password"
                error={errors.password}
                type="password"
                placeholder="••••••••"
                {...register('password')}
              />

              <button
                disabled={loading || googleAuthLoading}
                className={cn(
                  "w-full h-11  text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20",
                  loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-500'
                )}>
                {loading ? 'Verifying...' : 'Sign In'}
                {loading ? <Loader2 size={18} className='animate-spin' /> : <ArrowRight size={14} />}
              </button>
            </form>

            <SocialAuth />

            <p className="mt-8 text-center text-xs text-zinc-500 font-medium">
              New here? <Link href="/auth/register" className="text-blue-500 font-bold ml-1">Create Account</Link>
            </p>
          </div>
        </div>

        <VisualSidebar quote="&quot;The most efficient way to debug complex React logic.&quot;" />
      </main>
    </div>
  );
}