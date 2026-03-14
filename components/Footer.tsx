import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-black/40 text-sm">
        <span>© 2026 Sophie Yin</span>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/sophiefcyin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-black/40 hover:text-black/70 transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/sophiefcyin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-black/40 hover:text-black/70 transition-colors"
          >
            <Linkedin size={18} />
          </a>
        </div>

        <span>Built with Next.js · Deployed on Vercel · Backend on DigitalOcean</span>
      </div>
    </footer>
  );
}
