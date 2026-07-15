import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/catalog";
import { CloseIcon, SearchIcon } from "./icons";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (q: string) => void;
}

export default function SearchOverlay({
  open,
  onClose,
  query,
  onQueryChange,
}: SearchOverlayProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(
      `/shop/${categories[0].slug}${query ? `?q=${encodeURIComponent(query)}` : ""}`,
    );
    onClose();
  };

  return (
    <div
      className={`search-overlay ${open ? "is-open" : ""}`}
      aria-hidden={!open}
      role="dialog"
      aria-label="Search"
    >
      <div className="search-overlay-backdrop" onClick={onClose} />
      <div className="search-overlay-panel">
        <form className="search-overlay-form" onSubmit={onSubmit}>
          <SearchIcon />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search kits…"
            aria-label="Search kits"
          />
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close search">
            <CloseIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
