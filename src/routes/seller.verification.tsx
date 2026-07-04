import { createFileRoute } from "@tanstack/react-router";
import { VerificationPage } from "./app.verification";

export const Route = createFileRoute("/seller/verification")({
  head: () => ({ meta: [{ title: "Verification — ZUNO Seller" }] }),
  component: () => <VerificationPage backTo="/seller/account" />,
});
