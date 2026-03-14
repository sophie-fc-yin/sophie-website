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

export default function ContentPipelineDiagram() {
  return (
    <ArchitectureDiagram>
      <div className="flex flex-wrap items-end gap-y-4">
        <div>
          <GroupLabel label="Input" />
          <div className="flex flex-wrap items-center">
            <Step label="Topic Input" />
            <Arrow />
            <Step label="Script Generation" />
            <Arrow />
          </div>
        </div>
        <div>
          <GroupLabel label="DigitalOcean" />
          <div className="flex flex-wrap items-center">
            <Step label="Script Review" />
            <Arrow />
            <Step label="Voice Synthesis" />
            <Arrow />
            <Step label="Thumbnail Gen" />
            <Arrow />
            <Step label="Metadata Gen" />
            <Arrow />
            <Step label="Upload Pipeline" />
            <Arrow />
          </div>
        </div>
        <div>
          <GroupLabel label="Delivery" />
          <div className="flex flex-wrap items-center">
            <Step label="Notification" />
          </div>
        </div>
      </div>
    </ArchitectureDiagram>
  );
}
