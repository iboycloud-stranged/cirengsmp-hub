import { useQuery } from "@tanstack/react-query";
import { Copy, Gamepad2, MessageCircle, Users } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/cirengsmp-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { PlatformBadges } from "./Header";
import { JOIN_URL, SERVER_ADDRESS, WHATSAPP_URL, fetchServerStatus } from "@/lib/server";
import { cn } from "@/lib/utils";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 53) % 100}%`,
  delay: `${(i * 0.7) % 7}s`,
  duration: `${6 + ((i * 1.3) % 4)}s`,
  drift: `${((i % 5) - 2) * 25}px`,
  size: 4 + (i % 3) * 2,
}));

function StatusPill() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["server-status"],
    queryFn: fetchServerStatus,
    refetchInterval: 60_000,
    retry: 1,
  });

  const online = data?.online ?? false;
  const label = isLoading
    ? "Mengecek status server..."
    : isError || !data
      ? "Status tidak tersedia"
      : online
        ? `Online • ${data.players.online}/${data.players.max} Players`
        : "Offline";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-semibold",
        online
          ? "border-emerald/40 bg-emerald/10 text-emerald"
          : "border-border bg-secondary text-muted-foreground",
      )}
    >
      <span className="relative flex size-2.5">
        {online && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald opacity-75" />
        )}
        <span
          className={cn(
            "relative inline-flex size-2.5 rounded-full",
            online ? "bg-emerald" : "bg-muted-foreground",
          )}
        />
      </span>
      <Users className="size-4" />
      {label}
    </div>
  );
}

export function Hero() {
  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_ADDRESS);
      toast.success("IP & Port disalin!", { description: SERVER_ADDRESS });
    } catch {
      toast.error("Gagal menyalin, salin manual: " + SERVER_ADDRESS);
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="pixel-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="ember-particle"
            style={
              {
                left: p.left,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
                "--drift": p.drift,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 -z-10 animate-glow-pulse rounded-full bg-[radial-gradient(circle,var(--ember-glow)_0%,transparent_65%)] blur-2xl" />
          <img
            src={logo.url}
            alt="Maskot CirengSMP - cireng memakai helm diamond dan pedang"
            width={320}
            height={320}
            fetchPriority="high"
            className="size-56 animate-float rounded-3xl object-cover drop-shadow-[0_0_40px_var(--ember-glow)] sm:size-72 md:size-80"
          />
        </div>

        <PlatformBadges className="mb-5 justify-center md:hidden" />

        <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Welcome to <span className="text-gradient-brand">CirengSMP</span>
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Server Minecraft Indonesia - Survival, Seru &amp; Ramah Warga!
        </p>

        <div className="mt-6">
          <StatusPill />
        </div>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button variant="ember" size="xl" asChild>
            <a href={JOIN_URL}>
              <Gamepad2 className="size-5!" />
              Buka Minecraft &amp; Join
            </a>
          </Button>
          <Button variant="diamond" size="xl" onClick={copyIp}>
            <Copy className="size-5!" />
            Copy IP &amp; Port
          </Button>
          <Button variant="whatsapp" size="xl" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-5!" />
              Grup WA
            </a>
          </Button>
        </div>

        <p className="mt-4 font-mono text-sm text-muted-foreground">{SERVER_ADDRESS}</p>
      </div>
    </section>
  );
}
