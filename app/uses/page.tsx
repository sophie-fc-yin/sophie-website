import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Uses — Sophie Yin',
  description: 'The tools and infrastructure I work with.',
};

const sections = [
  {
    heading: 'Languages',
    items: ['Python', 'TypeScript', 'SQL'],
  },
  {
    heading: 'Frontend',
    items: ['Next.js', 'Tailwind CSS', 'React'],
  },
  {
    heading: 'Infrastructure',
    items: [
      'Vercel (frontend, edge functions, API routes)',
      'DigitalOcean (background workers, Droplets, App Platform)',
    ],
  },
  {
    heading: 'Databases',
    items: ['Supabase (PostgreSQL + pgvector)', 'Redis'],
  },
  {
    heading: 'AI / LLM',
    items: [
      'OpenAI API (GPT-4o, text-embedding-3-large)',
      'Anthropic Claude API (insight extraction, long-context analysis)',
    ],
  },
  {
    heading: 'Orchestration',
    items: ['n8n', 'custom Python pipeline runners'],
  },
  {
    heading: 'Dev Tools',
    items: ['VS Code', 'Claude Code', 'Cursor'],
  },
];

export default function Uses() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 md:py-28">
      <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1a]">Uses</h1>
      <p className="text-[#6b6b6b] mt-4 leading-[1.75]">The actual tools and infrastructure I work with.</p>

      <div className="mt-12 space-y-12">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium">{section.heading}</h2>
            <ul className="mt-3 space-y-1">
              {section.items.map((item) => (
                <li key={item} className="text-sm text-[#6b6b6b]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
