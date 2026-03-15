import Logo from '@/components/Logo';

export default function LogoTest() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="font-satoshi font-bold text-2xl text-[#1a1a1a] mb-8">Logo</h1>
      <div className="bg-white rounded-xl border border-[#e8e8e6] p-8">
        <Logo />
      </div>
    </div>
  );
}
