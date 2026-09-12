import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Announcements } from "@/components/site/Announcements";
import { RedeemCodes } from "@/components/site/RedeemCodes";
import { InfoSection } from "@/components/site/InfoSection";
import { Leaderboard } from "@/components/site/Leaderboard";
import { DonationAlertOverlay, Support } from "@/components/site/Support";
import { Footer } from "@/components/site/Footer";

const TITLE = "CirengSMP — Server Minecraft Bedrock Indonesia";
const DESC =
  "CirengSMP: server Minecraft Bedrock Indonesia. Survival, seru & ramah warga. Join sekarang di cirengsmp.servegame.com:2042, cek kode redeem dan pengumuman terbaru.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Announcements />
        <RedeemCodes />
        <Leaderboard />
        <Support />
        <InfoSection />
      </main>
      <Footer />
      <DonationAlertOverlay />
    </div>
  );
}
