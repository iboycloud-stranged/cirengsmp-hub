import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SOCIABUZZ_ALERT_IFRAME, SOCIABUZZ_GOAL_IFRAME, SOCIABUZZ_URL } from "@/lib/server";
import { SectionHeading } from "./SectionHeading";

export function Support() {
  return (
    <section id="support" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="SociaBuzz"
        title="Dukung CirengSMP"
        desc="Donasi kamu membantu biaya hosting server, event, dan hadiah untuk warga. Setiap donasi memicu alert suara & GIF secara live!"
      />
      <div className="card-glass mx-auto max-w-2xl rounded-2xl p-5 sm:p-6">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Milestone Donasi
        </p>
        <div className="overflow-hidden rounded-xl bg-background/60">
          <iframe
            src={SOCIABUZZ_GOAL_IFRAME}
            width="100%"
            height="150"
            frameBorder="0"
            scrolling="no"
            title="Milestone donasi CirengSMP"
            loading="lazy"
          />
        </div>
        <Button variant="ember" size="xl" className="mt-5 w-full" asChild>
          <a href={SOCIABUZZ_URL} target="_blank" rel="noopener noreferrer">
            <Heart className="size-5!" /> Donasi via SociaBuzz
          </a>
        </Button>
      </div>
    </section>
  );
}

export function DonationAlertOverlay() {
  return (
    <iframe
      src={SOCIABUZZ_ALERT_IFRAME}
      allow="autoplay"
      frameBorder="0"
      title="Live donation alert"
      className="pointer-events-none fixed bottom-0 right-0 z-[9999] h-[300px] w-[300px] max-w-[80vw]"
    />
  );
}
