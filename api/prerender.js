import fetch from "node-fetch";

export default async (req, res) => {
  const userAgent = req.headers["user-agent"] || "";
  const isBot = /bot|crawl|spider|slurp|facebook|twitter|linkedin|preview/i.test(userAgent);

  if (isBot) {
    try {
      const prerenderToken = process.env.VITE_APP_PRERENDER_TOKEN;
      const prerenderUrl = `https://service.prerender.io/${req.url}`;
      const response = await fetch(prerenderUrl, {
        headers: { "X-Prerender-Token": prerenderToken },
      });
      const html = await response.text();
      res.setHeader("Content-Type", "text/html");
      return res.status(response.status).send(html);
    } catch (err) {
      console.error("Prerender fetch failed:", err);
      return res.status(500).send("Prerender failed");
    }
  }

  // Normal users → redirect to SPA
  return res.redirect("/");
};
