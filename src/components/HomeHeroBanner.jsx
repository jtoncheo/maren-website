import {useEffect, useMemo, useState} from "react";

export default function HomeHeroBanner({
 images = [],
  headline = "JMaren",
  subhead = "Let us Build your homes",
  ctaText = "Learn More",
  ctaHref = "#learn-more",
}) {
  const safeImages = useMemo(
    () =>
      images.length
        ? images
        : [
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=70",
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=70",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=70",
          ],
    [images]
  );

  const [active, setActive] = useState(0);
  const [next, setNext] = useState(1);
  const [showNext, setShowNext] = useState(false);

  // Tune these to taste
  const DISPLAY = 6500; // time each image is featured
  const FADE = 900; // crossfade duration

  useEffect(() => {
    const id = setInterval(() => {
      const newNext = (active + 1) % safeImages.length;
      setNext(newNext);
      setShowNext(true);

      const t = setTimeout(() => {
        setActive(newNext);
        setShowNext(false);
      }, FADE);

      return () => clearTimeout(t);
    }, DISPLAY);

    return () => clearInterval(id);
  }, [active, safeImages.length]);

  return (
    <section className="relative h-[72vh] min-h-[540px] w-full overflow-hidden">
      {/* Active layer */}
      <div
        className="absolute inset-0 hero-kenburns"
        style={{
          backgroundImage: `url(${safeImages[active]})`,
          opacity: showNext ? 0 : 1,
          transition: `opacity ${FADE}ms ease`,
          animationDuration: `${DISPLAY}ms`,
        }}
      />
      {/* Next layer */}
      <div
        className="absolute inset-0 hero-kenburns"
        style={{
          backgroundImage: `url(${safeImages[next]})`,
          opacity: showNext ? 1 : 0,
          transition: `opacity ${FADE}ms ease`,
          animationDuration: `${DISPLAY}ms`,
        }}
      />

      {/* Dark overlay for readability */}
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
        .hero-kenburns{
          background-size: cover;
          background-position: center;
          will-change: transform, opacity;
          transform: scale(1);
          animation-name: kenburns;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
        @keyframes kenburns {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}