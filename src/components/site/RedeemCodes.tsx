import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Copy, Gift, Timer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { redeemCodesQuery, type RedeemCode } from "@/lib/cms";
import { SectionHeading } from "./SectionHeading";

function useCountdown(target: string) {
  const calc = () => Math.max(0, new Date(target).getTime() - Date.now());
  const [ms, setMs] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setMs(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return { text: `${pad(h)}:${pad(m)}:${pad(sec)}`, expired: ms <= 0 };
}

function CodeCard({ item }: { item: RedeemCode }) {
  const { text, expired } = useCountdown(item.expires_at);
  const copy = async () => {
    await navigator.clipboard.writeText(item.code);
    toast.success("Kode disalin!", { description: item.code });
  };
  if (expired) return null;
  return (
    <div className="card-glass group relative overflow-hidden rounded-2xl p-5 transition-shadow hover:shadow-ember">
      <div className="absolute -right-6 -top-6 size-24 rounded-full bg-ember/10 blur-2xl" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-ember">
          <Gift className="size-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Redeem Code</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 font-mono text-xs text-foreground">
          <Timer className="size-3.5 text-diamond" />
          {text}
        </span>
      </div>
      <p className="mt-4 font-mono text-2xl font-bold tracking-widest text-diamond">{item.code}</p>
      <p className="mt-2 text-sm text-muted-foreground">{item.reward}</p>
      <Button variant="outline-ember" size="sm" className="mt-4 w-full" onClick={copy}>
        <Copy /> Copy Code
      </Button>
    </div>
  );
}

export function RedeemCodes() {
  const { data, isLoading } = useQuery(redeemCodesQuery());
  return (
    <section id="redeem" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Hadiah Gratis"
        title="Kode Redeem Aktif"
        desc="Ketik /redeem <kode> di dalam game sebelum waktunya habis. Setiap kode berlaku 24 jam."
      />
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="card-glass h-44 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((c) => (
            <CodeCard key={c.id} item={c} />
          ))}
        </div>
      ) : (
        <div className="card-glass flex flex-col items-center rounded-2xl py-12 text-center">
          <Gift className="size-10 text-muted-foreground" />
          <p className="mt-3 font-semibold">Belum ada kode aktif</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Pantau grup WA untuk kode redeem berikutnya!
          </p>
        </div>
      )}
    </section>
  );
}
