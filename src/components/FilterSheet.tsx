import { useEffect, type ReactNode } from "react";
import { CloseIcon } from "./icons";

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
  activeCount: number;
  children: ReactNode;
}

export default function FilterSheet({
  open,
  onClose,
  onApply,
  onClear,
  activeCount,
  children,
}: FilterSheetProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`filter-sheet-backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <div
        className={`filter-sheet ${open ? "is-open" : ""}`}
        role="dialog"
        aria-label="Filters"
        aria-hidden={!open}
      >
        <div className="filter-sheet-head">
          <h2>Filters{activeCount > 0 && ` (${activeCount})`}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close filters">
            <CloseIcon />
          </button>
        </div>
        <div className="filter-sheet-body">{children}</div>
        <div className="filter-sheet-foot">
          <button className="btn" onClick={onClear}>
            Clear all
          </button>
          <button className="btn btn--green" onClick={onApply}>
            Show results
          </button>
        </div>
      </div>
    </>
  );
}
