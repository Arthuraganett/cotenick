import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" fill="none" className={cn("h-9 w-auto", className)} aria-hidden>
      {/* outer: royal blue, ends in blue node */}
      <path d="M6 6 C34 6 54 26 54 54 L54 66" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" />
      <path d="M54 66 Q54 70 58 72" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="59" cy="72.5" r="4" fill="var(--primary)" />
      {/* middle: white, ends in white node */}
      <path d="M6 18 C26 18 38 30 38 50 L38 74" stroke="var(--foreground)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="38" cy="75" r="4.5" fill="var(--foreground)" />
      {/* inner: cyan */}
      <path d="M6 30 C16 30 22 36 22 46 L22 66" stroke="var(--cyan)" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark />
      <span className="font-display text-xl font-medium tracking-[0.18em] text-foreground">COTENICK</span>
    </span>
  );
}
