// ──────────────────────────────────────────────────────────────
//  Master switch — is the shop open for business?
//
//  false → "browse only" pre-launch mode: every kit shows as
//          Sold out and can't be added to the basket.
//  true  → normal shop, customers can buy.
//
//  Flip this one value when you're ready to actually sell.
// ──────────────────────────────────────────────────────────────
export const STORE_OPEN = false;

// ──────────────────────────────────────────────────────────────
//  Payment settings — flip ONE value to switch how you get paid.
// ──────────────────────────────────────────────────────────────

//  "paypalme"  → uses your PERSONAL account via a PayPal.Me link.
//                Works today, no upgrade needed.
//  "buttons"   → integrated PayPal checkout buttons (auto amount,
//                success confirmation). Needs a free BUSINESS account
//                + a live Client ID (see PAYPAL_CLIENT_ID below).
export type PaymentMode = "paypalme" | "buttons";
export const PAYMENT_MODE: PaymentMode = "paypalme";

// ── PayPal.Me (personal account) ──
// Your handle is paypal.me/<this>. From your app: @XueweiJiang5
export const PAYPAL_ME_USERNAME = "XueweiJiang5";

// ── Integrated buttons (business account) ──
// HOW TO GO LIVE WITH BUTTONS:
//  1. Upgrade your personal PayPal to a (free) Business account.
//  2. https://developer.paypal.com/dashboard/applications/live →
//     create an app → copy the "Client ID".
//  3. Paste it below and set PAYMENT_MODE = "buttons".
// While it's "test", buttons run in demo mode (no real money moves).
export const PAYPAL_CLIENT_ID = "test";

// Currency your prices are listed in (matches the € prices in the catalog).
export const CURRENCY = "EUR";

// Shown to the buyer on the PayPal screen.
export const STORE_NAME = "youmade.studio";
