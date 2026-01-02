import { useEffect, useState } from "react";

export default function Album({ slug }) {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/albums/${slug}`)
      .then((r) => r.json())
      .then(setAlbum);
  }, [slug]);

  if (!album) return <div className="container muted">Loading album…</div>;
  if (album.error) return <div className="container muted">{album.error}</div>;

  return (
    <main className="container">
      <button className="back" onClick={() => (window.location.hash = "#/")}>
        ← Back
      </button>

      <h1 className="page-title">{album.name}</h1>

      <div className="grid">
        {album.images.map((img) => (
          <a key={img.id} className="card" href={img.url} target="_blank" rel="noreferrer">
            <div className="thumb">
              <img src={img.url} alt={img.name} loading="lazy" />
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
