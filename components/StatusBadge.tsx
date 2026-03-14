import { SystemStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: SystemStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'Live') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium">
        <span className="animate-pulse bg-[#00d4aa] rounded-full w-2 h-2" />
        <span className="text-[#00d4aa]">Live</span>
      </span>
    );
  }

  if (status === 'In Progress') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium">
        <span className="bg-[#e5a100] rounded-full w-2 h-2" />
        <span className="text-[#e5a100]">In Progress</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span className="bg-[#d0d0d0] rounded-full w-2 h-2" />
      <span className="text-[#a0a0a0]">Planned</span>
    </span>
  );
}
