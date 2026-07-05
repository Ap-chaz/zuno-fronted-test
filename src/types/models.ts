/**
 * Domain models shared between services, hooks, and UI.
 *
 * Keeping these separate from `lib/zuno-data.ts` (the mock dataset) means
 * the "shape a component expects" and "shape the mock happens to store" can
 * diverge cleanly once a real API is introduced — components only ever
 * depend on the types in this file.
 */

export type TxStatus =
  | "Pending"
  | "Funded"
  | "Protected"
  | "Completed"
  | "Refunded"
  | "Disputed";

export interface Transaction {
  id: string;
  item: string;
  seller: string;
  sellerId: string;
  amount: number;
  currency: "KES";
  date: string;
  status: TxStatus;
  category: string;
}

export type SellerVerificationTier = "unverified" | "pending" | "verified" | "flagged";

export interface Seller {
  id: string;
  name: string;
  initials: string;
  rating: number;
  reviews: number;
  category: string;
  verified: boolean;
  /** Finer-grained status than `verified` — drives the display gate and admin queue. */
  verificationTier?: SellerVerificationTier;
  /** Count of unresolved/upheld disputes against this seller. */
  disputeCount?: number;
  deals: number;
  tagline: string;
  color: string;
  location?: string;
  description?: string;
  responseRate?: number;
  links?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    whatsapp?: string;
    website?: string;
  };
}

export type KycStatus = "unverified" | "pending" | "verified";

export type ZunoRole = "buyer" | "seller";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: ZunoRole;
  kycStatus: KycStatus;
  trustScore: number;
  avatarInitial: string;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  /** Opaque bearer token — never parsed on the client. */
  token: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  type: "transaction" | "dispute" | "system" | "kyc";
  relatedId?: string;
}

export type DisputeStatus = "open" | "under_review" | "resolved" | "rejected";

export interface Dispute {
  id: string;
  transactionId: string;
  reason: string;
  description: string;
  status: DisputeStatus;
  createdAt: string;
  evidenceUrls: string[];
}

export interface TrackingEvent {
  id: string;
  label: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

/**
 * Generic wrapper every service call resolves to. Mirrors a typical REST
 * envelope so swapping the mock adapter for `fetch` doesn't change the
 * calling code's shape.
 */
export interface ApiResult<T> {
  data: T;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
