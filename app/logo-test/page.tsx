import { LogoSPipeline, LogoSDiamond, LogoSCircuit, LogoSOrbital } from '@/components/Logo';

export default function LogoTest() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 space-y-16">
      <h1 className="font-satoshi font-bold text-2xl text-[#1a1a1a]">Logo Options v3</h1>

      <div className="space-y-12">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium mb-2">V1 — S as Pipeline Flow</p>
          <p className="text-xs text-[#6b6b6b] mb-4">The S is literally formed by nodes connected by flowing paths. The S IS the pipeline. Then &ldquo;ophie&rdquo; completes the name.</p>
          <div className="bg-white rounded-xl border border-[#e8e8e6] p-8 flex items-center gap-8">
            <LogoSPipeline />
            <span className="text-xs text-[#a0a0a0]">← nav size</span>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium mb-2">V2 — S inside Diamond Network</p>
          <p className="text-xs text-[#6b6b6b] mb-4">Diamond (rotated square) container with an S path flowing through it. Nodes at the entry and exit points.</p>
          <div className="bg-white rounded-xl border border-[#e8e8e6] p-8 flex items-center gap-8">
            <LogoSDiamond />
            <span className="text-xs text-[#a0a0a0]">← nav size</span>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium mb-2">V3 — S as Circuit Board</p>
          <p className="text-xs text-[#6b6b6b] mb-4">Angular, circuit-like S made of straight lines with nodes at each bend. Like a PCB trace. Most technical-looking.</p>
          <div className="bg-white rounded-xl border border-[#e8e8e6] p-8 flex items-center gap-8">
            <LogoSCircuit />
            <span className="text-xs text-[#a0a0a0]">← nav size</span>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#a0a0a0] font-medium mb-2">V4 — S with Orbital Nodes</p>
          <p className="text-xs text-[#6b6b6b] mb-4">Bold curved S with nodes at key bends and tiny satellite dots flowing along the path. Data moving through the system.</p>
          <div className="bg-white rounded-xl border border-[#e8e8e6] p-8 flex items-center gap-8">
            <LogoSOrbital />
            <span className="text-xs text-[#a0a0a0]">← nav size</span>
          </div>
        </div>
      </div>
    </div>
  );
}
