import fetch from "node-fetch";
import { readFile } from "fs/promises";
import path from "path";

export default async (req, res) => {
  const userAgent = req.headers['user-agent'] || '';
  const isBot = /bot|crawl|spider|slurp|facebook|twitter|linkedin|preview/i.test(userAgent);

  if (isBot) {
    try {
      const prerenderToken = process.env.VITE_APP_PRERENDER_TOKEN; // Replace with your Prerender.io token
      const prerenderUrl = `https://service.prerender.io/${req.url}`;
      const response = await fetch(prerenderUrl, {
        headers: { 'X-Prerender-Token': prerenderToken }
      });
      const html = await response.text();
      res.setHeader('Content-Type', 'text/html');
      return res.status(response.status).send(html);
    } catch (err) {
      console.error("Prerender fetch failed:", err);
    }
  }

  // Serve your SPA normally for humans
  const indexPath = path.join(process.cwd(), "public", "index.html");
  const html = await readFile(indexPath, "utf8");
  res.setHeader("Content-Type", "text/html");
  res.send(html);
};
