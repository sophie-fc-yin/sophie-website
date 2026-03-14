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
      <section className="py-20 md:py-28 bg-grid">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1a1a1a] leading-[1.1]">
            AI Systems for Creators and Digital Media
          </h1>
          <p className="text-lg md:text-xl text-[#6b6b6b] mt-8 max-w-2xl leading-[1.75]">
            Designing intelligent systems that automate content workflows,
            analyze audience signals, and scale digital media operations.
          </p>
          <Link
            href="/systems"
            className="inline-block mt-8 bg-[#00d4aa] text-white px-7 py-3.5 rounded-lg font-medium text-sm hover:bg-[#00c49e] transition-all shadow-[0_1px_2px_rgba(0,212,170,0.3)] hover:shadow-[0_4px_12px_rgba(0,212,170,0.25)]"
          >
            See the systems →
          </Link>
          <div className="flex gap-8 mt-12 pt-8 border-t border-[#ebebeb]">
            <div>
              <span className="font-mono text-3xl font-bold text-[#1a1a1a]">4</span>
              <br/>
              <span className="text-[#a0a0a0] text-xs uppercase tracking-[0.15em]">AI systems</span>
            </div>
            <div>
              <span className="font-mono text-3xl font-bold text-[#1a1a1a]">3</span>
              <br/>
              <span className="text-[#a0a0a0] text-xs uppercase tracking-[0.15em]">client tiers</span>
            </div>
            <div>
              <span className="font-mono text-3xl font-bold text-[#1a1a1a]">E2E</span>
              <br/>
              <span className="text-[#a0a0a0] text-xs uppercase tracking-[0.15em]">production-grade</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Systems */}
      <FadeIn>
        <section className="py-14 md:py-20 bg-[#f4f4f2]">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium">Featured Systems</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1a1a1a] mt-2">Production AI Infrastructure</h2>
            <p className="text-[#6b6b6b] mt-2 leading-[1.75]">
              From simple automation to full pipeline orchestration.
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
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-white rounded-xl border border-[#e8e8e6] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] p-10 md:p-14">
              <p className="text-xl md:text-2xl font-semibold text-[#1a1a1a]">
                Most creator operations are built on manual effort that doesn&apos;t
                scale.
              </p>
              <p className="text-[#6b6b6b] mt-4 leading-[1.75]">
                If that sounds familiar, here&apos;s how I can help.
              </p>
              <Link
                href="/consulting"
                className="inline-block mt-6 bg-[#00d4aa] text-white px-7 py-3.5 rounded-lg font-medium text-sm hover:bg-[#00c49e] transition-all shadow-[0_1px_2px_rgba(0,212,170,0.3)] hover:shadow-[0_4px_12px_rgba(0,212,170,0.25)]"
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
