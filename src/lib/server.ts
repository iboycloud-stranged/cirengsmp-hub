export const SERVER_HOST = "cirengsmp.servegame.com";
export const SERVER_PORT = 2042;
export const SERVER_ADDRESS = `${SERVER_HOST}:${SERVER_PORT}`;
export const JOIN_URL = `minecraft://?addExternalServer=CirengSMP|${SERVER_ADDRESS}`;
export const WHATSAPP_URL = "https://chat.whatsapp.com/DglW4TCscjS1pCU3zmFwgl";
export const SOCIABUZZ_URL = "https://sociabuzz.com/masvabyystore/tribe";
export const SOCIABUZZ_GOAL_IFRAME = "https://sociabuzz.com/pro/tribe/total1/v1/2346410023";
export const SOCIABUZZ_ALERT_IFRAME =
  "https://sociabuzz.com/pro/tribe/alert1/v3/2346410023?colorName=%2300ff00+&alphaName=1&colorNote=%23ffff00&alphaNote=1&colorFrom=%23ffffff&alphaFrom=1&gifActive=1&maxDuration=12&font=Open%2BSans%3A800";

export type ServerStatus = {
  online: boolean;
  players: { online: number; max: number; list: string[] };
  version?: string;
  motd?: string;
};

export const avatarUrl = (name: string, size = 20) =>
  `https://mc-heads.net/avatar/${encodeURIComponent(name)}/${size}`;

export const FALLBACK_AVATAR = "https://mc-heads.net/avatar/MHF_Steve/64";

export async function fetchServerStatus(): Promise<ServerStatus> {
  const res = await fetch(`https://api.mcsrvstat.us/bedrock/2/${SERVER_ADDRESS}`);
  if (!res.ok) throw new Error("Status API error");
  const data = await res.json();
  const raw: unknown[] = Array.isArray(data.players?.list) ? data.players.list : [];
  const list = raw
    .map((p) => (typeof p === "string" ? p : ((p as { name?: string })?.name ?? "")))
    .filter((n): n is string => Boolean(n));
  return {
    online: Boolean(data.online),
    players: { online: data.players?.online ?? 0, max: data.players?.max ?? 0, list },
    version: data.version,
    motd: data.motd?.clean?.[0],
  };
}
