import React from 'react';

interface ArchitectureDiagramProps {
  title?: string;
  children: React.ReactNode;
}

export default function ArchitectureDiagram({ title, children }: ArchitectureDiagramProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4 overflow-x-auto">
      {title && (
        <p className="text-sm text-white/40 mb-4">{title}</p>
      )}
      {children}
    </div>
  );
}
