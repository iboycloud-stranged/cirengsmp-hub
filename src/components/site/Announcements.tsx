import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Megaphone } from "lucide-react";
import { announcementsQuery, formatDate } from "@/lib/cms";
import { SectionHeading } from "./SectionHeading";

export function Announcements() {
  const { data, isLoading } = useQuery(announcementsQuery());
  return (
    <section id="announcements" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Berita Server"
        title="Pengumuman"
        desc="Update terbaru seputar event, maintenance, dan fitur baru di CirengSMP."
      />
      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="card-glass h-56 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {data.map((a) => (
            <article key={a.id} className="card-glass overflow-hidden rounded-2xl">
              {a.image_url && (
                <img
                  src={a.image_url}
                  alt={a.title}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
              )}
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  {formatDate(a.created_at)}
                </div>
                <h3 className="mt-2 text-xl font-bold">{a.title}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {a.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="card-glass flex flex-col items-center rounded-2xl py-12 text-center">
          <Megaphone className="size-10 text-muted-foreground" />
          <p className="mt-3 font-semibold">Belum ada pengumuman</p>
        </div>
      )}
    </section>
  );
}
