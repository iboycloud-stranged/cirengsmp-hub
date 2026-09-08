import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import logo from "@/assets/cirengsmp-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <img src={logo.url} alt="" width={28} height={28} className="size-7 rounded-md" />
          <span>© {new Date().getFullYear()} CirengSMP. Bukan afiliasi resmi Mojang/Microsoft.</span>
        </div>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:text-foreground"
        >
          <Lock className="size-3.5" /> Admin Login
        </Link>
      </div>
    </footer>
  );
}
