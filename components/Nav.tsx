'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Consulting', href: '/consulting' },
  { label: 'About', href: '/about' },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#f9f9f7]/80 backdrop-blur-sm border-b border-[#ebebeb]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-[72px] flex items-center justify-between">
          {/* Left: wordmark */}
          <Link href="/" className="font-satoshi font-semibold tracking-tight text-[#1a1a1a] hover:text-[#00d4aa] transition-colors">
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
                    : 'text-[#6b6b6b] hover:text-[#1a1a1a]'
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
            <div className="h-[2px] w-6 bg-[#1a1a1a]" />
            <div className="h-[2px] w-6 bg-[#1a1a1a]" />
            <div className="h-[2px] w-6 bg-[#1a1a1a]" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#f9f9f7] border-b border-[#ebebeb]">
          <div className="max-w-6xl mx-auto px-6 flex flex-col">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`py-3 text-sm transition-colors ${
                  pathname === href
                    ? 'text-[#00d4aa]'
                    : 'text-[#6b6b6b] hover:text-[#1a1a1a]'
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
