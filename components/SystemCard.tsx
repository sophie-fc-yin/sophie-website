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
    <div className="bg-white rounded-xl border border-[#e8e8e6] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
      <div>
        <span className="text-lg font-semibold text-[#1a1a1a]">
          {system.name}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <TierBadge tier={system.tier} />
        <StatusBadge status={system.status} />
      </div>

      <p className="text-sm text-[#6b6b6b] mt-3 leading-relaxed flex-1">{system.oneLiner}</p>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {system.capabilities.map((cap) => (
          <CapabilityTag key={cap} label={cap} />
        ))}
      </div>

      <p className="text-xs text-[#a0a0a0] mt-3">
        Vercel: {vercelList} · DO: {doList}
      </p>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e8e8e6]">
        <Link
          href={`/projects/${system.slug}`}
          className="text-sm text-[#00d4aa] font-medium hover:opacity-80 transition-opacity"
        >
          View system →
        </Link>
        {system.githubUrl && (
          <a
            href={system.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a0a0a0] hover:text-[#1a1a1a] transition-colors"
          >
            <Github size={16} />
          </a>
        )}
      </div>
    </div>
  );
}
