import { useEffect, useMemo, useRef, useState } from "react";

const bannerImageModules = import.meta.glob(
  "../assets/images/HomeHeroBanner/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

function getFolderImages() {
  return Object.values(bannerImageModules)
    .map((m) => m.default)
    .sort((a, b) => a.localeCompare(b));
}

export default function HomeHeroBanner({
  images = [],
  headline = "JMaren",
  subhead = "Let us Build your homes",
  ctaText = "Learn More",
  ctaHref = "#learn-more",
}) {
  const safeImages = useMemo(() => {
    if (images.length) return images;

    const fromFolder = getFolderImages();
    return fromFolder.length
      ? fromFolder
      : [

        ];
  }, [images]);

  const DISPLAY = 6500;
  const FADE = 900;

  // which slide index is currently showing
  const [currentIndex, setCurrentIndex] = useState(0);

  // which DOM layer is "on top" (0 or 1)
  const [topLayer, setTopLayer] = useState(0);

  // each layer has its own background image url
  const [layerSrc, setLayerSrc] = useState(() => {
    const first = safeImages[0];
    const second = safeImages[1 % safeImages.length];
    return [first, second];
  });

  // layer opacity
  const [layerOpacity, setLayerOpacity] = useState([1, 0]);

  // animation control (we’ll restart animation cleanly)
  const layerRefs = [useRef(null), useRef(null)];

  const restartAnimation = (el) => {
    if (!el) return;
    // remove animation
    el.style.animation = "none";
    // force reflow so browser applies removal
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight;
    // re-apply animation
    el.style.animation = `kenburns ${DISPLAY}ms ease-out forwards`;
  };

  useEffect(() => {
    if (safeImages.length < 2) return;

    // initialize correct images if safeImages changes
    setLayerSrc(([a, b]) => {
      const first = safeImages[0];
      const second = safeImages[1 % safeImages.length];
      return [first, second];
    });
    setLayerOpacity([1, 0]);
    setCurrentIndex(0);
    setTopLayer(0);

    // start animating the visible layer
    setTimeout(() => restartAnimation(layerRefs[0].current), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeImages.length]);

  useEffect(() => {
    if (safeImages.length < 2) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % safeImages.length;

      // determine which layer will fade IN (the hidden one)
      const incomingLayer = topLayer === 0 ? 1 : 0;
      const outgoingLayer = topLayer;

      // set incoming background to the next image
      setLayerSrc((prev) => {
        const copy = [...prev];
        copy[incomingLayer] = safeImages[nextIndex];
        return copy;
      });

      // restart animation on incoming layer BEFORE fade-in
      // do it next tick so the new background is applied
      requestAnimationFrame(() => {
        restartAnimation(layerRefs[incomingLayer].current);
      });

      // crossfade: incoming -> 1, outgoing -> 0
      setLayerOpacity((prev) => {
        const copy = [...prev];
        copy[incomingLayer] = 1;
        copy[outgoingLayer] = 0;
        return copy;
      });

      // after fade completes, incoming becomes top
      const t = setTimeout(() => {
        setTopLayer(incomingLayer);
        setCurrentIndex(nextIndex);
        // outgoing layer is hidden now; no need to “stop” it (keeps last frame off-screen)
      }, FADE);

      return () => clearTimeout(t);
    }, DISPLAY);

    return () => clearInterval(interval);
  }, [currentIndex, safeImages, topLayer]);

  return (
    <section className="relative h-[72vh] min-h-[540px] w-full overflow-hidden">
      {/* Layer 0 */}
      <div
        ref={layerRefs[0]}
        className="absolute inset-0 hero-slide"
        style={{
          backgroundImage: `url(${layerSrc[0]})`,
          opacity: layerOpacity[0],
          transition: `opacity ${FADE}ms ease`,
        }}
      />

      {/* Layer 1 */}
      <div
        ref={layerRefs[1]}
        className="absolute inset-0 hero-slide"
        style={{
          backgroundImage: `url(${layerSrc[1]})`,
          opacity: layerOpacity[1],
          transition: `opacity ${FADE}ms ease`,
        }}
      />

      <div className="absolute inset-0 bg-black/40" />

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
          {ctaText} <span aria-hidden>→</span>
        </a>
      </div>

      <style>{`
        .hero-slide{
          background-size: cover;
          background-position: center;
          will-change: transform, opacity;
          transform: scale(1);
        }

        @keyframes kenburns {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}
