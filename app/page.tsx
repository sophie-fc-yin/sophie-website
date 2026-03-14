import Link from 'next/link';
import { systems } from '@/data/systems';
import SystemCard from '@/components/SystemCard';
import FadeIn from '@/components/FadeIn';

export const metadata = {
  title: 'Sophie Yin — AI Systems for Creators and Digital Media',
  description:
    'Designing intelligent systems that automate content workflows, analyze audience signals, and scale digital media operations.',
};

const featuredSlugs = [
  'creator-ops-bot',
  'comment-intelligence-agent',
  'content-production-pipeline',
];

export default function Home() {
  const featuredSystems = systems.filter((s) =>
    featuredSlugs.includes(s.slug)
  );

  return (
    <>
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-grid">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111]">
            AI Systems for Creators and Digital Media
          </h1>
          <p className="text-lg md:text-xl text-black/60 mt-6 max-w-2xl">
            Designing intelligent systems that automate content workflows,
            analyze audience signals, and scale digital media operations.
          </p>
          <Link
            href="/systems"
            className="inline-block mt-8 border border-[#00d4aa] text-[#00d4aa] hover:bg-[#00d4aa]/10 px-6 py-3 rounded transition-colors text-sm"
          >
            See the systems →
          </Link>
          <div className="flex gap-8 mt-12 text-sm">
            <div><span className="font-mono text-2xl font-bold text-[#111]">4</span><br/><span className="text-black/40">AI systems</span></div>
            <div><span className="font-mono text-2xl font-bold text-[#111]">3</span><br/><span className="text-black/40">client tiers</span></div>
            <div><span className="font-mono text-2xl font-bold text-[#111]">E2E</span><br/><span className="text-black/40">production-grade</span></div>
          </div>
        </div>
      </section>

      {/* Featured Systems */}
      <FadeIn>
        <section className="py-16 bg-black/[0.02]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold">Featured Systems</h2>
            <p className="text-black/60 mt-2">
              Production AI infrastructure — from simple automation to full
              pipeline orchestration.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {featuredSystems.map((system) => (
                <SystemCard key={system.slug} system={system} />
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Consulting CTA Block */}
      <FadeIn delay={200}>
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-black/5 border border-black/10 rounded-lg p-8 md:p-12">
              <p className="text-xl md:text-2xl font-semibold">
                Most creator operations are built on manual effort that doesn&apos;t
                scale.
              </p>
              <p className="text-black/60 mt-4">
                If that sounds familiar, here&apos;s how I can help.
              </p>
              <Link
                href="/consulting"
                className="inline-block mt-6 text-[#00d4aa] hover:underline text-sm"
              >
                See consulting →
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
