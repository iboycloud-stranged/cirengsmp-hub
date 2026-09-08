import { BookOpen, HelpCircle, ShieldCheck, Smartphone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SERVER_ADDRESS, SERVER_HOST, SERVER_PORT } from "@/lib/server";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  {
    title: "Buka Minecraft Bedrock",
    desc: "Berjalan di Android, iOS, dan Windows 10/11. Pastikan versi Minecraft kamu sudah terbaru.",
  },
  {
    title: "Masuk ke menu Servers",
    desc: 'Pilih "Play" lalu buka tab "Servers". Scroll ke bawah dan klik tombol "Add Server".',
  },
  {
    title: "Isi alamat server",
    desc: `Server Name: CirengSMP • Server Address: ${SERVER_HOST} • Port: ${SERVER_PORT}`,
  },
  {
    title: "Save & Join!",
    desc: "Klik Save, lalu pilih CirengSMP dari daftar server dan tekan Join Server. Selamat bermain!",
  },
];

const RULES = [
  {
    q: "1. Dilarang Griefing & Mencuri",
    a: "Jangan merusak, membakar, atau mengambil barang dari bangunan / chest pemain lain tanpa izin. Pelanggaran berujung ban permanen.",
  },
  {
    q: "2. Dilarang Cheat, Hack & X-Ray",
    a: "Segala bentuk client modifikasi yang memberi keuntungan tidak adil (hack client, x-ray texture pack, auto-clicker) dilarang keras.",
  },
  {
    q: "3. Hormati Sesama Pemain",
    a: "Tidak ada toxic, SARA, spam, atau pelecehan di chat maupun voice. Kita di sini untuk bersenang-senang bersama.",
  },
  {
    q: "4. Dilarang PvP Tanpa Persetujuan",
    a: "Bunuh pemain lain hanya jika kedua pihak setuju (duel/event). Spawn-kill dan kill-trap dilarang.",
  },
  {
    q: "5. Jaga Jarak Bangunan & Jangan Merusak Alam",
    a: "Bangun minimal 100 blok dari base pemain lain, jangan tinggalkan pohon setengah tebang, dan jangan buat lava-cast / redstone lag machine.",
  },
];

const FAQ = [
  {
    q: "Server online 24 jam?",
    a: "Ya, CirengSMP berjalan 24/7. Sesekali ada maintenance singkat yang akan diumumkan lebih dulu di grup WA dan halaman Pengumuman.",
  },
  {
    q: "Versi Minecraft berapa yang didukung?",
    a: "Server mengikuti versi Bedrock Edition terbaru. Pemain Android, iOS, Windows, dan console (via add server) bisa bergabung. Java Edition segera menyusul.",
  },
  {
    q: "Mode permainannya apa?",
    a: "Survival SMP dengan ekonomi sederhana, proteksi claim tanah, dan event mingguan. Fokusnya bermain santai bareng warga yang ramah.",
  },
  {
    q: "Gimana cara pakai kode redeem?",
    a: "Masuk ke server lalu ketik /redeem <kode> di chat. Kode hanya berlaku 24 jam sejak dirilis, jadi cepat klaim!",
  },
  {
    q: "Apa yang harus dilakukan kalau tidak bisa connect?",
    a: `Cek koneksi internet, pastikan alamat ${SERVER_ADDRESS} benar, dan versi game sudah update. Kalau masih gagal, tanya di grup WA.`,
  },
];

export function InfoSection() {
  return (
    <section id="info" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Panduan"
        title="Info, Aturan & FAQ"
        desc="Semua yang perlu kamu tahu sebelum jadi warga CirengSMP."
      />

      <div className="mb-10">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-bold">
          <Smartphone className="size-5 text-diamond" /> Cara Join (Bedrock)
        </h3>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card-glass relative rounded-2xl p-5">
              <span className="font-display flex size-9 items-center justify-center rounded-lg bg-ember text-lg font-bold text-ember-foreground shadow-ember">
                {i + 1}
              </span>
              <p className="mt-3 font-semibold">{s.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="card-glass rounded-2xl p-5 sm:p-6">
          <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
            <ShieldCheck className="size-5 text-emerald" /> Aturan Server
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {RULES.map((r, i) => (
              <AccordionItem key={i} value={`rule-${i}`}>
                <AccordionTrigger className="text-left">{r.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{r.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="card-glass rounded-2xl p-5 sm:p-6">
          <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
            <HelpCircle className="size-5 text-diamond" /> FAQ
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <BookOpen className="size-3.5" /> Aturan dapat berubah sewaktu-waktu. Cek Pengumuman secara berkala.
      </p>
    </section>
  );
}
