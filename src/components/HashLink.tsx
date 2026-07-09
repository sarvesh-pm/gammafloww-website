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
    if (hashIndex !== -1) {
      const path = href.slice(0, hashIndex) || "/";
      const id = href.slice(hashIndex + 1);
      if (window.location.pathname === path) {
        e.preventDefault();
        if (id === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          history.pushState(null, "", path);
        } else {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            history.pushState(null, "", `#${id}`);
          }
        }
      }
    }
    onClick?.(e);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
