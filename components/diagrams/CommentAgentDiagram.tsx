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

export default function CommentAgentDiagram() {
  return (
    <ArchitectureDiagram>
      <div className="flex flex-wrap items-end gap-y-4">
        <div>
          <GroupLabel label="Data Ingestion" />
          <div className="flex flex-wrap items-center">
            <Step label="YouTube API" />
            <Arrow />
            <Step label="Comment Ingestion" />
            <Arrow />
            <Step label="Preprocessing" />
            <Arrow />
          </div>
        </div>
        <div>
          <GroupLabel label="DigitalOcean" />
          <div className="flex flex-wrap items-center">
            <Step label="Embedding Generation" />
            <Arrow />
            <Step label="Clustering (HDBSCAN)" />
            <Arrow />
            <Step label="Cluster Labeling" />
            <Arrow />
            <Step label="Insight Extraction" />
            <Arrow />
          </div>
        </div>
        <div>
          <GroupLabel label="Vercel" />
          <div className="flex flex-wrap items-center">
            <Step label="Dashboard" />
          </div>
        </div>
      </div>
    </ArchitectureDiagram>
  );
}
