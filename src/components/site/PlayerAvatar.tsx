import { FALLBACK_AVATAR, avatarUrl } from "@/lib/server";
import { cn } from "@/lib/utils";

export function PlayerAvatar({
  name,
  size = 20,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={avatarUrl(name, size)}
      alt={`Skin ${name}`}
      width={size}
      height={size}
      loading="lazy"
      onError={(e) => {
        const img = e.currentTarget;
        if (img.src !== FALLBACK_AVATAR) img.src = FALLBACK_AVATAR;
      }}
      style={{ width: size, height: size }}
      className={cn("shrink-0 rounded-[4px] [image-rendering:pixelated]", className)}
    />
  );
}
