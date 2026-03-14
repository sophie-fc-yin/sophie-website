import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#ebebeb]">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4 text-[#a0a0a0] text-sm">
        <span>© 2026 Sophie Yin</span>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/sophiefcyin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#a0a0a0] hover:text-[#1a1a1a] transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/sophiefcyin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#a0a0a0] hover:text-[#1a1a1a] transition-colors"
          >
            <Linkedin size={18} />
          </a>
        </div>

        <span>Built with Next.js · Deployed on Vercel · Backend on DigitalOcean</span>
      </div>
    </footer>
  );
}
