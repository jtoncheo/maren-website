import { Dropbox } from "dropbox";

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });
const ROOT = "/currentProjects";

const isImage = (name) => /\.(jpe?g|png|webp|gif)$/i.test(name);
const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function handler(req, res) {
  try {
    const { slug } = req.query;

    // Find the matching folder by slug (safe; no guessing folder names)
    const list = await dbx.filesListFolder({ path: ROOT });
    const folders = list.result.entries.filter((e) => e[".tag"] === "folder");
    const folder = folders.find((f) => slugify(f.name) === slug);

    if (!folder) return res.status(404).json({ error: "Album not found" });

    const files = await dbx.filesListFolder({ path: folder.path_lower });
    const images = files.result.entries.filter(
      (e) => e[".tag"] === "file" && isImage(e.name)
    );

    const withLinks = await Promise.all(
      images.map(async (img) => {
        const link = await dbx.filesGetTemporaryLink({ path: img.path_lower });
        return { id: img.id, name: img.name, url: link.result.link };
      })
    );

    // hero first, then name
    withLinks.sort((a, b) => {
      const aHero = /^hero\./i.test(a.name) ? -1 : 0;
      const bHero = /^hero\./i.test(b.name) ? -1 : 0;
      if (aHero !== bHero) return aHero - bHero;
      return a.name.localeCompare(b.name);
    });

    res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=600");
    res.status(200).json({ name: folder.name, images: withLinks });
  } catch (e) {
    res.status(500).json({ error: e?.message || "Failed to load album" });
  }
}
