'use client'

import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { AuthInput, SocialAuth, VisualSidebar } from '@/components/auth/AuthLayout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterFormData, registerSchema } from '@/features/auth/schemas/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleAxiosError } from '@/axios/handleAxiosError';
import { registerUser } from '@/features/auth/apis/auth.api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useGoogleAuth } from '@/hooks/auth/useGoogleAuth';

export default function RegisterPage() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const [loading, setLoading] = useState<boolean>(false)

  const {loading: googleAuthLoading} = useGoogleAuth()

  const router = useRouter()

  const submit: SubmitHandler<RegisterFormData> = async (data) => {
    setLoading(true)
    try {
      const { confirmPassword, ...finalData } = data
      await registerUser(finalData)
      toast.success('Registration successful')
      router.push('/auth/login')
    } catch (err) {
      handleAxiosError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 bg-[#0c0c0e] border border-zinc-800 rounded-[32px] overflow-hidden shadow-2xl">

        <div className="hidden lg:block order-first border-r border-zinc-800">
          <VisualSidebar quote="&quot;Build faster, audit smarter, and ship with total confidence.&quot;" />
        </div>

        <div className="p-5 md:p-16 flex flex-col justify-center items-center">
          <div className="w-full max-w-[320px]">
            <header className="mb-8">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Create Account</h2>
              <p className="text-zinc-500 text-xs mt-1 font-medium">Join 2,000+ developers today.</p>
            </header>

            <form
              className="space-y-4"
              onSubmit={handleSubmit(submit)}>
              <AuthInput
                label="Full Name"
                type="text"
                placeholder="John Doe"
                {...register('name')}
                error={errors.name}
              />
              <AuthInput
                label="Email"
                type="email"
                placeholder="dev@example.com"
                {...register('email')}
                error={errors.email}
              />
              <AuthInput
                label="Password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                error={errors.password}
              />
              <AuthInput
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                error={errors.confirmPassword}
              />
              <button
                disabled={loading || googleAuthLoading}
                className={cn(
                  "w-full h-11 text-black text-[11px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2",
                  loading ? 'bg-zinc-400' : 'bg-white hover:bg-zinc-200'
                )}>
                {loading ? 'Verifying...' : 'Join Now'}
                {loading ? <Loader2 size={18} className='animate-spin' /> : <ArrowRight size={14} />}
              </button>
            </form>

            <SocialAuth />

            <p className="mt-8 text-center text-xs text-zinc-500 font-medium">
              Already a member? <Link href="/auth/login" className="text-blue-500 font-bold ml-1">Sign In</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}