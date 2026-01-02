import { useEffect, useState } from "react";
import AlbumModal from "../components/AlbumModal";
import "../components/PastProjects.css";

export default function PastProjects() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openSlug, setOpenSlug] = useState(null);
  const [openTitle, setOpenTitle] = useState("");

  useEffect(() => {
    fetch("/api/albums")
      .then(async (r) => {
        const data = await r.json().catch(() => null);
        if (!r.ok) throw new Error(data?.error || `Request failed (${r.status})`);
        if (!Array.isArray(data)) throw new Error("Expected an array from /api/albums");
        return data;
      })
      .then(setAlbums)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="pastprojects">
      <h1 className="pastprojects__title">Completed Projects</h1>

      {loading ? (
        <div className="pastprojects__status">Loading projects…</div>
      ) : error ? (
        <div className="pastprojects__status">{error}</div>
      ) : (
        <div className="pastprojects__grid">
          {albums.map((a) => (
            <button
              key={a.slug}
              className="project-card"
              onClick={() => {
                setOpenSlug(a.slug);
                setOpenTitle(a.name);
              }}
              style={{ textAlign: "left", padding: 0, cursor: "pointer" }}
            >
              <div className="project-card__thumb">
                <img src={a.coverUrl} alt={a.name} loading="lazy" />
              </div>
              <div className="project-card__body">
                <div className="project-card__name">{a.name}</div>
                <div className="project-card__meta">{a.imageCount} photos</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {openSlug && (
        <AlbumModal
          slug={openSlug}
          title={openTitle}
          onClose={() => setOpenSlug(null)}
        />
      )}
    </main>
  );
}
