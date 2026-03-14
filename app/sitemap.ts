import { MetadataRoute } from 'next';
import { systems } from '@/data/systems';
import { getAllSlugs } from '@/lib/writing';

const BASE_URL = 'https://sophieyin.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const writingSlugs = getAllSlugs();

  return [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/systems`, lastModified: new Date() },
    ...systems.map((system) => ({
      url: `${BASE_URL}/systems/${system.slug}`,
      lastModified: new Date(),
    })),
    { url: `${BASE_URL}/consulting`, lastModified: new Date() },
    { url: `${BASE_URL}/writing`, lastModified: new Date() },
    ...writingSlugs.map((slug) => ({
      url: `${BASE_URL}/writing/${slug}`,
      lastModified: new Date(),
    })),
    { url: `${BASE_URL}/about`, lastModified: new Date() },
    { url: `${BASE_URL}/uses`, lastModified: new Date() },
  ];
}
