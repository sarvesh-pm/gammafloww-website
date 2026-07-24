"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/content";
import { track } from "@/lib/analytics";
import { ArrowRightIcon } from "@/components/Icons";

const REGIONS = [
  "United Arab Emirates", "European Union", "United Kingdom", "Asia-Pacific",
  "Latin America", "Africa", "North America", "Other",
];
const TIMEFRAMES = [
  "As soon as possible", "1–3 months", "3–6 months", "6+ months", "Just exploring",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "error";
type Step = "form" | "booking";

// Calendly booking embedded inside the modal (step 2), name+email prefilled so
// the visitor picks a time without leaving the form.
function bookingEmbedUrl(name: string, email: string) {
  const u = new URL(site.demoUrl);
  u.searchParams.set("name", name);
  u.searchParams.set("email", email);
  u.searchParams.set("embed_domain", typeof window !== "undefined" ? window.location.host : "");
  u.searchParams.set("embed_type", "Inline");
  u.searchParams.set("hide_gdpr_banner", "1");
  return u.toString();
}

export function DemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<Element | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState<Step>("form");
  const [lead, setLead] = useState<{ name: string; email: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Lock scroll, remember + restore focus, Escape to close, and trap Tab within
  // the dialog. State resets on each open via the remount key in the provider.
  useEffect(() => {
    if (!isOpen) return;
    returnFocusRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      (returnFocusRef.current as HTMLElement | null)?.focus?.();
    };
  }, [isOpen, onClose]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const GENERIC = "Please check your name, email, and company, then try again.";
    if (!name || !(data.company || "").trim() || !EMAIL_RE.test(email)) {
      setErrorMsg(GENERIC);
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setErrorMsg(
          err?.error === "disposable-email"
            ? "Please use a permanent email address — temporary inboxes aren't accepted."
            : GENERIC,
        );
        setStatus("error");
        return;
      }
      // Success — the qualified lead is captured. This is the key conversion.
      track("generate_lead", { method: "demo_form" });
      track("demo_booking_viewed");
      // Reveal the booking calendar in-place (step 2).
      setLead({ name, email });
      setStep("booking");
      setStatus("idle");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const backdrop = reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  const panel = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.98 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
      };

  const isBooking = step === "booking" && lead;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          {...backdrop}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-title"
            aria-describedby="demo-desc"
            className={`relative my-auto w-full rounded-3xl border border-border bg-surface p-6 shadow-glow sm:p-8 ${
              isBooking ? "max-w-3xl" : "max-w-lg"
            }`}
            {...panel}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-faint transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {isBooking ? (
              <div>
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  <span aria-hidden="true">←</span> Back to details
                </button>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand">Step 2 of 2</span>
                <h2 id="demo-title" className="mt-2 text-2xl font-semibold tracking-tight">
                  Pick a time that works
                </h2>
                <p id="demo-desc" className="mt-2 text-sm leading-relaxed text-muted">
                  Thanks, {lead.name.split(" ")[0]} — choose a slot below and you&apos;re booked.
                </p>
                <iframe
                  title="Schedule your demo"
                  src={bookingEmbedUrl(lead.name, lead.email)}
                  className="mt-4 h-[600px] w-full rounded-xl border border-border"
                  loading="eager"
                />
              </div>
            ) : (
              <>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand">Step 1 of 2</span>
                <h2 id="demo-title" className="mt-2 text-2xl font-semibold tracking-tight">
                  Tell us about your venue
                </h2>
                <p id="demo-desc" className="mt-2 text-sm leading-relaxed text-muted">
                  A few quick details, then you&apos;ll pick a time — all in one step.
                </p>

                <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4" noValidate>
                  {/* Honeypot — hidden from users, catches bots */}
                  <input
                    type="text"
                    name="company_site"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <Field label="Full name" htmlFor="demo-name">
                    <input ref={firstFieldRef} id="demo-name" name="name" required autoComplete="name" className="gf-input" />
                  </Field>
                  <Field label="Work email" htmlFor="demo-email">
                    <input id="demo-email" name="email" type="email" required autoComplete="email" className="gf-input" />
                  </Field>
                  <Field label="Company" htmlFor="demo-company">
                    <input id="demo-company" name="company" required autoComplete="organization" className="gf-input" />
                  </Field>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Region" htmlFor="demo-region">
                      <select id="demo-region" name="region" defaultValue="" className="gf-input">
                        <option value="" disabled>Select…</option>
                        {REGIONS.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Launch timeframe" htmlFor="demo-timeframe">
                      <select id="demo-timeframe" name="timeframe" defaultValue="" className="gf-input">
                        <option value="" disabled>Select…</option>
                        {TIMEFRAMES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="What are you looking to launch?" htmlFor="demo-message" optional>
                    <textarea id="demo-message" name="message" rows={3} className="gf-input resize-none" />
                  </Field>

                  {status === "error" && errorMsg && (
                    <p role="alert" className="text-sm text-down">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-ink transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "submitting" ? "Submitting…" : "Continue to booking"}
                    {status !== "submitting" && (
                      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </button>
                  <p className="text-center text-[11px] text-faint">
                    We&apos;ll only use this to prepare for your demo. No spam.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-1.5 text-sm text-muted">
        {label}
        {optional && <span className="text-[11px] text-faint">(optional)</span>}
      </label>
      {children}
    </div>
  );
}
