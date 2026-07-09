import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  cluster: string;
  keyword: string;
  date: string;
  author: string;
  readingTime: string;
};

function readRaw(slug: string): string {
  return fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8");
}

function readingTimeOf(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function toMeta(slug: string, raw: string): PostMeta {
  const { data, content } = matter(raw);
  const fm = data as Record<string, string>;
  return {
    slug,
    title: fm.title ?? slug,
    description: fm.description ?? "",
    cluster: fm.cluster ?? "General",
    keyword: fm.keyword ?? "",
    date: fm.date ?? "2026-07-09",
    author: fm.author ?? "GammaFloww Team",
    readingTime: readingTimeOf(content),
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => toMeta(slug, readRaw(slug)))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSource(slug: string): { meta: PostMeta; source: string } | null {
  try {
    const raw = readRaw(slug);
    return { meta: toMeta(slug, raw), source: raw };
  } catch {
    return null;
  }
}
