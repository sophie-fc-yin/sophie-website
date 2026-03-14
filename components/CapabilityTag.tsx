interface CapabilityTagProps {
  label: string;
}

export default function CapabilityTag({ label }: CapabilityTagProps) {
  return (
    <span className="bg-[#f0faf7] text-[#00d4aa] text-xs px-2.5 py-1 rounded-md font-medium">
      {label}
    </span>
  );
}
