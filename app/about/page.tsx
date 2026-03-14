import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Sophie Yin',
  description: 'AI systems engineer building production infrastructure for the creator economy.',
};

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
    <div className="max-w-2xl mx-auto px-6 py-16">

      {/* The Why */}
      <p className="text-xl md:text-2xl leading-relaxed text-black/70">
        I got into AI systems because I kept seeing the same problem — creators and media businesses
        sitting on incredible data and doing nothing with it. Not because they didn&apos;t want to,
        but because the infrastructure to make it useful didn&apos;t exist for them. So I started
        building it.
      </p>

      {/* Background */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold">Background</h2>
        <p className="text-black/60 mt-4 leading-relaxed">
          {/* TODO: Replace with real background */}
          Before building AI systems for creators, I spent [X] years working across data science,
          data engineering, and machine learning engineering — building production pipelines,
          training and deploying models, and designing the infrastructure that makes data actually
          useful at scale.
        </p>
        <p className="text-black/60 mt-4 leading-relaxed">
          I&apos;ve worked in [industry placeholder] and [industry placeholder], where the problems
          were always the same: teams sitting on valuable data with no reliable way to extract
          insight from it. The difference between a notebook experiment and a system that runs
          unsupervised every day is where I spend most of my time.
        </p>

        {/* Roles */}
        <div className="flex flex-wrap gap-2 mt-6">
          {['Data Scientist', 'Data Engineer', 'ML Engineer', 'AI Systems Engineer'].map((role) => (
            <span key={role} className="border border-black/10 text-black/60 text-xs px-3 py-1 rounded-full">
              {role}
            </span>
          ))}
        </div>
      </div>

      {/* Currently */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold">Currently</h2>
        <div className="bg-black/5 border border-black/10 rounded-lg p-6 mt-4">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
            <dt className="text-sm text-black/40">Focus</dt>
            <dd className="text-sm text-black/60">AI systems for the creator economy</dd>

            <dt className="text-sm text-black/40">Building</dt>
            <dd className="text-sm text-black/60">Production pipelines, audience intelligence tools, and agent systems</dd>
          </dl>
        </div>
      </div>

      {/* Stack */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold">Stack</h2>
        <div className="mt-6 space-y-6">
          {stackCategories.map((cat) => (
            <div key={cat.name}>
              <h3 className="text-sm font-mono text-[#00d4aa]">{cat.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {cat.items.map((item) => (
                  <span key={item} className="bg-black/5 text-black/60 text-xs px-2.5 py-1 rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Link href="/uses" className="inline-block mt-6 text-[#00d4aa] hover:underline text-sm">
          See the full stack →
        </Link>
      </div>

      {/* Who I Work With */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold">Who I work with</h2>
        <p className="text-black/60 mt-4 leading-relaxed">
          Creators and media businesses who are serious about building systems — not just trying
          tools. If you&apos;re looking for someone to set up ChatGPT, I&apos;m probably not the
          right fit. If you want production infrastructure that runs while you sleep, let&apos;s
          talk.
        </p>
      </div>

      {/* Get in Touch */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold">Get in touch</h2>
        <div className="flex gap-4 mt-4">
          <a
            href="mailto:sophie@example.com"
            className="text-black/40 hover:text-black/60 transition-colors"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://github.com/sophiefcyin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/40 hover:text-black/60 transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/sophiefcyin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/40 hover:text-black/60 transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>

    </div>
  );
}
