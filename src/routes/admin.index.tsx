import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, Receipt, Wallet, BarChart3, Users, LogOut } from "lucide-react";
import { PhoneFrame } from "@/components/zuno/PhoneFrame";
import { TopBar } from "@/components/zuno/TopBar";
import { AdminGate } from "@/components/zuno/AdminGate";
import { adminLogout } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — ZUNO" }] }),
  component: () => (
    <AdminGate>
      <AdminHome />
    </AdminGate>
  ),
});

function AdminHome() {
  return (
    <PhoneFrame>
      <TopBar
        title="ZUNO Admin"
        back="/app/account"
        right={
          <button
            type="button"
            onClick={() => {
              adminLogout();
              window.location.reload();
            }}
            className="grid h-10 w-10 place-items-center rounded-xl bg-surface text-muted-foreground hover:bg-surface-2"
            aria-label="Log out of admin"
          >
            <LogOut className="h-4 w-4" />
          </button>
        }
      />

      <div className="px-5 pt-4 pb-8">
        <p className="mb-4 text-xs text-muted-foreground">
          Internal tools for reviewing sellers and resolving disputes. Not visible to buyers or
          sellers.
        </p>

        <div className="space-y-3">
          <AdminLink
            to="/admin/sellers"
            icon={ShieldCheck}
            title="Seller Verification Queue"
            desc="Approve, flag, or reject seller business verification submissions"
          />
          <AdminLink
            to="/admin/disputes"
            icon={AlertTriangle}
            title="Dispute Resolution Center"
            desc="Review evidence and decide refund vs. release for open disputes"
          />
          <AdminLink
            to="/admin/transactions"
            icon={Receipt}
            title="Transaction Monitoring"
            desc="Search, filter, override status, flag for fraud, and export CSV"
          />
          <AdminLink
            to="/admin/payouts"
            icon={Wallet}
            title="Payout & Refund Queue"
            desc="Track seller payouts and buyer refunds owed, mark as sent"
          />
          <AdminLink
            to="/admin"
            icon={BarChart3}
            title="Analytics Dashboard"
            desc="Coming soon"
            disabled
          />
          <AdminLink
            to="/admin"
            icon={Users}
            title="Buyer & Seller Accounts"
            desc="Coming soon"
            disabled
          />
        </div>
      </div>
    </PhoneFrame>
  );
}

function AdminLink({
  to,
  icon: Icon,
  title,
  desc,
  disabled = false,
}: {
  to: string;
  icon: typeof ShieldCheck;
  title: string;
  desc: string;
  disabled?: boolean;
}) {
  const content = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold/10 text-gold">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{desc}</p>
      </div>
    </>
  );

  if (disabled) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-border/40 bg-surface p-4 opacity-50">
        {content}
      </div>
    );
  }

  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-2xl border border-border/40 bg-surface p-4 transition-colors hover:border-gold/30"
    >
      {content}
    </Link>
  );
}
