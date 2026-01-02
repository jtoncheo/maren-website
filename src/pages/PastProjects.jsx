import { useEffect, useState } from "react";




export default function PastProjects(){
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/albums")
      .then((r) => r.json())
      .then(setAlbums)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container">
      <h1 className="page-title">Completed Projects</h1>

      {loading ? (
        <div className="muted">Loading projects…</div>
      ) : (
        <div className="grid">
          {albums.map((a) => (
            <a key={a.slug} href={`#/album/${a.slug}`} className="card">
              <div className="thumb">
                <img src={a.coverUrl} alt={a.name} loading="lazy" />
              </div>
              <div className="card-body">
                <div className="title">{a.name}</div>
                <div className="muted">{a.imageCount} photos</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
