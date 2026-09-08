import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/cirengsmp-logo.png.asset.json";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Announcements", href: "#announcements" },
  { label: "Redeem", href: "#redeem" },
  { label: "Info & Rules", href: "#info" },
  { label: "Support", href: "#support" },
];

export function PlatformBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/40 bg-emerald/10 px-2.5 py-1 text-[11px] font-semibold text-emerald shadow-[0_0_16px_-4px_var(--emerald)]">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald" />
        </span>
        Bedrock Edition (Active)
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-ember/40 bg-ember/10 px-2.5 py-1 text-[11px] font-semibold text-ember">
        Java Edition (Coming Soon)
      </span>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logo.url}
            alt="Logo CirengSMP"
            width={40}
            height={40}
            className="size-10 rounded-lg object-cover shadow-ember"
          />
          <span className="font-display text-xl font-bold tracking-wide text-gradient-brand">
            CirengSMP
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <PlatformBadges className="hidden md:flex" />

        <button
          className="inline-flex size-10 items-center justify-center rounded-md text-foreground hover:bg-accent lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-4 pb-4 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <PlatformBadges className="mt-3 md:hidden" />
        </div>
      )}
    </header>
  );
}
