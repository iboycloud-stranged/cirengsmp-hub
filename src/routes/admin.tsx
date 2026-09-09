import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Home, LogOut, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/cirengsmp-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerAvatar } from "@/components/site/PlayerAvatar";
import { supabase } from "@/integrations/supabase/client";
import {
  announcementsQuery,
  formatAmount,
  formatDate,
  leaderboardEnabledQuery,
  leaderboardQuery,
  redeemCodesQuery,
} from "@/lib/cms";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Dashboard Admin — CirengSMP" },
      { name: "description", content: "Kelola kode redeem, pengumuman, dan leaderboard CirengSMP." },
      { property: "og:title", content: "Dashboard Admin — CirengSMP" },
      {
        property: "og:description",
        content: "Kelola kode redeem, pengumuman, dan leaderboard CirengSMP.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<"loading" | "admin" | "denied">("loading");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate({ to: "/auth", replace: true });
        return;
      }
      let { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: data.user.id,
        _role: "admin",
      });
      if (!isAdmin) {
        const { data: claimed } = await supabase.rpc("claim_first_admin");
        isAdmin = Boolean(claimed);
      }
      if (active) setState(isAdmin ? "admin" : "denied");
    })();
    return () => {
      active = false;
    };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Memuat dashboard...
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-xl font-bold">Akses ditolak</p>
        <p className="text-sm text-muted-foreground">
          Akun ini bukan admin CirengSMP.
        </p>
        <Button variant="outline-ember" onClick={signOut}>
          <LogOut /> Keluar
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo.url} alt="CirengSMP" width={44} height={44} className="size-11 rounded-xl" />
          <h1 className="font-display text-2xl font-bold text-gradient-brand">Dashboard Admin</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline-ember" size="sm" asChild>
            <Link to="/">
              <Home /> Situs
            </Link>
          </Button>
          <Button variant="outline-ember" size="sm" onClick={signOut}>
            <LogOut /> Keluar
          </Button>
        </div>
      </header>

      <Tabs defaultValue="redeem">
        <TabsList className="mb-6">
          <TabsTrigger value="redeem">Redeem Codes</TabsTrigger>
          <TabsTrigger value="news">Pengumuman</TabsTrigger>
          <TabsTrigger value="board">Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="redeem">
          <RedeemTab />
        </TabsContent>
        <TabsContent value="news">
          <NewsTab />
        </TabsContent>
        <TabsContent value="board">
          <BoardTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function useInvalidate(keys: string[]) {
  const qc = useQueryClient();
  return () => keys.forEach((k) => qc.invalidateQueries({ queryKey: [k] }));
}

function RedeemTab() {
  const { data, isLoading } = useQuery(redeemCodesQuery());
  const invalidate = useInvalidate(["redeem_codes"]);
  const [code, setCode] = useState("");
  const [reward, setReward] = useState("");

  const add = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("redeem_codes").insert({
        code: code.trim().toUpperCase(),
        reward: reward.trim(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setCode("");
      setReward("");
      invalidate();
      toast.success("Kode ditambahkan (berlaku 24 jam)");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("redeem_codes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast.success("Kode dihapus");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <form
        className="card-glass grid gap-4 rounded-2xl p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          if (!code.trim() || !reward.trim()) return toast.error("Lengkapi kode dan hadiah");
          add.mutate();
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="code">Kode</Label>
          <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="CIRENG2026" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reward">Hadiah</Label>
          <Input id="reward" value={reward} onChange={(e) => setReward(e.target.value)} placeholder="5x Diamond" />
        </div>
        <Button type="submit" variant="ember" disabled={add.isPending}>
          <Plus /> Tambah
        </Button>
      </form>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Memuat...</p>
      ) : (
        <div className="space-y-2">
          {(data ?? []).map((c) => (
            <div key={c.id} className="card-glass flex items-center gap-3 rounded-xl p-4">
              <span className="font-mono font-bold text-diamond">{c.code}</span>
              <span className="truncate text-sm text-muted-foreground">{c.reward}</span>
              <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                Sampai {new Date(c.expires_at).toLocaleString("id-ID")}
              </span>
              <Button size="sm" variant="ghost" onClick={() => remove.mutate(c.id)}>
                <Trash2 className="text-destructive" />
              </Button>
            </div>
          ))}
          {(data ?? []).length === 0 && (
            <p className="text-sm text-muted-foreground">Belum ada kode aktif.</p>
          )}
        </div>
      )}
    </div>
  );
}

function NewsTab() {
  const { data, isLoading } = useQuery(announcementsQuery());
  const invalidate = useInvalidate(["announcements"]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const add = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("announcements").insert({
        title: title.trim(),
        content: content.trim(),
        image_url: imageUrl.trim() || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setTitle("");
      setContent("");
      setImageUrl("");
      invalidate();
      toast.success("Pengumuman diterbitkan");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("announcements").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast.success("Pengumuman dihapus");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <form
        className="card-glass space-y-4 rounded-2xl p-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim() || !content.trim()) return toast.error("Judul dan isi wajib diisi");
          add.mutate();
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="title">Judul</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="content">Isi</Label>
          <Textarea id="content" rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="img">URL Gambar (opsional)</Label>
          <Input id="img" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
        </div>
        <Button type="submit" variant="ember" disabled={add.isPending}>
          <Plus /> Terbitkan
        </Button>
      </form>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Memuat...</p>
      ) : (
        <div className="space-y-2">
          {(data ?? []).map((a) => (
            <div key={a.id} className="card-glass flex items-center gap-3 rounded-xl p-4">
              <div className="min-w-0">
                <p className="truncate font-semibold">{a.title}</p>
                <p className="text-xs text-muted-foreground">{formatDate(a.created_at)}</p>
              </div>
              <Button size="sm" variant="ghost" className="ml-auto" onClick={() => remove.mutate(a.id)}>
                <Trash2 className="text-destructive" />
              </Button>
            </div>
          ))}
          {(data ?? []).length === 0 && (
            <p className="text-sm text-muted-foreground">Belum ada pengumuman.</p>
          )}
        </div>
      )}
    </div>
  );
}

function BoardTab() {
  const { data } = useQuery(leaderboardQuery());
  const { data: enabled } = useQuery(leaderboardEnabledQuery());
  const invalidate = useInvalidate(["leaderboards", "site_settings"]);
  const [category, setCategory] = useState<"top_money" | "top_donation">("top_money");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [rank, setRank] = useState("1");

  const toggle = useMutation({
    mutationFn: async (value: boolean) => {
      const { error } = await supabase
        .from("site_settings")
        .update({ value })
        .eq("key", "leaderboard_enabled");
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast.success("Visibilitas leaderboard diperbarui");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("leaderboards").insert({
        category,
        player_name: name.trim(),
        amount: Number(amount) || 0,
        rank: Number(rank) || 1,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setName("");
      setAmount("");
      invalidate();
      toast.success("Entri ditambahkan");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: async (row: { id: string; player_name: string; amount: number; rank: number }) => {
      const { error } = await supabase
        .from("leaderboards")
        .update({ player_name: row.player_name, amount: row.amount, rank: row.rank })
        .eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast.success("Entri diperbarui");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("leaderboards").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast.success("Entri dihapus");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const rows = (data ?? []).filter((r) => r.category === category);

  return (
    <div className="space-y-6">
      <div className="card-glass flex items-center justify-between gap-4 rounded-2xl p-5">
        <div>
          <p className="font-semibold">Tampilkan Leaderboard di Homepage</p>
          <p className="text-xs text-muted-foreground">
            Saat dimatikan, bagian leaderboard disembunyikan dari pengunjung.
          </p>
        </div>
        <Switch checked={Boolean(enabled)} onCheckedChange={(v) => toggle.mutate(v)} />
      </div>

      <div className="flex gap-2">
        {(
          [
            ["top_money", "Top Money"],
            ["top_donation", "Top Donasi"],
          ] as const
        ).map(([key, label]) => (
          <Button
            key={key}
            size="sm"
            variant={category === key ? "ember" : "outline-ember"}
            onClick={() => setCategory(key)}
          >
            {label}
          </Button>
        ))}
      </div>

      <form
        className="card-glass grid gap-4 rounded-2xl p-5 sm:grid-cols-[1fr_1fr_100px_auto] sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return toast.error("Isi nickname pemain");
          save.mutate();
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="pname">Nickname</Label>
          <Input id="pname" value={name} onChange={(e) => setName(e.target.value)} placeholder="Notch" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pamount">Jumlah</Label>
          <Input
            id="pamount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100000"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="prank">Rank</Label>
          <Input id="prank" type="number" min={1} value={rank} onChange={(e) => setRank(e.target.value)} />
        </div>
        <Button type="submit" variant="ember" disabled={save.isPending}>
          <Plus /> Tambah
        </Button>
      </form>

      <div className="space-y-2">
        {rows.map((r) => (
          <EntryRow
            key={r.id}
            id={r.id}
            playerName={r.player_name}
            amount={Number(r.amount)}
            rank={r.rank}
            onSave={(row) => update.mutate(row)}
            onDelete={() => remove.mutate(r.id)}
          />
        ))}
        {rows.length === 0 && <p className="text-sm text-muted-foreground">Belum ada entri.</p>}
      </div>
    </div>
  );
}

function EntryRow({
  id,
  playerName,
  amount,
  rank,
  onSave,
  onDelete,
}: {
  id: string;
  playerName: string;
  amount: number;
  rank: number;
  onSave: (row: { id: string; player_name: string; amount: number; rank: number }) => void;
  onDelete: () => void;
}) {
  const [n, setN] = useState(playerName);
  const [a, setA] = useState(String(amount));
  const [r, setR] = useState(String(rank));
  const dirty = n !== playerName || Number(a) !== amount || Number(r) !== rank;

  return (
    <div className="card-glass flex flex-wrap items-center gap-3 rounded-xl p-3">
      <PlayerAvatar name={n || playerName} size={30} />
      <Input className="w-40" value={n} onChange={(e) => setN(e.target.value)} />
      <Input className="w-32" type="number" value={a} onChange={(e) => setA(e.target.value)} />
      <Input className="w-20" type="number" min={1} value={r} onChange={(e) => setR(e.target.value)} />
      <span className="hidden text-xs text-muted-foreground sm:inline">{formatAmount(amount)}</span>
      <div className="ml-auto flex gap-2">
        <Button
          size="sm"
          variant="outline-ember"
          disabled={!dirty}
          onClick={() => onSave({ id, player_name: n.trim(), amount: Number(a) || 0, rank: Number(r) || 1 })}
        >
          Simpan
        </Button>
        <Button size="sm" variant="ghost" onClick={onDelete}>
          <Trash2 className="text-destructive" />
        </Button>
      </div>
    </div>
  );
}
