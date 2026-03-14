import { Metadata } from 'next';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { notFound } from 'next/navigation';
import { systems } from '@/data/systems';
import StatusBadge from '@/components/StatusBadge';
import TierBadge from '@/components/TierBadge';
import CapabilityTag from '@/components/CapabilityTag';
import CommentAgentDiagram from '@/components/diagrams/CommentAgentDiagram';
import ContentPipelineDiagram from '@/components/diagrams/ContentPipelineDiagram';
import AudienceRadarDiagram from '@/components/diagrams/AudienceRadarDiagram';
import CreatorOpsBotDiagram from '@/components/diagrams/CreatorOpsBotDiagram';

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

export default function SystemDetail({ params }: { params: { slug: string } }) {
  const system = systems.find((s) => s.slug === params.slug);

  if (!system) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-mono text-3xl md:text-4xl font-bold">{system.name}</h1>

      <div className="flex gap-2 mt-4">
        <TierBadge tier={system.tier} />
        <StatusBadge status={system.status} />
      </div>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {system.capabilities.map((cap) => (
          <CapabilityTag key={cap} label={cap} />
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">The Problem</h2>
        <p className="text-white/70 mt-4 leading-relaxed">{system.problemStatement}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">What It Does</h2>
        <p className="text-white/70 mt-4 leading-relaxed">{system.whatItDoes}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Architecture</h2>
        <DiagramForSlug slug={system.slug} />
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Tech Stack</h2>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="text-left text-sm text-white/40 pb-2 border-b border-white/10">
                Layer
              </th>
              <th className="text-left text-sm text-white/40 pb-2 border-b border-white/10">
                Technology
              </th>
            </tr>
          </thead>
          <tbody>
            {system.techStack.map((entry) => (
              <tr key={entry.layer}>
                <td className="py-2 text-sm border-b border-white/5 text-white/60">
                  {entry.layer}
                </td>
                <td className="py-2 text-sm border-b border-white/5 text-white/80">
                  {entry.technology}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Sample Output</h2>
        <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center text-white/30 mt-4">
          Demo output coming soon. This system is currently {system.status}.
        </div>
      </section>

      {system.githubUrl && (
        <div className="mt-8">
          <a
            href={system.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <Github size={16} />
            View on GitHub
          </a>
        </div>
      )}

      <div className="mt-12">
        <Link
          href="/systems"
          className="text-sm text-white/40 hover:text-white/60 transition-colors"
        >
          ← Back to Systems
        </Link>
      </div>
    </main>
  );
}
