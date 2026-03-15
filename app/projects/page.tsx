import { Metadata } from 'next';
import { projects } from '@/data/systems';
import SystemCard from '@/components/SystemCard';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Projects — Sophie Yin',
  description: 'Production engineering across AI systems, machine learning, and infrastructure.',
};

const categories = [
  {
    key: 'AI Systems' as const,
    label: 'AI SYSTEMS',
    heading: 'End-to-end autonomous systems for the creator economy',
    description: 'Intelligent pipelines that automate content workflows, analyze audience signals, and scale creator operations.',
    featured: true,
  },
  {
    key: 'Machine Learning' as const,
    label: 'MACHINE LEARNING',
    heading: 'Model training, embeddings, clustering, and NLP',
    description: 'Applied ML research turned into production-ready tooling for real-world media and content problems.',
    featured: false,
  },
  {
    key: 'Infrastructure' as const,
    label: 'INFRASTRUCTURE',
    heading: 'Data pipelines, backend systems, and cloud deployment',
    description: 'The plumbing that keeps everything running — async workers, cloud orchestration, and reliable data flows.',
    featured: false,
  },
] as const;

export default function Projects() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 md:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1a]">Projects</h1>
      <p className="text-[#6b6b6b] mt-4 leading-[1.75]">
        Production engineering across AI systems, machine learning, and infrastructure.
      </p>

      {categories.map((cat, i) => {
        const catProjects = projects.filter((p) => p.category === cat.key);
        return (
          <FadeIn key={cat.key}>
            <section className={i > 0 ? 'mt-16' : 'mt-14'}>
              <div className={cat.featured ? 'pl-4 border-l-2 border-[#00d4aa]' : ''}>
                <p className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium">
                  {cat.featured && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00d4aa] mr-2 mb-0.5" />
                  )}
                  {cat.label}
                </p>
                <h2 className="text-xl font-semibold text-[#1a1a1a] mt-1">{cat.heading}</h2>
                <p className="text-sm text-[#6b6b6b] mt-1">{cat.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {catProjects.map((project) => (
                  <SystemCard key={project.slug} system={project} />
                ))}
              </div>
            </section>
          </FadeIn>
        );
      })}

      <div className="mt-16 bg-white rounded-xl border border-[#e8e8e6] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] p-6">
        <p className="text-sm text-[#6b6b6b]">
          These projects run on a split infrastructure — frontend and API routes on Vercel,
          background workers and data pipelines on DigitalOcean.
        </p>
      </div>
    </main>
  );
}
