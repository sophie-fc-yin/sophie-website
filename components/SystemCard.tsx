import Link from 'next/link';
import { Github } from 'lucide-react';
import { System } from '@/lib/types';
import StatusBadge from '@/components/StatusBadge';
import TierBadge from '@/components/TierBadge';
import CapabilityTag from '@/components/CapabilityTag';

interface SystemCardProps {
  system: System;
}

export default function SystemCard({ system }: SystemCardProps) {
  const vercelList = system.infrastructure.vercel.join(', ');
  const doList = system.infrastructure.digitalocean.join(', ');

  return (
    <div className="border border-black/10 p-6 rounded-lg hover:border-[#00d4aa]/40 transition-colors duration-200">
      <div>
        <span className="font-mono text-lg font-semibold text-[#111]">
          {system.name}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <TierBadge tier={system.tier} />
        <StatusBadge status={system.status} />
      </div>

      <p className="text-sm text-black/60 mt-3">{system.oneLiner}</p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {system.capabilities.map((cap) => (
          <CapabilityTag key={cap} label={cap} />
        ))}
      </div>

      <p className="text-xs text-black/30 mt-3">
        Vercel: {vercelList} · DO: {doList}
      </p>

      <div className="flex items-center justify-between mt-4">
        <Link
          href={`/systems/${system.slug}`}
          className="text-sm text-[#00d4aa] hover:underline"
        >
          View system →
        </Link>
        {system.githubUrl && (
          <a
            href={system.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/40 hover:text-black/70 transition-colors"
          >
            <Github size={16} />
          </a>
        )}
      </div>
    </div>
  );
}
