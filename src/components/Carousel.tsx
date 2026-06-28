import { useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "./icons";

export default function Carousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8 * dir;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="carousel">
      <button
        className="carousel-arrow carousel-arrow--prev"
        onClick={() => scrollBy(-1)}
        aria-label="Previous"
      >
        <ArrowLeft />
      </button>
      <div className="carousel-track" ref={trackRef}>
        {children}
      </div>
      <button
        className="carousel-arrow carousel-arrow--next"
        onClick={() => scrollBy(1)}
        aria-label="Next"
      >
        <ArrowRight />
      </button>
    </div>
  );
}
