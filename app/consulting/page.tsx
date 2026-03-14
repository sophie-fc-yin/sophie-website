import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Consulting — Sophie Yin',
  description: 'AI systems consulting for creators and digital media businesses.',
};

export default function Consulting() {
  return (
    <main>
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* 1. Opening */}
        <div className="text-xl md:text-2xl leading-relaxed text-black/70">
          <p>
            You didn&apos;t start creating to spend your week cross-posting, editing transcripts, and manually responding to the same questions in your comments. But here you are.
          </p>
          <p className="mt-6">
            The creators who are pulling ahead right now aren&apos;t working harder — they&apos;ve built systems that handle the repeatable stuff so they can focus on what actually moves the needle.
          </p>
        </div>

        {/* 2. The Shift */}
        <div className="mt-16">
          <p className="text-lg text-black/60">
            Most channels are sitting on a goldmine of audience intelligence buried in their comments, watch data, and community signals. Very few are actually using it.
          </p>
          <Link href="/systems" className="mt-4 inline-block text-[#00d4aa] hover:underline text-sm">
            See what that looks like in practice →
          </Link>
        </div>

        {/* 3. How I Work */}
        <div className="mt-16">
          <p className="text-black/60 leading-relaxed">
            I work with creators and media businesses to build the infrastructure that makes this possible — automation pipelines, audience analysis tools, and agent systems that run in the background while you create.
          </p>
          <p className="mt-4 text-black/60 leading-relaxed">
            This isn&apos;t consulting in the traditional sense. It&apos;s closer to bringing in a systems engineer who&apos;s also obsessed with the creator economy.
          </p>
        </div>

        {/* 4. What's Available */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold">What&apos;s Available</h2>
          <div className="mt-8 space-y-6">

            <div className="border border-black/10 p-6 rounded-lg">
              <p className="font-mono font-semibold text-[#00d4aa]">AI Systems Audit</p>
              <p className="text-sm text-black/50 mt-2">
                For creators who feel like something could be automated but aren&apos;t sure where to start. Walk away with a clear map of what&apos;s worth building and in what order.
              </p>
            </div>

            <div className="border border-black/10 p-6 rounded-lg">
              <p className="font-mono font-semibold text-[#00d4aa]">AI Infrastructure Build</p>
              <p className="text-sm text-black/50 mt-2">
                Design and implement a production workflow end-to-end — from data ingestion to output. Built to run reliably, not just demo well.
              </p>
            </div>

            <div className="border border-black/10 p-6 rounded-lg">
              <p className="font-mono font-semibold text-[#00d4aa]">Custom Agent Systems</p>
              <p className="text-sm text-black/50 mt-2">
                Autonomous agents that monitor, analyze, and surface insights from your platforms — so you&apos;re not checking dashboards manually or missing signals in the noise.
              </p>
            </div>

          </div>
        </div>

        {/* 5. Soft CTA */}
        <div className="mt-16">
          <p className="text-xl font-semibold">If any of this sounds familiar, let&apos;s talk.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

      </div>
    </main>
  );
}
