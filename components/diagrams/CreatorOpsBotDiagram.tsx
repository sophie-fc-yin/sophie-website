import ArchitectureDiagram from '@/components/ArchitectureDiagram';

const Step = ({ label }: { label: string }) => (
  <span className="bg-white/10 border border-white/20 px-3 py-2 rounded text-xs font-mono text-white/80 whitespace-nowrap">
    {label}
  </span>
);

const Arrow = () => (
  <span className="text-white/30 mx-2">→</span>
);

const GroupLabel = ({ label }: { label: string }) => (
  <div className="text-[10px] uppercase tracking-wider mb-2 text-white/30">{label}</div>
);

export default function CreatorOpsBotDiagram() {
  return (
    <ArchitectureDiagram>
      <div className="flex flex-wrap items-end gap-y-4">
        <div>
          <GroupLabel label="DigitalOcean" />
          <div className="flex flex-wrap items-center">
            <Step label="Trigger" />
            <Arrow />
            <Step label="Content Reformat" />
            <Arrow />
            <Step label="Cross-post" />
            <Arrow />
            <Step label="Schedule Queue" />
            <Arrow />
            <Step label="Comment Match" />
            <Arrow />
            <Step label="Auto-reply" />
            <Arrow />
            <Step label="Activity Log" />
          </div>
        </div>
      </div>
    </ArchitectureDiagram>
  );
}
