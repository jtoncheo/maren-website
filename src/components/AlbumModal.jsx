import { useEffect, useMemo, useState } from "react";
import "./AlbumModal.css";

export default function AlbumModal({ slug, title, onClose }) {
  const [album, setAlbum] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState("");

  // Fetch album on open
  useEffect(() => {
    if (!slug) return;

    setAlbum(null);
    setError("");
    setActiveIndex(0);

    fetch(`/api/albums/${slug}`)
      .then(async (r) => {
        const data = await r.json().catch(() => null);
        if (!r.ok) throw new Error(data?.error || `Request failed (${r.status})`);
        return data;
      })
      .then((data) => setAlbum(data))
      .catch((e) => setError(e.message));
  }, [slug]);

  // Close on ESC
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
      if (!album?.images?.length) return;

      if (e.key === "ArrowRight") setActiveIndex((i) => Math.min(i + 1, album.images.length - 1));
      if (e.key === "ArrowLeft") setActiveIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [album, onClose]);

  const images = album?.images || [];
  const active = images[activeIndex];

  // Keep thumb strip from jumping too hard
  const thumbWindow = useMemo(() => {
    const start = Math.max(0, activeIndex - 10);
    const end = Math.min(images.length, start + 24);
    return { start, end };
  }, [activeIndex, images.length]);

  return (
    <div className="albumModal__overlay" onMouseDown={onClose}>
      <div className="albumModal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="albumModal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="albumModal__header">
          <div className="albumModal__title">{album?.name || title || "Project"}</div>
          <div className="albumModal__meta">
            {album?.images ? `${album.images.length} photos` : ""}
          </div>
        </div>

        {!album && !error ? (
          <div className="albumModal__status">Loading album…</div>
        ) : error ? (
          <div className="albumModal__status">{error}</div>
        ) : (
          <>
            <div className="albumModal__stage">
              <button
                className="albumModal__nav albumModal__nav--left"
                onClick={() => setActiveIndex((i) => Math.max(i - 1, 0))}
                disabled={activeIndex === 0}
                aria-label="Previous photo"
              >
                ‹
              </button>

              <div className="albumModal__imageWrap">
                <img
                  className="albumModal__image"
                  src={active?.url}
                  alt={active?.name || ""}
                  draggable="false"
                />
              </div>

              <button
                className="albumModal__nav albumModal__nav--right"
                onClick={() => setActiveIndex((i) => Math.min(i + 1, images.length - 1))}
                disabled={activeIndex === images.length - 1}
                aria-label="Next photo"
              >
                ›
              </button>
            </div>

            <div className="albumModal__thumbs">
              <div className="albumModal__thumbTrack">
                {images.slice(thumbWindow.start, thumbWindow.end).map((img, idx) => {
                  const realIndex = thumbWindow.start + idx;
                  const isActive = realIndex === activeIndex;
                  return (
                    <button
                      key={img.id}
                      className={`albumModal__thumb ${isActive ? "isActive" : ""}`}
                      onClick={() => setActiveIndex(realIndex)}
                      title={img.name}
                      aria-label={`Open photo ${realIndex + 1}`}
                    >
                      <img src={img.url} alt={img.name || ""} loading="lazy" />
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
