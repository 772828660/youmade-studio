import { Link } from "react-router-dom";
import { bestsellers, categories, communityMakes } from "../data/catalog";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import Placeholder from "../components/Placeholder";

const TitleRule = () => (
  <span className="title-rule">
    <svg viewBox="0 0 120 10" fill="none">
      <path
        d="M2 6 C 25 1, 45 9, 60 5 S 95 1, 118 5"
        stroke="#c4d293"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">welcome to the studio</span>
            <h1>Make something lovely with your hands.</h1>
            <p>
              Beautifully boxed craft kits — mother-of-pearl inlay, knitting,
              beading, felting & embroidery. Everything you need, posted to your
              door.
            </p>
            <div className="hero-cta">
              <Link to={`/shop/${categories[0].slug}`} className="btn btn--green btn--lg">
                Shop all kits
              </Link>
              <a href="#bestsellers" className="btn btn--lg">
                See bestsellers
              </a>
            </div>
          </div>
          <div className="hero-art">
            <Placeholder tone="mother-of-pearl" label="featured kit" />
          </div>
        </div>
      </section>

      {/* Categories quick links */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <h2 className="hand-title">Browse by craft</h2>
          <TitleRule />
          <Carousel>
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/shop/${c.slug}`}
                className="card"
                style={{ textAlign: "center" }}
              >
                <div className="card-media">
                  {c.cover ? (
                    <img className="media-img" src={c.cover} alt={c.name} loading="lazy" />
                  ) : (
                    <Placeholder tone={c.slug} label={c.name} />
                  )}
                </div>
                <div className="card-body" style={{ alignItems: "center" }}>
                  <span className="card-name">{c.name}</span>
                  <span style={{ color: "var(--ink-soft)", fontSize: ".88rem" }}>
                    {c.blurb}
                  </span>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section section--beige" id="bestsellers">
        <div className="container">
          <h2 className="hand-title">Bestsellers</h2>
          <TitleRule />
          <Carousel>
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Carousel>
        </div>
      </section>

      {/* Brand story — made by you */}
      <section className="section">
        <div className="container story">
          <div className="story-art">
            <Placeholder tone="wool-felt" label="our little studio" />
          </div>
          <div>
            <h2>made by you…</h2>
            <p>
              youmade.studio began at one kitchen table, packing kits by hand for
              friends who wanted to slow down and make. Every box is still
              assembled by us, with carefully sourced materials and instructions
              we wish we'd had when we started.
            </p>
            <p>
              No experience needed — just a free afternoon and a little
              curiosity.
            </p>
            <Link to={`/shop/${categories[0].slug}`} className="btn btn--green">
              Start your first make
            </Link>
          </div>
        </div>
      </section>

      {/* Community / made by you gallery */}
      <section className="section section--beige">
        <div className="container">
          <h2 className="hand-title">From our community</h2>
          <TitleRule />
          <p style={{ textAlign: "center", color: "var(--ink-soft)", marginTop: -12, marginBottom: 26 }}>
            Finished makes shared with #madebyyou
          </p>

          <div className="community-grid">
            {communityMakes.map((m) => {
              const alt = m.caption ?? `Make by @${m.handle}`;
              return (
                <div className="community-tile" key={m.image}>
                  {m.productSlug ? (
                    <Link to={`/product/${m.productSlug}`} className="community-media">
                      <img src={m.image} alt={alt} loading="lazy" />
                      <span className="community-shop">Shop the kit</span>
                    </Link>
                  ) : (
                    <div className="community-media">
                      <img src={m.image} alt={alt} loading="lazy" />
                    </div>
                  )}
                  <a
                    href={`https://www.instagram.com/${m.handle}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="community-handle"
                  >
                    @{m.handle}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
