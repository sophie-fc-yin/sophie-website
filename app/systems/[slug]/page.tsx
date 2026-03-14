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
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4 text-sm text-white/40">
          Architecture diagram coming soon.
        </div>
      );
  }
}

function DarkStatusBadge({ status }: { status: SystemStatus }) {
  if (status === 'Live') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs">
        <span className="animate-pulse bg-green-400 rounded-full w-2 h-2" />
        <span className="text-green-400">Live</span>
      </span>
    );
  }

  if (status === 'In Progress') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs">
        <span className="bg-yellow-400 rounded-full w-2 h-2" />
        <span className="text-yellow-400">In Progress</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs">
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
          className="text-sm text-black/40 hover:text-black/60 transition-colors"
        >
          ← Back to Systems
        </Link>

        {/* Headline: cardHeadline as the emotional hook */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#111] mt-8 leading-tight">
          {system.cardHeadline}
        </h1>

        {/* The Problem */}
        <section className="mt-10">
          <p className="text-lg text-black/70 leading-relaxed">
            {system.problemStatement}
          </p>
        </section>

        {/* What You Get */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-[#111]">What you get</h2>
          <p className="text-black/60 mt-4 leading-relaxed">
            {system.whatItDoes}
          </p>

          {/* Demo output placeholder */}
          <div className="mt-6 border-2 border-dashed border-black/10 rounded-lg p-8 text-center text-black/30">
            Demo output coming soon — this system is currently {system.status}.
          </div>
        </section>

        {/* Soft CTA */}
        <section className="mt-10 bg-black/5 border border-black/10 rounded-lg p-6">
          <p className="font-semibold text-[#111]">Want something like this for your channel?</p>
          <Link href="/consulting" className="inline-block mt-3 text-[#00d4aa] hover:underline text-sm">
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
