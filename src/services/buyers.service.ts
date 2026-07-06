import { mockResolve } from "@/lib/api/mock-adapter";
import { env } from "@/config/env";
import { apiClient } from "@/lib/api/client";
import { transactionsService } from "@/services/transactions.service";
import type { BuyerSummary } from "@/types/models";

// In-memory only — resets on reload, same tradeoff as the seller tier
// overrides in admin.sellers.tsx. Once a real user table exists, suspension
// belongs on that record, not bolted on here.
const suspendedBuyers = new Set<string>();

export const buyersService = {
  async list(): Promise<BuyerSummary[]> {
    if (env.useMockApi) {
      const transactions = await transactionsService.list();
      const byBuyer = new Map<string, BuyerSummary>();

      for (const t of transactions) {
        const name = t.buyerName ?? "Unknown buyer";
        const existing = byBuyer.get(name);
        const isDispute = t.status === "Disputed";
        if (existing) {
          existing.transactionCount += 1;
          existing.totalSpent += t.amount;
          if (isDispute) existing.disputeCount += 1;
          if (new Date(parseDate(t.date)) > new Date(parseDate(existing.lastTransactionDate))) {
            existing.lastTransactionDate = t.date;
          }
        } else {
          byBuyer.set(name, {
            name,
            transactionCount: 1,
            totalSpent: t.amount,
            disputeCount: isDispute ? 1 : 0,
            lastTransactionDate: t.date,
            suspended: suspendedBuyers.has(name),
          });
        }
      }

      return mockResolve([...byBuyer.values()].sort((a, b) => b.totalSpent - a.totalSpent));
    }
    return apiClient.get<BuyerSummary[]>("/buyers");
  },

  async toggleSuspend(name: string, suspended: boolean): Promise<void> {
    if (env.useMockApi) {
      if (suspended) suspendedBuyers.add(name);
      else suspendedBuyers.delete(name);
      return mockResolve<void>(undefined);
    }
    await apiClient.patch(`/buyers/${encodeURIComponent(name)}`, { suspended });
  },
};

// Seed dates are "DD/MM/YYYY" strings — convert to something Date() parses correctly.
function parseDate(d: string): string {
  const [day, month, year] = d.split("/");
  return `${year}-${month}-${day}`;
}
