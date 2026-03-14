interface CapabilityTagProps {
  label: string;
}

export default function CapabilityTag({ label }: CapabilityTagProps) {
  return (
    <span className="bg-white/5 text-white/60 text-xs px-2 py-0.5 rounded">
      {label}
    </span>
  );
}
