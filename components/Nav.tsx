'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { label: 'Systems', href: '/systems' },
  { label: 'Consulting', href: '/consulting' },
  { label: 'About', href: '/about' },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#fafafa]/90 backdrop-blur-sm border-b border-black/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Left: wordmark */}
          <Link href="/" className="font-mono text-[#111] hover:text-[#00d4aa] transition-colors">
            Sophie
          </Link>

          {/* Right: desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${
                  pathname === href
                    ? 'text-[#00d4aa]'
                    : 'text-[#111]/70 hover:text-[#111]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Hamburger: mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <div className="h-[2px] w-6 bg-[#111]" />
            <div className="h-[2px] w-6 bg-[#111]" />
            <div className="h-[2px] w-6 bg-[#111]" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#fafafa] border-b border-black/10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`py-3 text-sm transition-colors ${
                  pathname === href
                    ? 'text-[#00d4aa]'
                    : 'text-[#111]/70 hover:text-[#111]'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
