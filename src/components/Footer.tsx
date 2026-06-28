import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/catalog";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-main">youmade.studio</div>
            <p>
              Handmade craft kits, posted to your door. Make something lovely
              with your own two hands.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h4>Shop</h4>
              <ul>
                {categories.slice(0, 4).map((c) => (
                  <li key={c.slug}>
                    <Link to={`/shop/${c.slug}`}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Studio</h4>
              <ul>
                <li><Link to="/">Our story</Link></li>
                <li><Link to="/">Made by you</Link></li>
                <li><Link to="/">Journal</Link></li>
                <li><Link to="/">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-news">
            <h3>Stay in the loop</h3>
            {done ? (
              <p style={{ color: "#cfe0a0", fontWeight: 700 }}>
                Thank you — see you in your inbox!
              </p>
            ) : (
              <form
                className="news-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setDone(true);
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email"
                />
                <button className="btn-send" type="submit">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} youmade.studio — a small handmade business.
      </div>
    </footer>
  );
}
