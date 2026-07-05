import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, Clock, ShieldOff, Upload } from "lucide-react";
import { toast } from "sonner";
import { TopBar } from "@/components/zuno/TopBar";
import { SELLER_CATEGORIES } from "@/services/sellers.service";
import {
  getSellerVerificationTier,
  submitBusinessVerification,
} from "@/lib/seller-business-verification";

export const Route = createFileRoute("/seller/verification")({
  head: () => ({ meta: [{ title: "Business Verification — ZUNO Seller" }] }),
  component: SellerVerification,
});

function SellerVerification() {
  const [tier, setTier] = useState(getSellerVerificationTier());
  const [category, setCategory] = useState(SELLER_CATEGORIES[1] ?? "");
  const [businessRegNumber, setBusinessRegNumber] = useState("");
  const [location, setLocation] = useState("");
  const [idUploaded, setIdUploaded] = useState(false);

  const canSubmit = category && businessRegNumber.trim() && location.trim() && idUploaded;

  function handleSubmit() {
    if (!canSubmit) return;
    submitBusinessVerification({
      category,
      businessRegNumber: businessRegNumber.trim(),
      location: location.trim(),
      submittedAt: new Date().toISOString(),
    });
    setTier("pending");
    toast.success("Submitted for review — we'll notify you within 24 hours.");
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar title="Business Verification" back="/seller/account" />

      <div className="px-5 pt-4 pb-8">
        {tier === "verified" && (
          <div className="rounded-3xl border border-border/40 bg-gradient-card p-5 text-center shadow-card">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-success/15">
              <BadgeCheck className="h-10 w-10 text-success" />
            </div>
            <h1 className="mt-4 text-xl font-bold">Business verified</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Your business is displayed to buyers with a verified badge.
            </p>
          </div>
        )}

        {tier === "pending" && (
          <div className="rounded-3xl border border-gold/30 bg-gold/5 p-5 text-center shadow-card">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gold/15">
              <Clock className="h-10 w-10 text-gold" />
            </div>
            <h1 className="mt-4 text-xl font-bold">Submitted — in review</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              We're checking your details. This usually takes under 24 hours. Your business
              won't appear in buyer listings until this is approved.
            </p>
          </div>
        )}

        {tier === "unverified" && (
          <>
            <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-5 text-center shadow-card">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-destructive/15">
                <ShieldOff className="h-10 w-10 text-destructive" />
              </div>
              <h1 className="mt-4 text-xl font-bold">Not yet displayed to buyers</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Submit your business details below to get verified and start receiving protected
                payments through ZUNO.
              </p>
            </div>

            <p className="mt-6 px-1 text-xs font-bold tracking-[0.18em] text-muted-foreground">
              BUSINESS DETAILS
            </p>
            <div className="mt-3 space-y-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                  Category
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-border/60 bg-input px-4 text-sm outline-none focus:border-gold/50"
                >
                  {SELLER_CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                  Business registration / ID number
                </span>
                <input
                  value={businessRegNumber}
                  onChange={(e) => setBusinessRegNumber(e.target.value)}
                  placeholder="e.g. PVT-ABCD1234 or National ID"
                  className="h-12 w-full rounded-2xl border border-border/60 bg-input px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-gold/50"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                  Location
                </span>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Westlands, Nairobi"
                  className="h-12 w-full rounded-2xl border border-border/60 bg-input px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-gold/50"
                />
              </label>

              <button
                type="button"
                onClick={() => setIdUploaded(true)}
                className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl border text-sm font-semibold transition-colors ${
                  idUploaded
                    ? "border-success/40 bg-success/10 text-success"
                    : "border-border/60 bg-surface text-muted-foreground"
                }`}
              >
                {idUploaded ? <BadgeCheck className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
                {idUploaded ? "ID / permit uploaded" : "Upload ID or business permit"}
              </button>
            </div>

            <button
              type="button"
              disabled={!canSubmit}
              onClick={handleSubmit}
              className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-gold text-sm font-semibold text-gold-foreground shadow-gold disabled:opacity-40"
            >
              Submit for review
            </button>
          </>
        )}
      </div>
    </div>
  );
}
