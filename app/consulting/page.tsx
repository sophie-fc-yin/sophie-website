import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import FadeIn from '@/components/FadeIn';

export const metadata = {
  title: 'Consulting — Sophie Yin',
  description: 'AI systems consulting for creators and digital media businesses.',
};

export default function Consulting() {
  return (
    <main>
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">

        {/* 1. Opening */}
        <FadeIn>
          <div className="text-2xl md:text-3xl leading-[1.5] text-[#1a1a1a] font-light">
            <p>
              You didn&apos;t start creating to spend your week cross-posting, editing transcripts, and manually responding to the same questions in your comments. But here you are.
            </p>
            <p className="mt-6 text-xl md:text-2xl text-[#6b6b6b] font-light">
              The creators who are pulling ahead right now aren&apos;t working harder — they&apos;ve built systems that handle the repeatable stuff so they can focus on what actually moves the needle.
            </p>
          </div>
        </FadeIn>

        {/* 2. The Shift */}
        <FadeIn delay={100}>
          <div className="mt-20 md:mt-28">
            <p className="text-lg text-[#6b6b6b] leading-[1.75]">
              Most channels are sitting on a goldmine of audience intelligence buried in their comments, watch data, and community signals. Very few are actually using it.
            </p>
            <Link href="/projects" className="mt-4 inline-block text-[#00d4aa] font-medium text-sm hover:opacity-80 transition-opacity">
              See what that looks like in practice →
            </Link>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#ebebeb]" />
              <Link href="#contact" className="text-xs text-[#a0a0a0] hover:text-[#00d4aa] transition-colors">
                or skip to get in touch ↓
              </Link>
              <div className="h-px flex-1 bg-[#ebebeb]" />
            </div>
          </div>
        </FadeIn>

        {/* 3. How I Work */}
        <FadeIn delay={200}>
          <div className="mt-20 md:mt-28">
            <p className="text-[#6b6b6b] leading-[1.75]">
              I work with creators and media businesses to build the infrastructure that makes this possible — automation pipelines, audience analysis tools, and agent systems that run in the background while you create.
            </p>
            <p className="mt-4 text-[#6b6b6b] leading-[1.75]">
              This isn&apos;t consulting in the traditional sense. It&apos;s closer to bringing in a systems engineer who&apos;s also obsessed with the creator economy.
            </p>
          </div>
        </FadeIn>

        {/* 4. What's Available */}
        <FadeIn delay={300}>
          <div className="mt-20 md:mt-28">
            <h2 className="font-satoshi text-xl font-semibold text-[#1a1a1a]">What&apos;s Available</h2>
            <div className="mt-8 space-y-4">

              <div className="bg-white rounded-xl border border-[#e8e8e6] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] p-7">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#00d4aa]" />
                  <p className="font-satoshi font-semibold text-[#1a1a1a] text-base">AI Systems Audit</p>
                </div>
                <p className="text-sm text-[#6b6b6b] mt-3 leading-[1.75]">
                  For creators who feel like something could be automated but aren&apos;t sure where to start. Walk away with a clear map of what&apos;s worth building and in what order.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#e8e8e6] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] p-7">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#00d4aa]" />
                  <p className="font-satoshi font-semibold text-[#1a1a1a] text-base">AI Infrastructure Build</p>
                </div>
                <p className="text-sm text-[#6b6b6b] mt-3 leading-[1.75]">
                  Design and implement a production workflow end-to-end — from data ingestion to output. Built to run reliably, not just demo well.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#e8e8e6] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] p-7">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#00d4aa]" />
                  <p className="font-satoshi font-semibold text-[#1a1a1a] text-base">Custom Agent Systems</p>
                </div>
                <p className="text-sm text-[#6b6b6b] mt-3 leading-[1.75]">
                  Autonomous agents that monitor, analyze, and surface insights from your platforms — so you&apos;re not checking dashboards manually or missing signals in the noise.
                </p>
              </div>

            </div>
          </div>
        </FadeIn>

        {/* 5. Soft CTA */}
        <FadeIn delay={400}>
          <div id="contact" className="mt-20 md:mt-28">
            <p className="font-satoshi text-xl font-semibold text-[#1a1a1a]">If any of this sounds familiar, let&apos;s talk.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </FadeIn>

      </div>
    </main>
  );
}
