"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DemoModal } from "./DemoModal";

type DemoModalContext = { open: () => void };

const Ctx = createContext<DemoModalContext | null>(null);

/**
 * Provides a single shared "request a demo" modal. Wrap the app once; any
 * descendant calls useDemoModal().open() (via <DemoButton>) to launch it.
 */
export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  // Bumped on each open so the modal remounts with fresh state (clean form,
  // back to step 1) instead of resetting state inside an effect.
  const [openKey, setOpenKey] = useState(0);
  const open = useCallback(() => {
    setOpenKey((k) => k + 1);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <DemoModal key={openKey} isOpen={isOpen} onClose={close} />
    </Ctx.Provider>
  );
}

export function useDemoModal(): DemoModalContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDemoModal must be used within <DemoModalProvider>");
  return ctx;
}
