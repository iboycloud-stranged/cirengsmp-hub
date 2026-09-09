import { useQuery } from "@tanstack/react-query";
import { Coins, Crown, Heart } from "lucide-react";
import { formatAmount, leaderboardEnabledQuery, leaderboardQuery, type LeaderboardEntry } from "@/lib/cms";
import { cn } from "@/lib/utils";
import { PlayerAvatar } from "./PlayerAvatar";
import { SectionHeading } from "./SectionHeading";

const MEDAL = [
  "bg-[#f5c542]/15 text-[#f5c542] border-[#f5c542]/40",
  "bg-[#cbd5e1]/15 text-[#cbd5e1] border-[#cbd5e1]/40",
  "bg-[#d08b52]/15 text-[#d08b52] border-[#d08b52]/40",
];

function Board({
  title,
  subtitle,
  icon,
  prefix,
  rows,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  prefix: string;
  rows: LeaderboardEntry[];
}) {
  return (
    <div className="card-glass rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {rows.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Belum ada data</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((r, i) => (
            <li
              key={r.id}
              className="flex items-center gap-3 rounded-xl bg-background/50 px-3 py-2.5"
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                  i < 3 ? MEDAL[i] : "border-border bg-secondary text-muted-foreground",
                )}
              >
                {r.rank}
              </span>
              <PlayerAvatar name={r.player_name} size={30} />
              <span className="truncate font-semibold">{r.player_name}</span>
              <span className="ml-auto shrink-0 font-mono text-sm text-diamond">
                {prefix}
                {formatAmount(Number(r.amount))}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Leaderboard() {
  const { data: enabled } = useQuery(leaderboardEnabledQuery());
  const { data } = useQuery(leaderboardQuery());

  if (!enabled) return null;

  const money = (data ?? []).filter((d) => d.category === "top_money" && d.is_active_toggle);
  const donation = (data ?? []).filter((d) => d.category === "top_donation" && d.is_active_toggle);

  return (
    <section id="leaderboard" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Papan Peringkat"
        title="Leaderboard Warga"
        desc="Warga ter-kaya dan supporter paling royal di CirengSMP."
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Board
          title="Top Money"
          subtitle="Warga Ter-Kaya"
          icon={<Coins className="size-6 text-ember" />}
          prefix="$"
          rows={money}
        />
        <Board
          title="Top Donasi"
          subtitle="Top Supporter"
          icon={<Heart className="size-6 text-ember" />}
          prefix="Rp "
          rows={donation}
        />
      </div>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Crown className="size-3.5 text-[#f5c542]" /> Diperbarui manual oleh admin
      </p>
    </section>
  );
}
