import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Users, Globe, Award, ArrowRight } from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";
import { PhoneFrame } from "@/components/zuno/PhoneFrame";
import { Logo } from "@/components/zuno/Logo";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — ZUNO" }, { name: "description", content: "Why ZUNO exists — building trust in online payments across Africa." }] }),
  component: About,
});

function About() {
  return (
    <PhoneFrame>
      <TopBar title="About ZUNO" back="/app/account" />
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-8">
        <div className="overflow-hidden rounded-3xl border border-border/40 bg-gradient-card p-6 text-center shadow-card">
          <div className="mx-auto"><Logo size={40} /></div>
          <p className="mt-4 text-xs font-bold tracking-[0.18em] text-muted-foreground">OUR MISSION</p>
          <h1 className="mt-2 text-2xl font-bold leading-snug">
            Make online payments <span className="text-gold">trustworthy</span> for every African.
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Too many buyers get scammed. Too many sellers get cheated. ZUNO is the neutral layer of trust between them.
          </p>
        </div>

        <p className="mt-6 px-1 text-xs font-bold tracking-[0.18em] text-muted-foreground">WHY TRUST ZUNO</p>
        <ul className="mt-3 space-y-3">
          <Tile icon={Shield} title="Regulated escrow" desc="Funds held in licensed partner banks with full audit trail." />
          <Tile icon={Users} title="KYC-verified sellers" desc="National ID + business checks before any seller goes live." />
          <Tile icon={Award} title="Buyer protection guarantee" desc="100% refund if seller fails to deliver. No fine print." />
          <Tile icon={Globe} title="Local rails, global standards" desc="M-PESA, cards, wallets — ISO 27001-aligned security." />
        </ul>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <KPI v="80k+" l="Users" />
          <KPI v="2.4B" l="KES protected" />
          <KPI v="<24h" l="Disputes" />
        </div>

        <Link to="/auth/signup" className="mt-8 flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-gold text-base font-semibold text-gold-foreground shadow-gold">
          Join ZUNO <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </PhoneFrame>
  );
}

function Tile({ icon: Icon, title, desc }: { icon: typeof Shield; title: string; desc: string }) {
  return (
    <li className="grid grid-cols-[auto_1fr] items-start gap-3 rounded-2xl border border-border/40 bg-surface p-4">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gold/15 text-gold"><Icon className="h-4 w-4" /></span>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </li>
  );
}

function KPI({ v, l }: { v: string; l: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-surface p-3">
      <p className="text-base font-bold text-gold">{v}</p>
      <p className="text-[10px] text-muted-foreground">{l}</p>
    </div>
  );
}
