import Link from "next/link";
import { nav, site, socials } from "@/lib/content";
import { Logo } from "./Logo";
import { socialIconMap } from "./Icons";

const legal = [
  { label: "Terms of Service", href: "/#" },
  { label: "Privacy Policy", href: "/#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link href="/#top" className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <span className="text-[17px] font-semibold tracking-tight">
                Gamma<span className="text-brand">Floww</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">{site.tagline}</p>
            <a
              href={site.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-ink transition-transform hover:scale-[1.03]"
            >
              Schedule a Demo
            </a>

            {/* Social tabs */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => {
                const Icon = socialIconMap[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex gap-16">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-faint">Product</div>
              <ul className="mt-4 space-y-3">
                {nav.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-faint">Legal</div>
              <ul className="mt-4 space-y-3">
                {legal.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-[11px] leading-relaxed text-faint">
            <span className="font-semibold text-muted">Disclaimer:</span> GammaFloww provides
            white-label technology and infrastructure to businesses. It is not a retail exchange and
            does not offer trading, investment, or financial services to the public. This website —
            including blog articles, interactive tools, and figures — is for general informational
            purposes for businesses evaluating infrastructure, and does not constitute financial,
            investment, legal, tax, or trading advice, or an offer or solicitation. Operating an
            exchange and offering crypto derivatives carry significant risk and regulatory
            obligations; obtaining the necessary licences and meeting compliance requirements are the
            responsibility of the operator. Interactive tools produce illustrative estimates only;
            data is sourced as noted and may change. Availability of products and services depends on
            jurisdiction and applicable licensing. Consult qualified legal and financial
            professionals before making decisions.
          </p>
          <div className="mt-5 flex flex-col items-center justify-between gap-3 text-xs text-faint sm:flex-row">
            <span>© {new Date().getFullYear()} GammaFloww. All rights reserved.</span>
            <span>Built for the next generation of Web3 exchanges.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
