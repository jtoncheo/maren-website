import { useEffect, useMemo, useState } from "react";

const bannerImageModules = import.meta.glob(
  "../assets/images/HomeHeroBanner/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

export default function HomeHeroBanner({
  images = [],
  headline = "JMaren",
  subhead = "Let us Build your homes",
  ctaText = "Learn More",
  ctaHref = "#learn-more",
}) {
  const safeImages = useMemo(() => {
    if (images.length) return images;

    const fromFolder = Object.values(bannerImageModules)
      .map((mod) => mod.default)
      // keep 01.jpg, 02.jpg... ordering
      .sort((a, b) => a.localeCompare(b));

    return fromFolder.length
      ? fromFolder
      : [];
  }, [images]);

  const DISPLAY = 6500; // total time per slide
  const FADE = 900;     // crossfade time

  const [active, setActive] = useState(0);
  const [next, setNext] = useState(1);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (safeImages.length < 2) return;

    const id = setInterval(() => {
      const nextIndex = (active + 1) % safeImages.length;
      setNext(nextIndex);
      setIsFading(true);

      const t = setTimeout(() => {
        setActive(nextIndex);
        setIsFading(false);
      }, FADE);

      return () => clearTimeout(t);
    }, DISPLAY);

    return () => clearInterval(id);
  }, [active, safeImages.length]);

  // Only ONE layer should zoom at a time:
  // - During fade: zoom the incoming (next) image
  // - Not fading: zoom the active image
  const activeShouldZoom = !isFading;
  const nextShouldZoom = isFading;

  return (
    <section className="relative h-[72vh] min-h-[540px] w-full overflow-hidden">
      {/* Active layer */}
      <div
        key={`active-${safeImages[active]}`}
        className={`absolute inset-0 hero-slide ${activeShouldZoom ? "hero-zoom" : ""}`}
        style={{
          backgroundImage: `url(${safeImages[active]})`,
          opacity: isFading ? 0 : 1,
          transition: `opacity ${FADE}ms ease`,
          animationDuration: `${DISPLAY}ms`,
        }}
      />

      {/* Next layer */}
      <div
        key={`next-${safeImages[next]}`}
        className={`absolute inset-0 hero-slide ${nextShouldZoom ? "hero-zoom" : ""}`}
        style={{
          backgroundImage: `url(${safeImages[next]})`,
          opacity: isFading ? 1 : 0,
          transition: `opacity ${FADE}ms ease`,
          animationDuration: `${DISPLAY}ms`,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 text-white">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
          {headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/90">
          {subhead}
        </p>

        <a
          href={ctaHref}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur hover:bg-white/15"
        >
          {ctaText}
          <span aria-hidden>→</span>
        </a>
      </div>

      <style>{`
        .hero-slide{
          background-size: cover;
          background-position: center;
          will-change: transform, opacity;
          transform: scale(1); /* default: no zoom */
        }

        /* Only apply animation when this class is present */
        .hero-zoom{
          animation-name: kenburns;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }

        @keyframes kenburns {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}
