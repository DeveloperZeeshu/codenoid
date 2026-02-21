import { AboutHero } from '@/components/about/AboutHero';
import { Values } from '@/components/about/Values';

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto lg:px-6">
      <AboutHero />
      <Values />
    </main>
  );
}