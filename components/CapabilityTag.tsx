interface CapabilityTagProps {
  label: string;
}

export default function CapabilityTag({ label }: CapabilityTagProps) {
  return (
    <span className="bg-black/5 text-black/50 text-xs px-2 py-0.5 rounded">
      {label}
    </span>
  );
}
