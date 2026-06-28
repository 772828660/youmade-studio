interface PlaceholderProps {
  tone?: string;
  label?: string;
}

/** Stand-in for real product photography in this prototype. */
export default function Placeholder({ tone, label }: PlaceholderProps) {
  return (
    <div className="ph" data-tone={tone} aria-hidden>
      {label && <span className="ph-label">{label}</span>}
    </div>
  );
}
