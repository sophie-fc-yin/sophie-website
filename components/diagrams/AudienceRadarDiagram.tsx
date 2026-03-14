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

export default function AudienceRadarDiagram() {
  return (
    <ArchitectureDiagram>
      <div className="flex flex-wrap items-end gap-y-4">
        <div>
          <GroupLabel label="Multi-Platform" />
          <div className="flex flex-wrap items-center">
            <Step label="Data Sources" />
            <Arrow />
            <Step label="Ingestion Agents" />
            <Arrow />
          </div>
        </div>
        <div>
          <GroupLabel label="DigitalOcean" />
          <div className="flex flex-wrap items-center">
            <Step label="Normalization" />
            <Arrow />
            <Step label="Embedding" />
            <Arrow />
            <Step label="Topic Clustering" />
            <Arrow />
            <Step label="Velocity Scoring" />
            <Arrow />
            <Step label="Relevance Filter" />
            <Arrow />
          </div>
        </div>
        <div>
          <GroupLabel label="Output" />
          <div className="flex flex-wrap items-center">
            <Step label="Alert Gen" />
            <Arrow />
            <Step label="Delivery" />
          </div>
        </div>
      </div>
    </ArchitectureDiagram>
  );
}
