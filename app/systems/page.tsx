import { Metadata } from 'next';
import { systems } from '@/data/systems';
import SystemCard from '@/components/SystemCard';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Systems — Sophie Yin',
  description: 'Production AI infrastructure for the creator economy.',
};

export default function Systems() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1a]">Systems</h1>
      <p className="text-[#6b6b6b] mt-4 leading-[1.75]">
        Production AI infrastructure for the creator economy.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {systems.map((system, index) => (
          <FadeIn key={system.slug} delay={index * 100}>
            <SystemCard system={system} />
          </FadeIn>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-xl border border-[#e8e8e6] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] p-6">
        <p className="text-sm text-[#6b6b6b]">
          These systems run on a split infrastructure — frontend and API routes on Vercel,
          background workers and data pipelines on DigitalOcean.
        </p>
      </div>
    </main>
  );
}
