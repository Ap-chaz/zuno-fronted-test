import { apiClient } from "@/lib/api/client";
import { mockResolve } from "@/lib/api/mock-adapter";
import { env } from "@/config/env";
import type { Dispute } from "@/types/models";

const MOCK_DISPUTES: Dispute[] = [
  {
    id: "d1",
    transactionId: "ZUNO9DF8GH7JK6",
    reason: "Item not as described",
    description: "The drone arrived with a different battery than advertised.",
    status: "under_review",
    createdAt: "2026-05-20T09:00:00.000Z",
    evidenceUrls: [],
  },
];

export const disputesService = {
  async list(): Promise<Dispute[]> {
    if (env.useMockApi) return mockResolve([...MOCK_DISPUTES]);
    return apiClient.get<Dispute[]>("/disputes");
  },

  async create(input: { transactionId: string; reason: string; description: string }): Promise<Dispute> {
    if (env.useMockApi) {
      const created: Dispute = {
        id: `d${Math.random().toString(36).slice(2, 8)}`,
        transactionId: input.transactionId,
        reason: input.reason,
        description: input.description,
        status: "open",
        createdAt: new Date().toISOString(),
        evidenceUrls: [],
      };
      MOCK_DISPUTES.unshift(created);
      return mockResolve(created);
    }
    return apiClient.post<Dispute>("/disputes", input);
  },
};
