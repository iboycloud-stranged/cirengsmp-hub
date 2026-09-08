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
