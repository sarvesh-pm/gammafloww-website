import { nav, site } from "@/lib/content";
import { Logo } from "./Logo";

const legal = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <span className="text-[17px] font-semibold tracking-tight">
                Gamma<span className="text-brand">Floww</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">{site.tagline}</p>
            <a
              href={site.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-ink transition-transform hover:scale-[1.03]"
            >
              Schedule a Demo
            </a>
          </div>

          <div className="flex gap-16">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-faint">Product</div>
              <ul className="mt-4 space-y-3">
                {nav.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-faint">Legal</div>
              <ul className="mt-4 space-y-3">
                {legal.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-faint sm:flex-row">
          <span>© {new Date().getFullYear()} GammaFloww. All rights reserved.</span>
          <span>Built for the next generation of Web3 exchanges.</span>
        </div>
      </div>
    </footer>
  );
}
