'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site-config';

const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Terminal size={18} className="text-white" />
              </div>
              <span className="text-lg font-black tracking-tighter text-white uppercase italic">
                CODE<span className="text-blue-500">NOID</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Empowering developers with production-grade AI assistance. Build faster, debug smarter.
            </p>
          </div>

          <FooterGroup title="Product">
            <FooterLink href="/tools">All Tools</FooterLink>
            <FooterLink href="/about">How it Works</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
          </FooterGroup>

          <FooterGroup title="Resources">
            <FooterLink href={SITE_CONFIG.links.github} isExternal>Documentation</FooterLink>
            <FooterLink href={SITE_CONFIG.links.github} isExternal>API Reference</FooterLink>
            <FooterLink href="/contact">Support</FooterLink>
          </FooterGroup>

          <div className="space-y-4">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] italic">Connect</h4>
            <div className="flex gap-3">
              <SocialIcon href={SITE_CONFIG.links.github} icon={<Github size={18} />} />
              <SocialIcon href={SITE_CONFIG.links.twitter} icon={<Twitter size={18} />} />
              <SocialIcon href={SITE_CONFIG.links.linkedin} icon={<Linkedin size={18} />} />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <p className="text-zinc-600 text-[11px] font-medium">
              &copy; {currentYear} CODENOID. All rights reserved.
            </p>
            <span className="text-zinc-800">|</span>
            <Link href="/privacy" className="text-zinc-600 hover:text-zinc-400 text-[11px] transition-colors">Privacy</Link>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};


const FooterGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em] italic">{title}</h4>
    <ul className="space-y-2">{children}</ul>
  </div>
);

const FooterLink = ({ href, children, isExternal }: { href: string; children: React.ReactNode; isExternal?: boolean }) => (
  <li>
    <Link
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className="text-zinc-500 hover:text-blue-500 text-sm transition-colors flex items-center gap-1 group"
    >
      {children}
      {isExternal && <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
    </Link>
  </li>
);

const SocialIcon = ({ icon, href }: { icon: any, href: string }) => (
  <Link
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-500 transition-all">
    {icon}
  </Link>
);

export default PublicFooter;