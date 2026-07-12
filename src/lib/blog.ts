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
  /** Last content refresh; falls back to `date` when no `updated` frontmatter. */
  updated: string;
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
  const fm = data as Record<string, unknown>;
  // gray-matter can return non-strings for unquoted YAML (e.g. a bare `date:`
  // becomes a Date), so coerce each field rather than assuming `string`.
  const str = (v: unknown, fallback: string) =>
    typeof v === "string" && v.length > 0 ? v : v != null ? String(v) : fallback;
  const date = str(fm.date, "2026-07-09");
  return {
    slug,
    title: str(fm.title, slug),
    description: str(fm.description, ""),
    cluster: str(fm.cluster, "General"),
    keyword: str(fm.keyword, ""),
    date,
    updated: str(fm.updated, date),
    author: str(fm.author, "GammaFloww Team"),
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
