import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";
import { PhoneFrame } from "@/components/zuno/PhoneFrame";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — ZUNO" }] }),
  component: () => <PrivacyPage backTo="/" />,
});

export function PrivacyPage({ backTo = "/" }: { backTo?: string }) {
  return (
    <PhoneFrame>
      <TopBar title="Privacy Policy" back={backTo} />
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-8">
        <div className="rounded-3xl border border-border/40 bg-gradient-card p-5 shadow-card">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-3 text-xl font-bold leading-tight">Privacy Policy</h1>
          <p className="mt-1.5 text-xs text-muted-foreground">Last updated: July 2026</p>
        </div>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <Section title="1. What we collect">
            To provide escrow protection, ZUNO collects: your name, phone number, and email;
            identity verification documents (ID, selfie); for sellers, business details (category,
            registration number, KRA PIN, payout account); and transaction records (amounts,
            counterparties, timestamps, and any dispute evidence you submit).
          </Section>

          <Section title="2. Why we collect it">
            We use this data to verify who you are, protect both sides of a transaction, process
            payouts, resolve disputes fairly, and meet our legal obligations under Kenyan financial
            regulations.
          </Section>

          <Section title="3. Who we share it with">
            We share the minimum necessary data with: payment processors (M-Pesa, banks) to move
            funds; identity verification providers to confirm documents are genuine; and regulators
            or law enforcement where legally required. We do not sell your personal data to
            advertisers.
          </Section>

          <Section title="4. Data retention">
            We keep transaction and verification records for as long as your account is active,
            and for a period afterward as required by financial recordkeeping regulations. You can
            request deletion of non-essential personal data at any time.
          </Section>

          <Section title="5. Your rights">
            You can request a copy of the personal data we hold about you, ask us to correct
            inaccurate details, or request account deletion, subject to the retention requirements
            above (e.g. we may need to keep records of a completed transaction even after a
            deletion request).
          </Section>

          <Section title="6. Security">
            Identity documents and payout details are encrypted in transit and at rest. Access to
            verification data is limited to the systems and staff that need it to review
            submissions or resolve disputes.
          </Section>

          <Section title="7. Changes to this policy">
            If we materially change how we collect or use your data, we'll notify you in-app before
            the change takes effect.
          </Section>

          <Section title="8. Contact">
            Questions about this policy can be sent through the Help & Support section in your
            account settings.
          </Section>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-1.5 text-sm font-bold text-foreground">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
