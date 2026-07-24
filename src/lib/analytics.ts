// Lightweight GA4 event helper. Safe to call from anywhere on the client:
// it no-ops if gtag isn't present (dev, ad-blocked, or not yet loaded), so
// call sites never need to guard.
type GtagParams = Record<string, string | number | boolean | undefined>;

export function track(event: string, params: GtagParams = {}): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== "function") return;
  w.gtag("event", event, params);
}
