import { readFile } from "fs/promises";
import path from "path";

export default async (req, res) => {
  const userAgent = req.headers["user-agent"] || "";
  const isBot = /bot|crawl|spider|slurp|facebook|twitter|linkedin|preview/i.test(userAgent);

  if (isBot) {
    try {
      const prerenderToken = process.env.VITE_APP_PRERENDER_TOKEN; // Use process.env instead of import.meta.env
      const prerenderUrl = `https://service.prerender.io/${req.url}`;
      const response = await fetch(prerenderUrl, {
        headers: { "X-Prerender-Token": prerenderToken },
      });
      const html = await response.text();
      res.setHeader("Content-Type", "text/html");
      return res.status(response.status).send(html);
    } catch (err) {
      console.error("Prerender fetch failed:", err);
    }
  }

  // Serve your SPA for non-bots
  try {
    const indexPath = path.join(process.cwd(), "public", "index.html");
    const html = await readFile(indexPath, "utf8");
    res.setHeader("Content-Type", "text/html");
    return res.send(html);
  } catch (err) {
    console.error("Failed to read index.html:", err);
    res.status(500).send("Internal Server Error");
  }
};
