import { DiamondIcon, StarIcon } from "./icons";

export function StarRating({
  value,
  variant = "review",
}: {
  value: number;
  variant?: "review" | "soft";
}) {
  return (
    <span
      className={`stars ${variant === "review" ? "stars--review" : ""}`}
      aria-label={`${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= Math.round(value)} />
      ))}
    </span>
  );
}

export function Difficulty({ score }: { score: number }) {
  return (
    <span className="diff-diamonds" aria-hidden>
      {[1, 2, 3, 4].map((i) => (
        <DiamondIcon key={i} filled={i <= score} />
      ))}
    </span>
  );
}
