import React from 'react';

export const AboutHero = () => (
  <section className="py-12 text-center border-b border-zinc-900">
    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase italic">
      Our Mission: <span className="text-blue-500">Simplify Code.</span>
    </h1>
    <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
      We started with a simple question: Why is debugging still so slow? 
      Our team is building the next generation of AI tools to help developers 
      spend less time fixing bugs and more time building features.
    </p>
  </section>
);