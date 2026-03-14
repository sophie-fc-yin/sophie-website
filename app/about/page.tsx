import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Sophie Yin',
  description: 'AI systems engineer building production infrastructure for the creator economy.',
};

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xl md:text-2xl leading-relaxed text-white/80">
        I got into AI systems because I kept seeing the same problem — creators and media businesses
        sitting on incredible data and doing nothing with it. Not because they didn&apos;t want to,
        but because the infrastructure to make it useful didn&apos;t exist for them. So I started
        building it.
      </p>

      <div className="mt-16">
        <h2 className="text-xl font-semibold">Currently</h2>
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
            <dt className="text-sm text-white/40">Location</dt>
            <dd className="text-sm text-white/70">British Columbia, Canada</dd>

            <dt className="text-sm text-white/40">Focus</dt>
            <dd className="text-sm text-white/70">AI systems for the creator economy</dd>

            <dt className="text-sm text-white/40">Building</dt>
            <dd className="text-sm text-white/70">Production pipelines, audience intelligence tools, and agent systems</dd>

            <dt className="text-sm text-white/40">Stack</dt>
            <dd className="text-sm text-white/70">Next.js, Supabase, OpenAI, Anthropic Claude, DigitalOcean, Vercel</dd>
          </dl>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-semibold">Who I work with</h2>
        <p className="text-white/70 mt-4 leading-relaxed">
          Creators and media businesses who are serious about building systems — not just trying
          tools. If you&apos;re looking for someone to set up ChatGPT, I&apos;m probably not the
          right fit. If you want production infrastructure that runs while you sleep, let&apos;s
          talk.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-semibold">Get in touch</h2>
        <div className="flex gap-4 mt-4">
          <Link
            href="mailto:sophie@example.com"
            className="text-white/40 hover:text-white/70 transition-colors"
          >
            <Mail size={20} />
          </Link>
          <Link
            href="https://github.com/sophiefcyin"
            className="text-white/40 hover:text-white/70 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} />
          </Link>
          <Link
            href="https://linkedin.com/in/sophiefcyin"
            className="text-white/40 hover:text-white/70 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
