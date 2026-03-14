import { Tier } from '@/lib/types';

interface TierBadgeProps {
  tier: Tier;
}

export default function TierBadge({ tier }: TierBadgeProps) {
  if (tier === 1) {
    return (
      <span className="inline-flex px-2 py-0.5 text-xs border rounded-md border-emerald-300/40 text-emerald-600 bg-emerald-50 font-medium">
        Tier 1
      </span>
    );
  }

  if (tier === 2) {
    return (
      <span className="inline-flex px-2 py-0.5 text-xs border rounded-md border-blue-300/40 text-blue-600 bg-blue-50 font-medium">
        Tier 2
      </span>
    );
  }

  return (
    <span className="inline-flex px-2 py-0.5 text-xs border rounded-md border-violet-300/40 text-violet-600 bg-violet-50 font-medium">
      Tier 3
    </span>
  );
}
