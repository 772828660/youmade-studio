import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/catalog";
import { ChevronDown, CloseIcon } from "./icons";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (slug: string) =>
    setExpanded((prev) => (prev === slug ? null : slug));

  return (
    <>
      <div
        className={`mobile-nav-backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <nav
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav-head">
          <span className="mobile-nav-title">Shop</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>

        <ul className="mobile-nav-list">
          <li>
            <Link to="/" className="mobile-nav-link" onClick={onClose}>
              Home
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                className="mobile-nav-link mobile-nav-link--toggle"
                onClick={() => toggle(cat.slug)}
                aria-expanded={expanded === cat.slug}
              >
                {cat.name}
                <ChevronDown
                  className={`mobile-nav-chev ${expanded === cat.slug ? "is-open" : ""}`}
                />
              </button>
              {expanded === cat.slug && (
                <ul className="mobile-nav-sub">
                  <li>
                    <Link
                      to={`/shop/${cat.slug}`}
                      className="mobile-nav-sublink"
                      onClick={onClose}
                    >
                      All {cat.name}
                    </Link>
                  </li>
                  {cat.subcategories.map((sub) => (
                    <li key={sub}>
                      <Link
                        to={`/shop/${cat.slug}?type=${encodeURIComponent(sub)}`}
                        className="mobile-nav-sublink"
                        onClick={onClose}
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
