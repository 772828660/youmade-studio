import { useState } from "react";
import { Link } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { categories } from "../data/catalog";
import { useCart } from "../context/CartContext";
import Placeholder from "../components/Placeholder";
import {
  CURRENCY,
  PAYMENT_MODE,
  PAYPAL_CLIENT_ID,
  PAYPAL_ME_USERNAME,
  STORE_NAME,
} from "../config";

export default function Cart() {
  const { lines, total, remove, clear } = useCart();
  const [order, setOrder] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [awaitingConfirm, setAwaitingConfirm] = useState(false);

  const finish = (ref: string) => {
    setOrder(ref);
    clear();
  };

  // Order placed — thank-you screen
  if (order) {
    return (
      <div className="container empty-state" style={{ padding: "80px 0" }}>
        <h2 className="hand-title">Thank you! 🎉</h2>
        <p>
          Your order <strong>{order}</strong> is confirmed. We'll hand-pack it
          and pop it in the post soon.
        </p>
        <Link to={`/shop/${categories[0].slug}`} className="btn btn--green">
          Keep browsing
        </Link>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="container empty-state" style={{ padding: "80px 0" }}>
        <h2 className="hand-title">Your basket is empty</h2>
        <p>Time to make something lovely.</p>
        <Link to={`/shop/${categories[0].slug}`} className="btn btn--green">
          Browse kits
        </Link>
      </div>
    );
  }

  const isDemo = PAYMENT_MODE === "buttons" && PAYPAL_CLIENT_ID === "test";
  const paypalMeUrl = `https://paypal.me/${PAYPAL_ME_USERNAME}/${total}${CURRENCY}`;
  const orderRef = `YM-${Date.now().toString().slice(-6)}`;

  return (
    <div className="container" style={{ padding: "36px 0 24px" }}>
      <h1 className="hand-title hand-title--left" style={{ fontSize: "2.6rem" }}>
        Your basket
      </h1>

      <div className="cart-grid">
        {/* line items */}
        <div style={{ display: "grid", gap: 16 }}>
          {lines.map((l) => (
            <div key={l.product.id} className="cart-line">
              <div style={{ width: 84, height: 84, borderRadius: 10, overflow: "hidden" }}>
                <Placeholder tone={l.product.categorySlug} />
              </div>
              <div>
                <Link to={`/product/${l.product.slug}`} className="card-name">
                  {l.product.name}
                </Link>
                <div style={{ color: "var(--ink-soft)" }}>
                  Qty {l.qty} · €{l.product.price} each
                </div>
                <button
                  className="btn-clear"
                  style={{ fontSize: "1.05rem" }}
                  onClick={() => remove(l.product.id)}
                >
                  remove
                </button>
              </div>
              <div className="card-price">€{l.product.price * l.qty}</div>
            </div>
          ))}
        </div>

        {/* summary + checkout */}
        <aside className="cart-summary">
          <h2>Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>€{total}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Arranged after order</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span className="card-price">€{total}</span>
          </div>

          {error && <p className="pay-error">{error}</p>}

          {/* ---- PayPal.Me (personal account) ---- */}
          {PAYMENT_MODE === "paypalme" && (
            <div className="paypal-wrap">
              {!awaitingConfirm ? (
                <>
                  <a
                    className="btn btn--green btn--block btn--lg"
                    href={paypalMeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setAwaitingConfirm(true)}
                  >
                    Pay €{total} with PayPal
                  </a>
                  <p className="demo-note">
                    You'll be sent to PayPal to pay <strong>{STORE_NAME}</strong>.
                    Please choose “paying for goods/services” and add your email
                    &amp; shipping address in the note so we can post your kit.
                  </p>
                </>
              ) : (
                <>
                  <p style={{ fontWeight: 700, marginTop: 6 }}>
                    A PayPal window opened in a new tab.
                  </p>
                  <p className="demo-note">
                    Didn't see it?{" "}
                    <a href={paypalMeUrl} target="_blank" rel="noopener noreferrer"
                      style={{ color: "var(--accent)", fontWeight: 700 }}>
                      open PayPal again
                    </a>
                    .
                  </p>
                  <button
                    className="btn btn--green btn--block"
                    onClick={() => finish(orderRef)}
                  >
                    ✓ I've completed payment
                  </button>
                </>
              )}
            </div>
          )}

          {/* ---- Integrated buttons (business account) ---- */}
          {PAYMENT_MODE === "buttons" && (
            <>
              {isDemo && (
                <p className="demo-note">
                  Demo mode — using a test PayPal account, so no real money moves.
                  Add your live Client&nbsp;ID in <code>src/config.ts</code> to go
                  live.
                </p>
              )}
              <div className="paypal-wrap">
                <PayPalScriptProvider
                  options={{
                    clientId: PAYPAL_CLIENT_ID,
                    currency: CURRENCY,
                    intent: "capture",
                  }}
                >
                  <PayPalButtons
                    forceReRender={[total, CURRENCY]}
                    style={{ layout: "vertical", shape: "pill", label: "pay" }}
                    createOrder={(_data, actions) =>
                      actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                          {
                            description: `${STORE_NAME} order`,
                            amount: {
                              currency_code: CURRENCY,
                              value: total.toFixed(2),
                            },
                          },
                        ],
                      })
                    }
                    onApprove={(_data, actions) =>
                      actions.order!.capture().then((details) => {
                        finish(details.id ?? _data.orderID);
                      })
                    }
                    onError={() =>
                      setError("Something went wrong with PayPal. Please try again.")
                    }
                  />
                </PayPalScriptProvider>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
