import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { categoryName, getProduct, productsByCategory } from "../data/catalog";
import { useCart } from "../context/CartContext";
import Placeholder from "../components/Placeholder";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import StickyBuyBar from "../components/StickyBuyBar";
import { StarRating } from "../components/Stars";
import { STORE_OPEN } from "../config";

export default function Product() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const touchStart = useRef<number | null>(null);
  const buyAnchorRef = useRef<HTMLDivElement>(null);

  if (!product) {
    return (
      <div className="container empty-state">
        <h2 className="hand-title">Kit not found</h2>
        <Link to="/" className="btn btn--green">Back home</Link>
      </div>
    );
  }

  const related = productsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const gallery = [product.image, product.imageHover].filter(Boolean) as string[];
  const hasPhotos = gallery.length > 0;
  const thumbs = hasPhotos ? gallery : ["front", "detail", "in progress"];
  const slideCount = thumbs.length;

  const goTo = (index: number) => {
    setActive(((index % slideCount) + slideCount) % slideCount);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null || slideCount < 2) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) < 40) return;
    goTo(active + (delta < 0 ? 1 : -1));
  };

  const handleAdd = () => add(product, qty);

  return (
    <div className="container">
      <div className="pdp">
        <div className="pdp-thumbs">
          {thumbs.map((t, i) => (
            <button
              key={t}
              className={`pdp-thumb ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
            >
              {hasPhotos ? (
                <img className="media-img" src={gallery[i]} alt={product.name} />
              ) : (
                <Placeholder tone={product.categorySlug} />
              )}
            </button>
          ))}
        </div>

        <div
          className="pdp-main pdp-main--swipe"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {hasPhotos ? (
            <img className="media-img" src={gallery[active] ?? gallery[0]} alt={product.name} />
          ) : (
            <Placeholder tone={product.categorySlug} label={`${product.name} — ${thumbs[active]}`} />
          )}
          {slideCount > 1 && (
            <div className="pdp-dots" aria-hidden="true">
              {thumbs.map((_, i) => (
                <span key={i} className={`pdp-dot ${i === active ? "is-active" : ""}`} />
              ))}
            </div>
          )}
        </div>

        <div className="pdp-info">
          <div className="crumbs">
            <Link to="/">Home</Link> /{" "}
            <Link to={`/shop/${product.categorySlug}`}>
              {categoryName(product.categorySlug)}
            </Link>{" "}
            / {product.subcategory}
          </div>
          <h1>{product.name}</h1>

          <div className="pdp-meta">
            {product.duration && (
              <span className="pdp-tag">⏱ {product.duration}</span>
            )}
            {product.reviews.length > 0 && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <StarRating value={product.rating} />
                <span style={{ color: "var(--ink-soft)", fontWeight: 700 }}>
                  {product.rating} ({product.reviewCount})
                </span>
              </span>
            )}
          </div>

          <p className="pdp-desc">{product.description}</p>

          <div className="pdp-includes">
            <h3>In the box</h3>
            <ul>
              {product.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="pdp-price">€{product.price}</div>

          {STORE_OPEN ? (
            <div className="pdp-buy" ref={buyAnchorRef}>
              <div className="qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                  −
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                  +
                </button>
              </div>
              <button className="btn btn--green btn--lg" onClick={handleAdd}>
                Add to basket
              </button>
            </div>
          ) : (
            <div className="pdp-buy">
              <button className="btn btn--lg" disabled style={{ opacity: 0.55, cursor: "default" }}>
                Sold out
              </button>
              <span style={{ color: "var(--ink-soft)", fontWeight: 700 }}>
                Restocking soon — check back shortly ♡
              </span>
            </div>
          )}
        </div>
      </div>

      {STORE_OPEN && (
        <StickyBuyBar
          product={product}
          qty={qty}
          onAdd={handleAdd}
          anchorRef={buyAnchorRef}
        />
      )}

      {product.reviews.length > 0 && (
        <section className="reviews">
          <h2>Reviews</h2>
          {product.reviews.map((r, i) => (
            <div className="review" key={i}>
              <div className="review-body">
                <StarRating value={r.rating} />
                <div className="who">{r.author}</div>
                <p>{r.text}</p>
              </div>
              {r.hasImage && (
                <div className="review-img">
                  <Placeholder tone={product.categorySlug} label="photo" />
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {related.length > 0 && (
        <section className="section" style={{ paddingTop: 32 }}>
          <h2 className="hand-title hand-title--left">You might also like</h2>
          <Carousel>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Carousel>
        </section>
      )}
    </div>
  );
}
