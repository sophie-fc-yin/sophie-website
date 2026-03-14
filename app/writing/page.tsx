import { getAllPosts } from '@/lib/writing';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing — Sophie Yin',
  description: 'Practical notes on AI systems, automation, and the creator economy.',
};

export default function Writing() {
  const posts = getAllPosts();

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-[#111]">Writing</h1>
      <p className="text-black/60 mt-4">
        Practical notes on AI systems, automation, and the creator economy.
      </p>

      <div className="divide-y divide-black/10 mt-12">
        {posts.map((post) => (
          <article key={post.slug} className="py-8">
            <Link
              href={`/writing/${post.slug}`}
              className="text-xl font-semibold hover:text-[#00d4aa] transition"
            >
              {post.title}
            </Link>
            <p className="text-sm text-black/40 mt-2">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-black/60 mt-3">{post.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-black/5 text-black/50 text-xs px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
