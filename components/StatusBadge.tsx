import { SystemStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: SystemStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'Live') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs">
        <span className="animate-pulse bg-green-400 rounded-full w-2 h-2" />
        <span className="text-green-400">Live</span>
      </span>
    );
  }

  if (status === 'In Progress') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs">
        <span className="bg-yellow-400 rounded-full w-2 h-2" />
        <span className="text-yellow-400">In Progress</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs">
      <span className="bg-black/30 rounded-full w-2 h-2" />
      <span className="text-black/40">Planned</span>
    </span>
  );
}
