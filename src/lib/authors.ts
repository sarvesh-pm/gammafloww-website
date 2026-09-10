// Author registry for blog bylines and JSON-LD author markup.
//
// E-E-A-T note: named individual experts (with a real role and a verifiable
// LinkedIn/profile in `sameAs`) carry more author-trust weight than an
// anonymous org byline. Add real people here — never invented ones — and set a
// post's `author` frontmatter to the matching id to switch it to a Person.
// Until then, posts default to the collective "GammaFloww Team" author, which
// is emitted as an Organization (honest: it is the team, not a person).

export type Author = {
  /** Display name used in the byline and schema. */
  name: string;
  /** schema.org type — Person for a named individual, Organization for the team. */
  type: "Person" | "Organization";
  /** Short role/credential line shown in the author box. */
  role: string;
  /** One- or two-sentence expertise statement. */
  bio: string;
  /** Verifiable profiles (LinkedIn, X, etc.) — becomes schema `sameAs`. */
  sameAs?: string[];
};

const siteUrl = "https://www.gammafloww.com";

export const authors: Record<string, Author> = {
  "GammaFloww Team": {
    name: "GammaFloww Team",
    type: "Organization",
    role: "Derivatives exchange infrastructure engineers",
    bio: "The GammaFloww team builds white-label crypto derivatives exchange infrastructure — matching engines, liquidity, and risk systems — used by partners to launch futures and options venues. These guides distill what we've learned shipping and operating that stack.",
    sameAs: undefined,
  },
  // Named authors. LinkedIn/profile URLs to be added to `sameAs` when available
  // — that strengthens the author-trust (E-E-A-T) signal for AI answer engines.
  Sara: {
    name: "Sara",
    type: "Person",
    role: "Head of Business Partnerships, GammaFloww",
    bio: "Sara leads business partnerships at GammaFloww, working with operators launching white-label derivatives exchanges. She focuses on how teams evaluate infrastructure, structure commercials, and get to market — the practical side of buying versus building.",
    sameAs: undefined,
  },
  Paul: {
    name: "Paul",
    type: "Person",
    role: "Head of Marketing, GammaFloww",
    bio: "Paul heads marketing at GammaFloww and writes about the crypto derivatives market — where volume and demand are moving, and what that means for operators positioning a new venue.",
    sameAs: undefined,
  },
};

const FALLBACK = authors["GammaFloww Team"];

/** Resolve a frontmatter `author` value to a registry entry, falling back to
 * the GammaFloww Team when the name is not (yet) a known named author. */
export function resolveAuthor(name: string): Author {
  return authors[name] ?? { ...FALLBACK, name };
}

/** Build the schema.org author node for a post. */
export function authorSchema(name: string) {
  const a = resolveAuthor(name);
  return {
    "@type": a.type,
    name: a.name,
    ...(a.type === "Organization"
      ? { url: siteUrl }
      : {
          jobTitle: a.role,
          worksFor: { "@type": "Organization", name: "GammaFloww", url: siteUrl },
        }),
    ...(a.sameAs && a.sameAs.length ? { sameAs: a.sameAs } : {}),
  };
}
