import { useEffect, useState, type RefObject } from "react";
import type { Product } from "../data/catalog";

interface StickyBuyBarProps {
  product: Product;
  qty: number;
  onAdd: () => void;
  disabled?: boolean;
  anchorRef: RefObject<HTMLElement | null>;
}

export default function StickyBuyBar({ product, qty, onAdd, disabled, anchorRef }: StickyBuyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [anchorRef]);

  return (
    <div className={`sticky-buy ${visible ? "is-visible" : ""}`}>
      <div className="sticky-buy-inner">
        <span className="sticky-buy-price">€{product.price}</span>
        <button
          className="btn btn--green"
          onClick={onAdd}
          disabled={disabled}
          style={disabled ? { opacity: 0.55, cursor: "default" } : undefined}
        >
          {disabled ? "Sold out" : `Add to basket${qty > 1 ? ` (${qty})` : ""}`}
        </button>
      </div>
    </div>
  );
}
