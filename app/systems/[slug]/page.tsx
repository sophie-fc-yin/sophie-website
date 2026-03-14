import { Metadata } from 'next';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { notFound } from 'next/navigation';
import { systems } from '@/data/systems';
import TierBadge from '@/components/TierBadge';
import CommentAgentDiagram from '@/components/diagrams/CommentAgentDiagram';
import ContentPipelineDiagram from '@/components/diagrams/ContentPipelineDiagram';
import AudienceRadarDiagram from '@/components/diagrams/AudienceRadarDiagram';
import CreatorOpsBotDiagram from '@/components/diagrams/CreatorOpsBotDiagram';
import { SystemStatus } from '@/lib/types';

export function generateStaticParams() {
  return systems.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const system = systems.find((s) => s.slug === params.slug);
  if (!system) return {};
  return {
    title: `${system.name} — Sophie Yin`,
    description: system.oneLiner,
  };
}

function DiagramForSlug({ slug }: { slug: string }) {
  switch (slug) {
    case 'comment-intelligence-agent':
      return <CommentAgentDiagram />;
    case 'content-production-pipeline':
      return <ContentPipelineDiagram />;
    case 'audience-radar':
      return <AudienceRadarDiagram />;
    case 'creator-ops-bot':
      return <CreatorOpsBotDiagram />;
    default:
      return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4 text-sm text-white/40">
          Architecture diagram coming soon.
        </div>
      );
  }
}

function DarkStatusBadge({ status }: { status: SystemStatus }) {
  if (status === 'Live') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium">
        <span className="animate-pulse bg-green-400 rounded-full w-2 h-2" />
        <span className="text-green-400">Live</span>
      </span>
    );
  }

  if (status === 'In Progress') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium">
        <span className="bg-yellow-400 rounded-full w-2 h-2" />
        <span className="text-yellow-400">In Progress</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span className="bg-white/30 rounded-full w-2 h-2" />
      <span className="text-white/40">Planned</span>
    </span>
  );
}

export default function SystemDetail({ params }: { params: { slug: string } }) {
  const system = systems.find((s) => s.slug === params.slug);

  if (!system) {
    notFound();
  }

  return (
    <>
      {/* LIGHT ZONE: Client-facing */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-20">

        {/* Back link */}
        <Link
          href="/systems"
          className="text-sm text-[#a0a0a0] hover:text-[#00d4aa] transition-colors"
        >
          ← Back to Systems
        </Link>

        {/* Headline: cardHeadline as the emotional hook */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-8 tracking-tight leading-[1.15]">
          {system.cardHeadline}
        </h1>

        {/* The Problem */}
        <section className="mt-10">
          <p className="text-lg text-[#6b6b6b] leading-[1.75]">
            {system.problemStatement}
          </p>
        </section>

        {/* What You Get */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[#1a1a1a]">What you get</h2>
          <p className="text-[#6b6b6b] mt-4 leading-[1.75]">
            {system.whatItDoes}
          </p>

          {/* Demo output placeholder */}
          <div className="mt-6 border-2 border-dashed border-[#e8e8e6] rounded-xl p-8 text-center text-[#a0a0a0]">
            Demo output coming soon — this system is currently {system.status}.
          </div>
        </section>

        {/* Soft CTA */}
        <section className="mt-10 bg-white rounded-xl border border-[#e8e8e6] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] p-7">
          <p className="font-semibold text-[#1a1a1a]">Want something like this for your channel?</p>
          <Link
            href="/consulting"
            className="inline-block mt-4 bg-[#00d4aa] text-white px-7 py-3.5 rounded-lg font-medium text-sm hover:bg-[#00c49e] transition-all shadow-[0_1px_2px_rgba(0,212,170,0.3)] hover:shadow-[0_4px_12px_rgba(0,212,170,0.25)]"
          >
            Let&apos;s talk →
          </Link>
        </section>

      </div>

      {/* DARK ZONE: Technical */}
      <div className="bg-[#0a0a0a] text-[#f0f0f0]">
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* System name + badges */}
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-mono text-2xl font-bold">{system.name}</h2>
            <TierBadge tier={system.tier} />
            <DarkStatusBadge status={system.status} />
          </div>

          {/* Capabilities — dark-compatible inline spans */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {system.capabilities.map((cap) => (
              <span key={cap} className="bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded">
                {cap}
              </span>
            ))}
          </div>

          {/* Architecture */}
          <section className="mt-12">
            <h3 className="text-lg font-semibold text-white/90">Architecture</h3>
            <DiagramForSlug slug={system.slug} />
          </section>

          {/* Tech Stack table */}
          <section className="mt-12">
            <h3 className="text-lg font-semibold text-white/90">Tech Stack</h3>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="text-left text-sm text-white/40 pb-2 border-b border-white/10">Layer</th>
                  <th className="text-left text-sm text-white/40 pb-2 border-b border-white/10">Technology</th>
                </tr>
              </thead>
              <tbody>
                {system.techStack.map((entry) => (
                  <tr key={entry.layer}>
                    <td className="py-2 text-sm border-b border-white/5 text-white/60">{entry.layer}</td>
                    <td className="py-2 text-sm border-b border-white/5 text-white/80">{entry.technology}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Pipeline steps */}
          <section className="mt-12">
            <h3 className="text-lg font-semibold text-white/90">Pipeline</h3>
            <div className="mt-4 space-y-2">
              {system.pipeline.map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="text-white/30 font-mono text-xs w-6 text-right">{i + 1}</span>
                  <span className="text-white/70">{step}</span>
                </div>
              ))}
            </div>
          </section>

          {/* GitHub link */}
          {system.githubUrl && (
            <div className="mt-12">
              <a
                href={system.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                <Github size={16} /> View on GitHub
              </a>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
