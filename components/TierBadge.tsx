import { Tier } from '@/lib/types';

interface TierBadgeProps {
  tier: Tier;
}

export default function TierBadge({ tier }: TierBadgeProps) {
  if (tier === 1) {
    return (
      <span className="inline-flex px-2 py-0.5 text-xs border rounded-full border-green-400/50 text-green-400">
        Tier 1
      </span>
    );
  }

  if (tier === 2) {
    return (
      <span className="inline-flex px-2 py-0.5 text-xs border rounded-full border-blue-400/50 text-blue-400">
        Tier 2
      </span>
    );
  }

  return (
    <span className="inline-flex px-2 py-0.5 text-xs border rounded-full border-purple-400/50 text-purple-400">
      Tier 3
    </span>
  );
}
