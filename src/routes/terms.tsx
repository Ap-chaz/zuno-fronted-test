import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { TopBar } from "@/components/zuno/TopBar";
import { PhoneFrame } from "@/components/zuno/PhoneFrame";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — ZUNO" }] }),
  component: () => <TermsPage backTo="/" />,
});

export function TermsPage({ backTo = "/" }: { backTo?: string }) {
  return (
    <PhoneFrame>
      <TopBar title="Terms & Conditions" back={backTo} />
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-8">
        <div className="rounded-3xl border border-border/40 bg-gradient-card p-5 shadow-card">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold">
            <FileText className="h-6 w-6" />
          </div>
          <h1 className="mt-3 text-xl font-bold leading-tight">Terms & Conditions</h1>
          <p className="mt-1.5 text-xs text-muted-foreground">Last updated: July 2026</p>
        </div>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <Section title="1. Acceptance of terms">
            By creating an account or using ZUNO, you agree to these Terms and our Privacy Policy.
            If you don't agree, please don't use the platform.
          </Section>

          <Section title="2. What ZUNO does">
            ZUNO is an escrow service that holds a buyer's payment until they confirm they've
            received what was agreed, then releases the funds to the seller. ZUNO is a neutral
            third party — we don't manufacture, ship, or guarantee the quality of goods and
            services exchanged between buyers and sellers.
          </Section>

          <Section title="3. Verification (KYC)">
            Buyers must complete identity verification before sending protected payments. Sellers
            must complete both identity and business verification before their profile is shown to
            buyers or before they can accept escrow payments. ZUNO may suspend accounts that fail
            verification checks or provide false information.
          </Section>

          <Section title="4. Fees">
            ZUNO charges a percentage-based fee on completed transactions, shown to both parties
            before a deal is confirmed. Fees are non-refundable once a transaction is released,
            except where a dispute is resolved in the buyer's favor.
          </Section>

          <Section title="5. Disputes">
            If a buyer and seller disagree about a transaction, either party may open a dispute
            before funds are released. ZUNO will review evidence from both sides and make a
            binding decision on fund release. We aim to resolve disputes within a reasonable
            timeframe, typically under 24–72 hours depending on complexity.
          </Section>

          <Section title="6. Prohibited use">
            You may not use ZUNO for illegal goods or services, fraud, money laundering, or to
            circumvent these Terms (e.g. colluding to falsely release or dispute funds). Violating
            this may result in immediate account suspension and forfeiture of funds tied to the
            violation, to the extent permitted by law.
          </Section>

          <Section title="7. Liability">
            ZUNO facilitates payment protection but is not liable for the quality, legality, or
            delivery of goods and services exchanged between users beyond the escrow mechanism
            itself. Our liability is limited to the funds actually held in escrow for a given
            transaction.
          </Section>

          <Section title="8. Changes to these terms">
            We may update these Terms as ZUNO evolves. Continued use of the platform after a
            change takes effect means you accept the updated Terms.
          </Section>

          <Section title="9. Contact">
            Questions about these Terms can be sent through the Help & Support section in your
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
