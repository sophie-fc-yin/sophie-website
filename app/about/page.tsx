import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Sophie Yin',
  description: 'AI systems engineer building production infrastructure for the creator economy.',
};

const roles = [
  { title: 'Data Scientist', description: 'Statistical modeling, experiment design, insight extraction from complex datasets' },
  { title: 'Data Engineer', description: 'Production pipelines, ETL architecture, data infrastructure at scale' },
  { title: 'ML Engineer', description: 'Model training, deployment, embeddings, clustering, and NLP systems' },
  { title: 'AI Systems Engineer', description: 'End-to-end autonomous systems — from ingestion to insight to action' },
];

const stackCategories = [
  { name: 'Languages', items: ['Python', 'TypeScript', 'SQL'] },
  { name: 'Data & ML', items: ['pandas', 'scikit-learn', 'HDBSCAN', 'semantic embeddings', 'vector search', 'topic modeling'] },
  { name: 'Databases', items: ['PostgreSQL', 'pgvector', 'Redis', 'Supabase'] },
  { name: 'Infrastructure', items: ['Docker', 'DigitalOcean', 'Vercel', 'AWS'] },
  { name: 'Orchestration', items: ['Celery', 'Prefect', 'OpenClaw', 'asyncio'] },
  { name: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS'] },
];

export default function About() {
  return (
    <>
      {/* Hero section — wide, impactful */}
      <section className="border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <p className="text-sm font-mono text-[#00d4aa] tracking-wide uppercase">About</p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#111] mt-4 leading-tight max-w-3xl">
            I build the infrastructure that turns raw data into systems that run without you.
          </h1>
          <p className="text-lg md:text-xl text-black/50 mt-6 max-w-2xl leading-relaxed">
            Data scientist turned systems engineer. I got into AI infrastructure because I kept
            seeing the same problem — creators and media businesses sitting on incredible data
            with no way to make it useful. So I started building it.
          </p>
        </div>
      </section>

      {/* Background + Roles — two column on desktop */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16">

          {/* Left: narrative */}
          <div>
            <h2 className="text-sm font-mono text-[#00d4aa] tracking-wide uppercase">Background</h2>
            <div className="mt-6 space-y-4 text-black/60 leading-relaxed">
              <p>
                {/* TODO: Replace with real background */}
                Before building AI systems for creators, I spent [X] years working across data science,
                data engineering, and machine learning engineering — building production pipelines,
                training and deploying models, and designing the infrastructure that makes data
                actually useful at scale.
              </p>
              <p>
                I&apos;ve worked in [industry placeholder] and [industry placeholder], where the
                problems were always the same: teams sitting on valuable data with no reliable way
                to extract insight from it. The difference between a notebook experiment and a system
                that runs unsupervised every day is where I spend most of my time.
              </p>
            </div>
          </div>

          {/* Right: role cards */}
          <div>
            <h2 className="text-sm font-mono text-[#00d4aa] tracking-wide uppercase">Roles</h2>
            <div className="mt-6 space-y-3">
              {roles.map((role) => (
                <div key={role.title} className="border border-black/8 rounded-lg p-4 hover:border-[#00d4aa]/30 transition-colors">
                  <p className="font-semibold text-[#111] text-sm">{role.title}</p>
                  <p className="text-black/45 text-xs mt-1 leading-relaxed">{role.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Currently — accent bar */}
      <section className="bg-black/[0.03]">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="text-sm font-mono text-[#00d4aa] tracking-wide uppercase">Currently</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="border-l-2 border-[#00d4aa] pl-5">
              <p className="text-xs text-black/35 uppercase tracking-wider">Focus</p>
              <p className="text-[#111] mt-1">AI systems for the creator economy</p>
            </div>
            <div className="border-l-2 border-[#00d4aa] pl-5">
              <p className="text-xs text-black/35 uppercase tracking-wider">Building</p>
              <p className="text-[#111] mt-1">Production pipelines, audience intelligence tools, and agent systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stack — grid layout */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="flex items-end justify-between">
          <h2 className="text-sm font-mono text-[#00d4aa] tracking-wide uppercase">Stack</h2>
          <Link href="/uses" className="text-xs text-black/40 hover:text-[#00d4aa] transition-colors flex items-center gap-1">
            Full details <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {stackCategories.map((cat) => (
            <div key={cat.name}>
              <h3 className="text-xs font-semibold text-black/40 uppercase tracking-wider">{cat.name}</h3>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {cat.items.map((item) => (
                  <span key={item} className="bg-black/[0.04] border border-black/[0.06] text-black/60 text-xs px-2.5 py-1 rounded-md">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom section — who I work with + contact side by side */}
      <section className="border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 md:gap-16">

            <div>
              <h2 className="text-sm font-mono text-[#00d4aa] tracking-wide uppercase">Who I work with</h2>
              <p className="text-black/60 mt-6 leading-relaxed">
                Creators and media businesses who are serious about building systems — not just trying
                tools. If you&apos;re looking for someone to set up ChatGPT, I&apos;m probably not the
                right fit. If you want production infrastructure that runs while you sleep, let&apos;s
                talk.
              </p>
              <Link
                href="/consulting"
                className="inline-flex items-center gap-2 mt-6 text-sm text-[#00d4aa] hover:underline"
              >
                See how I work <ArrowRight size={14} />
              </Link>
            </div>

            <div>
              <h2 className="text-sm font-mono text-[#00d4aa] tracking-wide uppercase">Get in touch</h2>
              <div className="mt-6 space-y-3">
                <a
                  href="mailto:sophie@example.com"
                  className="flex items-center gap-3 text-black/50 hover:text-[#111] transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[#00d4aa]/40 transition-colors">
                    <Mail size={14} />
                  </span>
                  <span className="text-sm">sophie@example.com</span>
                </a>
                <a
                  href="https://github.com/sophiefcyin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-black/50 hover:text-[#111] transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[#00d4aa]/40 transition-colors">
                    <Github size={14} />
                  </span>
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/sophiefcyin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-black/50 hover:text-[#111] transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[#00d4aa]/40 transition-colors">
                    <Linkedin size={14} />
                  </span>
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
