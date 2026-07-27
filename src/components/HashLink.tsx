"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type HashLinkProps = ComponentProps<typeof Link> & { href: string };

/**
 * A drop-in replacement for next/link for our on-page section anchors.
 *
 * Next's App Router client navigation is unreliable for same-pathname hash
 * links (e.g. clicking "/#features" while already on "/"): it can fail to
 * update, or concatenate fragments into a malformed "/#features#top" URL.
 * When we're already on the link's target path we bypass the router entirely
 * and do a native smooth scroll with a single, clean hash. Cross-page links
 * (e.g. "/blog", or "/#features" clicked from a blog page) fall through to
 * <Link> untouched.
 */
export function HashLink({ href, onClick, ...rest }: HashLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const hashIndex = href.indexOf("#");
    const path = hashIndex === -1 ? href : href.slice(0, hashIndex) || "/";
    const id = hashIndex === -1 ? "" : href.slice(hashIndex + 1);
    // Only intercept when we're already on the target path (same-page nav).
    // We smooth-scroll but never write a fragment to the URL — the address
    // bar stays clean (just the path). HashCleanup handles the cross-page and
    // direct-load cases.
    if (window.location.pathname === path) {
      if (id && id !== "top") {
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
          if (window.location.hash) history.replaceState(null, "", path);
        }
      } else {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (window.location.hash) history.replaceState(null, "", path);
      }
    }
    onClick?.(e);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
