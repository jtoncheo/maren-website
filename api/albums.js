import { Dropbox } from "dropbox";

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

// App Folder access: "/" == Apps/<AppFolderName>
const ROOT = "/currentProjects";

const isImage = (name) => /\.(jpe?g|png|webp|gif)$/i.test(name);
const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function handler(req, res) {
  try {
    const list = await dbx.filesListFolder({ path: ROOT });
    const folders = list.result.entries.filter((e) => e[".tag"] === "folder");

    const albums = [];

    for (const folder of folders) {
      const albumPath = folder.path_lower;

      const files = await dbx.filesListFolder({ path: albumPath });
      const images = files.result.entries.filter(
        (e) => e[".tag"] === "file" && isImage(e.name)
      );

      if (!images.length) continue;

      const hero =
        images.find((x) => /^hero\.(jpe?g|png|webp|gif)$/i.test(x.name)) || images[0];

      const cover = await dbx.filesGetTemporaryLink({ path: hero.path_lower });

      albums.push({
        slug: slugify(folder.name),
        name: folder.name,
        coverUrl: cover.result.link,
        imageCount: images.length,
      });
    }

    albums.sort((a, b) => a.name.localeCompare(b.name));

    // Cache on Vercel edge/CDN for 2 min, allow stale while revalidating
    res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=600");
    res.status(200).json(albums);
  } catch (e) {
    res.status(500).json({ error: e?.message || "Failed to load albums" });
  }
}
