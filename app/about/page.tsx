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
      {/* Hero section */}
      <section className="border-b border-[#ebebeb]">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium">About</p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mt-4 tracking-tight leading-[1.15] max-w-3xl">
            I build the infrastructure that turns raw data into systems that run without you.
          </h1>
          <p className="text-lg text-[#6b6b6b] mt-6 max-w-2xl leading-[1.75]">
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
            <h2 className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium">Background</h2>
            <div className="mt-6 space-y-4 text-[#6b6b6b] leading-[1.75]">
              <p>
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
            <h2 className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium">Roles</h2>
            <div className="mt-6 space-y-3">
              {roles.map((role) => (
                <div key={role.title} className="bg-white rounded-xl border border-[#e8e8e6] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] p-5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-all duration-300">
                  <p className="font-semibold text-[#1a1a1a] text-sm">{role.title}</p>
                  <p className="text-[#a0a0a0] text-xs mt-1 leading-relaxed">{role.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Currently — accent bar */}
      <section className="bg-[#f4f4f2]">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium">Currently</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="border-l-2 border-[#00d4aa] pl-5">
              <p className="text-xs text-[#a0a0a0] uppercase tracking-[0.15em] font-medium">Focus</p>
              <p className="text-[#1a1a1a] mt-1">AI systems for the creator economy</p>
            </div>
            <div className="border-l-2 border-[#00d4aa] pl-5">
              <p className="text-xs text-[#a0a0a0] uppercase tracking-[0.15em] font-medium">Building</p>
              <p className="text-[#1a1a1a] mt-1">Production pipelines, audience intelligence tools, and agent systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stack — grid layout */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="flex items-end justify-between">
          <h2 className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium">Stack</h2>
          <Link href="/uses" className="text-xs text-[#a0a0a0] hover:text-[#00d4aa] transition-colors flex items-center gap-1">
            Full details <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {stackCategories.map((cat) => (
            <div key={cat.name}>
              <h3 className="text-xs font-medium text-[#a0a0a0] uppercase tracking-[0.15em]">{cat.name}</h3>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {cat.items.map((item) => (
                  <span key={item} className="bg-white border border-[#e8e8e6] text-[#6b6b6b] text-xs px-2.5 py-1 rounded-md shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom section — who I work with + contact side by side */}
      <section className="border-t border-[#ebebeb]">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 md:gap-16">

            <div>
              <h2 className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium">Who I work with</h2>
              <p className="text-[#6b6b6b] mt-6 leading-[1.75]">
                Creators and media businesses who are serious about building systems — not just trying
                tools. If you&apos;re looking for someone to set up ChatGPT, I&apos;m probably not the
                right fit. If you want production infrastructure that runs while you sleep, let&apos;s
                talk.
              </p>
              <Link
                href="/consulting"
                className="inline-flex items-center gap-2 mt-6 text-sm text-[#00d4aa] font-medium hover:opacity-80 transition-opacity"
              >
                See how I work <ArrowRight size={14} />
              </Link>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium">Get in touch</h2>
              <div className="mt-6 space-y-3">
                <a
                  href="mailto:sophie@example.com"
                  className="flex items-center gap-3 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full border border-[#e8e8e6] bg-white shadow-sm flex items-center justify-center group-hover:border-[#00d4aa]/40 transition-colors">
                    <Mail size={14} />
                  </span>
                  <span className="text-sm">sophie@example.com</span>
                </a>
                <a
                  href="https://github.com/sophiefcyin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full border border-[#e8e8e6] bg-white shadow-sm flex items-center justify-center group-hover:border-[#00d4aa]/40 transition-colors">
                    <Github size={14} />
                  </span>
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/sophiefcyin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full border border-[#e8e8e6] bg-white shadow-sm flex items-center justify-center group-hover:border-[#00d4aa]/40 transition-colors">
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
