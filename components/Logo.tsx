import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="group-hover:scale-110 transition-transform">
        {/* Diamond — rotated square, clean and structured */}
        <rect
          x="10"
          y="1"
          width="12.73"
          height="12.73"
          rx="2"
          transform="rotate(45 10 1)"
          fill="#00d4aa"
        />
      </svg>
      <span className="font-satoshi font-bold text-[22px] text-[#1a1a1a] tracking-tight leading-none lowercase">
        sophie
      </span>
    </Link>
  );
}
