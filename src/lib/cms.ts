import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type RedeemCode = {
  id: string;
  code: string;
  reward: string;
  expires_at: string;
  created_at: string;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

export const redeemCodesQuery = () =>
  queryOptions({
    queryKey: ["redeem_codes"],
    queryFn: async (): Promise<RedeemCode[]> => {
      const { data, error } = await supabase
        .from("redeem_codes")
        .select("*")
        .gt("expires_at", new Date().toISOString())
        .order("expires_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    refetchInterval: 60_000,
  });

export const announcementsQuery = () =>
  queryOptions({
    queryKey: ["announcements"],
    queryFn: async (): Promise<Announcement[]> => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export type LeaderboardEntry = {
  id: string;
  category: "top_money" | "top_donation";
  player_name: string;
  amount: number;
  rank: number;
  is_active_toggle: boolean;
  created_at: string;
  updated_at: string;
};

export const leaderboardQuery = () =>
  queryOptions({
    queryKey: ["leaderboards"],
    queryFn: async (): Promise<LeaderboardEntry[]> => {
      const { data, error } = await supabase
        .from("leaderboards")
        .select("*")
        .order("rank", { ascending: true });
      if (error) throw error;
      return (data ?? []) as LeaderboardEntry[];
    },
  });

export const leaderboardEnabledQuery = () =>
  queryOptions({
    queryKey: ["site_settings", "leaderboard_enabled"],
    queryFn: async (): Promise<boolean> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "leaderboard_enabled")
        .maybeSingle();
      if (error) throw error;
      return Boolean(data?.value);
    },
  });

export function formatAmount(n: number) {
  return new Intl.NumberFormat("id-ID").format(n);
}
