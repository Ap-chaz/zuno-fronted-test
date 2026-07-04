import { apiClient } from "@/lib/api/client";
import { mockResolve } from "@/lib/api/mock-adapter";
import { env } from "@/config/env";
import type { Notification } from "@/types/models";

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "Payment received", body: "KES 191,311 from Gadget World", read: false, createdAt: new Date().toISOString(), type: "transaction", relatedId: "ZUNOAXFVLO4Y8Y" },
  { id: "n2", title: "Out for delivery", body: "iPhone 17 Pro Max · arrives tomorrow", read: false, createdAt: new Date().toISOString(), type: "transaction", relatedId: "ZUNOAXFVLO4Y8Y" },
  { id: "n3", title: "Funds locked safely", body: "ZUNO escrow holding KES 145,000", read: true, createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), type: "transaction" },
  { id: "n4", title: "Identity verified", body: "Trust score increased to 850", read: true, createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), type: "kyc" },
  { id: "n5", title: "New login from Nairobi", body: "Tap if this wasn't you", read: true, createdAt: new Date(Date.now() - 86400000 * 4).toISOString(), type: "system" },
  { id: "n6", title: "Referral reward earned", body: "+KES 250 wallet bonus", read: true, createdAt: new Date(Date.now() - 86400000 * 4).toISOString(), type: "system" },
];

export const notificationsService = {
  async list(): Promise<Notification[]> {
    if (env.useMockApi) return mockResolve([...MOCK_NOTIFICATIONS]);
    return apiClient.get<Notification[]>("/notifications");
  },

  async unreadCount(): Promise<number> {
    const all = await this.list();
    return all.filter((n) => !n.read).length;
  },

  async markAsRead(id: string): Promise<void> {
    if (env.useMockApi) {
      const found = MOCK_NOTIFICATIONS.find((n) => n.id === id);
      if (found) found.read = true;
      return mockResolve(undefined);
    }
    await apiClient.patch(`/notifications/${id}`, { read: true });
  },

  async markAllAsRead(): Promise<void> {
    if (env.useMockApi) {
      MOCK_NOTIFICATIONS.forEach((n) => (n.read = true));
      return mockResolve(undefined);
    }
    await apiClient.post("/notifications/mark-all-read");
  },
};
