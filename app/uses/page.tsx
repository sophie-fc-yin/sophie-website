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
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold">Uses</h1>
      <p className="text-black/60 mt-4">The actual tools and infrastructure I work with.</p>

      <div className="mt-12 space-y-12">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-lg font-mono text-[#00d4aa]">{section.heading}</h2>
            <ul className="mt-3 space-y-1">
              {section.items.map((item) => (
                <li key={item} className="text-sm text-black/60">
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
