import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { categories } from "../data/catalog";
import { useCart } from "../context/CartContext";
import {
  CartIcon,
  ChevronDown,
  HeartFlourish,
  MenuIcon,
  SearchIcon,
} from "./icons";
import MobileNav from "./MobileNav";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/shop/${categories[0].slug}${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-top">
          <button
            className="icon-btn header-menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>

          <Link to="/" className="logo">
            <div>
              <span className="logo-main">youmade</span>
              <span className="logo-dot">.studio</span>
            </div>
            <div className="logo-flourish">
              <span /> <HeartFlourish /> <span />
            </div>
          </Link>

          <div className="header-tools">
            <form className="search-box" onSubmit={onSearch}>
              <SearchIcon />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search kits…"
                aria-label="Search"
              />
            </form>
            <button
              className="icon-btn header-search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <SearchIcon />
            </button>
            <Link to="/cart" className="icon-btn" aria-label="Basket">
              <CartIcon />
              {count > 0 && <span className="cart-count">{count}</span>}
            </Link>
          </div>
        </div>
      </div>

      <nav className="main-nav">
        <div className="container">
          <ul className="nav-list">
            {categories.map((cat) => (
              <li className="nav-item" key={cat.slug}>
                <NavLink
                  to={`/shop/${cat.slug}`}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "is-active" : ""}`
                  }
                >
                  {cat.name}
                  <ChevronDown className="chev" />
                </NavLink>
                <div className="dropdown">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub}
                      to={`/shop/${cat.slug}?type=${encodeURIComponent(sub)}`}
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        query={query}
        onQueryChange={setQuery}
      />
    </header>
  );
}
