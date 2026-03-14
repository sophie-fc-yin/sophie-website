import { Metadata } from 'next';
import { systems } from '@/data/systems';
import SystemCard from '@/components/SystemCard';

export const metadata: Metadata = {
  title: 'Systems — Sophie Yin',
  description: 'Production AI infrastructure for the creator economy.',
};

export default function Systems() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold">Systems</h1>
      <p className="text-white/60 mt-4">
        Production AI infrastructure for the creator economy.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {systems.map((system) => (
          <SystemCard key={system.slug} system={system} />
        ))}
      </div>

      <div className="mt-16 bg-white/5 border border-white/10 p-6 rounded-lg">
        <p className="text-sm text-white/50">
          These systems run on a split infrastructure — frontend and API routes on Vercel,
          background workers and data pipelines on DigitalOcean.
        </p>
      </div>
    </main>
  );
}
