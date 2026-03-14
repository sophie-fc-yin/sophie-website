import { getPostBySlug, getAllSlugs } from '@/lib/writing';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug);
    return {
      title: `${post.title} — Sophie Yin`,
      description: post.description,
    };
  } catch {
    return {};
  }
}

export default function WritingPost({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-[#111]">{post.title}</h1>
      <p className="text-sm text-black/40 mt-2">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <div className="prose prose-lg mt-8 max-w-none prose-a:text-[#00d4aa] prose-headings:text-[#111]">
        <MDXRemote source={post.content} />
      </div>
      <Link
        href="/writing"
        className="text-sm text-black/40 hover:text-black/60 mt-12 inline-block"
      >
        ← Back to Writing
      </Link>
    </main>
  );
}
