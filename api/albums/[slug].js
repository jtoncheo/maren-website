import { Dropbox } from "dropbox";

const token = (process.env.DROPBOX_ACCESS_TOKEN || "").trim();
const dbx = new Dropbox({ accessToken: token });

// must match what your gallery uses
const ROOT = "/completedProjects";

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const IMG_EXT = /\.(jpe?g|png|webp|gif)$/i;

export default async function handler(req, res) {
  try {
    const slug = req.query.slug;

    // 1) find the real folder for this slug
    const foldersRes = await dbx.filesListFolder({ path: ROOT });
    const folders = foldersRes.result.entries.filter((e) => e[".tag"] === "folder");

    const match = folders.find((f) => slugify(f.name) === slug);
    if (!match) {
      return res.status(404).json({ error: `Album not found for slug: ${slug}` });
    }

    const albumPath = match.path_lower; // real dropbox path (correct case handled by Dropbox)
    // 2) list files in that folder
    const filesRes = await dbx.filesListFolder({ path: albumPath });
    const files = filesRes.result.entries.filter(
      (e) => e[".tag"] === "file" && IMG_EXT.test(e.name)
    );

    // 3) turn images into temporary links
    const images = [];
    for (const f of files) {
      const linkRes = await dbx.filesGetTemporaryLink({ path: f.path_lower });
      images.push({
        id: f.id,
        name: f.name,
        url: linkRes.result.link,
      });
    }

    // Optional: sort by filename
    images.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    return res.status(200).json({
      slug,
      name: match.name,
      images,
    });
  } catch (e) {
    const detail =
      e?.error?.error_summary ||
      e?.error?.error?.error_summary ||
      e?.message ||
      String(e);

    console.error("ALBUM ERROR:", detail);
    return res.status(500).json({ error: detail });
  }
}
