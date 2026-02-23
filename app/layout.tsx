
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Providers from './providers';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Codenoid | AI-Powered Developer Assistant",
    template: "%s | Codenoid",
  },
  description: "Codenoid is an AI-driven platform for real-time code generation, deep security analysis, and automated bug auditing with severity scoring.",
  icons: {
    icon: '/favicon.svg'
  },
  keywords: [
    "AI Code Generator",
    "AI Bug Auditor",
    "Software Security Analysis",
    "Gemini AI Developer Tool",
    "Code Debugging AI",
    "Real-time Code Analysis",
  ],
  authors: [{ name: "Jeesan Abbas" }],
  creator: "Jeesan Abbas",
  metadataBase: new URL("https://codenoid.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codenoid.vercel.app",
    siteName: "Codenoid",
    title: "Codenoid - AI Code Generation & Analysis",
    description: "Generate, debug, and audit your code with the power of Gemini AI.",
    images: [
      {
        url: "favicon.svg",
        width: 1200,
        height: 630,
        alt: "Codenoid AI Assistant Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codenoid | AI Developer Assistant",
    description: "Real-time AI code auditing and generation.",
    images: ["favicon.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-zinc-100 antialiased font-sans">

        <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#18181b',
              color: '#fff',
              border: '1px solid #27272a',
            }
          }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;