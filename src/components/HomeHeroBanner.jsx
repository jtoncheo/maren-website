import { useEffect, useMemo, useRef, useState } from "react";

const bannerImageModules = import.meta.glob(
  "../assets/images/HomeHeroBanner/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);

function getFolderImages() {
  return Object.values(bannerImageModules)
    .map((m) => m.default)
    .sort((a, b) => a.localeCompare(b));
}

export default function HomeHeroBanner({
  images = [],
  headline = "J. Maren",
  subhead = "Exceptional Homes, Exceptional Living",
  ctaText = "Houston,TX | info@jmaren.com",
  ctaHref = "#Contact Us",
}) {
  const safeImages = useMemo(() => {
    if (images.length) return images;

    const fromFolder = getFolderImages();
    return fromFolder.length
      ? fromFolder
      : [
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=70",
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=70",
        ];
  }, [images]);

  const DISPLAY = 6500;
  const FADE = 900;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [topLayer, setTopLayer] = useState(0);
  const [layerSrc, setLayerSrc] = useState(() => {
    const first = safeImages[0];
    const second = safeImages[1 % safeImages.length];
    return [first, second];
  });
  const [layerOpacity, setLayerOpacity] = useState([1, 0]);

  const layerRefs = [useRef(null), useRef(null)];

  const restartAnimation = (el) => {
    if (!el) return;
    el.style.animation = "none";
    // force reflow
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight;
    el.style.animation = `kenburns ${DISPLAY}ms ease-out forwards`;
  };

  useEffect(() => {
    if (safeImages.length < 2) return;

    setLayerSrc(() => {
      const first = safeImages[0];
      const second = safeImages[1 % safeImages.length];
      return [first, second];
    });
    setLayerOpacity([1, 0]);
    setCurrentIndex(0);
    setTopLayer(0);

    requestAnimationFrame(() => restartAnimation(layerRefs[0].current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeImages.length]);

  useEffect(() => {
    if (safeImages.length < 2) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % safeImages.length;

      const incomingLayer = topLayer === 0 ? 1 : 0;
      const outgoingLayer = topLayer;

      setLayerSrc((prev) => {
        const copy = [...prev];
        copy[incomingLayer] = safeImages[nextIndex];
        return copy;
      });

      requestAnimationFrame(() => {
        restartAnimation(layerRefs[incomingLayer].current);
      });

      setLayerOpacity((prev) => {
        const copy = [...prev];
        copy[incomingLayer] = 1;
        copy[outgoingLayer] = 0;
        return copy;
      });

      const t = setTimeout(() => {
        setTopLayer(incomingLayer);
        setCurrentIndex(nextIndex);
      }, FADE);

      // clear timeout if something interrupts (strict mode / hot reload)
      return () => clearTimeout(t);
    }, DISPLAY);

    return () => clearInterval(interval);
  }, [currentIndex, safeImages, topLayer]);

  return (
    // ✅ FULL SCREEN HERO — no peeking next section
    <section className="relative h-screen w-full overflow-hidden">
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content (centered vertically) */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6 text-white">
        <div className="max-w-2xl">
          <h1 className="font-brand text-5xl md:text-7xl tracking-tight">
            {headline}
          </h1>
        <p className="font-brand mt-6 text-lg md:text-xl text-white/90">
          {subhead}
        </p>

        <p className="font-brand mt-6 text-lg md:text-xl text-white/90">
          {ctaText}
        </p>

          {/* <a
            href={ctaHref}
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur hover:bg-white/15"
          >
            {ctaText} <span aria-hidden>→</span>
          </a> */}
        </div>
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
