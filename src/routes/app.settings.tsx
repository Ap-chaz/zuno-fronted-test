import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Lock, CreditCard, Eye, Moon, Globe, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { TopBar } from "@/components/zuno/TopBar";
import { useTheme } from "@/components/zuno/ThemeToggle";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — ZUNO" }] }),
  component: () => <SettingsPage backTo="/app/account" />,
});

export function SettingsPage({ backTo = "/app/account" }: { backTo?: string }) {
  const { theme, toggle } = useTheme();
  const [biometric, setBiometric] = useState(true);
  const [hideBalances, setHideBalances] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);

  const comingSoon = (label: string) => toast.info(`${label} is coming soon.`);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar title="Settings" back={backTo} />
      <div className="px-5 pt-4 pb-8 space-y-6">
        <Section title="Security">
          <Toggle icon={Lock} label="Biometric login" on={biometric} onChange={() => setBiometric((v) => !v)} />
          <Toggle icon={Eye} label="Hide balances" on={hideBalances} onChange={() => setHideBalances((v) => !v)} />
          <Row icon={Lock} label="Change password" as={Link} to="/auth/forgot" />
          <Row icon={Lock} label="Two-factor authentication" badge="On" onClick={() => comingSoon("Two-factor authentication settings")} />
        </Section>

        <Section title="Payments">
          <Row icon={CreditCard} label="M-PESA · +254 714 637 437" badge="Default" onClick={() => comingSoon("Managing payment methods")} />
          <Row icon={CreditCard} label="Visa ending 4321" onClick={() => comingSoon("Managing payment methods")} />
          <Row icon={CreditCard} label="Add new method" onClick={() => comingSoon("Adding a payment method")} />
        </Section>

        <Section title="Preferences">
          <Toggle icon={Bell} label="Push notifications" on={pushNotifs} onChange={() => setPushNotifs((v) => !v)} />
          <Toggle icon={Moon} label="Dark mode" on={theme === "dark"} onChange={toggle} />
          <Row icon={Globe} label="Language" badge="English" onClick={() => comingSoon("More languages")} />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <ul className="divide-y divide-border/40 overflow-hidden rounded-2xl border border-border/40 bg-surface">{children}</ul>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  badge,
  onClick,
  as: Comp = "button",
  to,
}: {
  icon: typeof Lock;
  label: string;
  badge?: string;
  onClick?: () => void;
  as?: typeof Link | "button";
  to?: string;
}) {
  const content = (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 text-left text-sm font-medium">{label}</span>
      {badge && <span className="rounded-full border border-border/60 bg-surface-2 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">{badge}</span>}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </>
  );
  return (
    <li>
      {Comp === Link && to ? (
        <Link to={to} className="flex w-full items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-2">
          {content}
        </Link>
      ) : (
        <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-2">
          {content}
        </button>
      )}
    </li>
  );
}

function Toggle({ icon: Icon, label, on, onChange }: { icon: typeof Lock; label: string; on?: boolean; onChange?: () => void }) {
  return (
    <li className="flex items-center gap-3 px-4 py-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 text-sm font-medium">{label}</span>
      <button
        type="button"
        onClick={onChange}
        role="switch"
        aria-checked={on}
        aria-label={label}
        className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${on ? "bg-gold" : "bg-muted"}`}
      >
        <span className={`h-5 w-5 rounded-full bg-surface shadow transition-transform ${on ? "translate-x-5" : ""}`} />
      </button>
    </li>
  );
}
