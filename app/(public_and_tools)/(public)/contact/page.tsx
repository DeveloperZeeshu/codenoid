'use client';

import { ContactForm } from '@/components/contact/ContactForm';
import { SITE_CONFIG } from '@/config/site-config';
import { Mail, Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [copied, setCopied] = useState<boolean>(false)

  const handleEmailClick = () => {
    const email = "itsabbaszeeshaan0604@gmail.com";

    window.location.href = `mailto:${email}`;

    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-7xl mx-auto lg:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
            Let&apos;s <span className="text-blue-500">Connect.</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Have questions about the AI models or want to suggest a feature?
            Reach out via the form or through our social channels.
          </p>

          <div className="space-y-4">
            <ContactLink
              icon={<Mail size={20} />}
              label="Email"
              value="Launch Mail App"
              onClick={handleEmailClick}
              isButton
            />
            <ContactLink
              icon={<Github size={20} />}
              label="GitHub"
              value="Codenoid"
              href={SITE_CONFIG.links.github}
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}

const ContactLink = ({
  icon,
  label,
  value,
  href,
  onClick,
  isButton
}: {
  icon: any,
  label: string,
  value: string,
  href?: string,
  onClick?: () => void,
  isButton?: boolean
}) => {
  const content = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="text-blue-500">{icon}</div>
        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{label}</p>
          <p className="text-white font-semibold">{value}</p>
        </div>
      </div>
      <ExternalLink size={18} className="text-zinc-700 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </div>
  );

  const className = "group w-full flex items-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500 hover:bg-zinc-900 transition-all text-left";

  if (isButton) {
    return (
      <button onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  );
};