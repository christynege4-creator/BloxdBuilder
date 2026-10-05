import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname, normalize, sep } from "node:path";

const PORT = Number(process.env.PORT ?? 3000);
const ROOT = process.cwd();

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".ts": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".lua": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const HTML_ROUTES = new Map([
  ["/", "index.html"],
  ["/home", "index.html"],
  ["/world-builder", "world-builder.html"],
  ["/chat", "chat.html"],
  ["/script-editor", "script-editor.html"],
  ["/workshop", "workshop.html"],
]);

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.length > 1 && pathname.endsWith("/")) pathname = pathname.slice(0, -1);

    const clean = normalize(pathname).replace(/^([.][.][/\\])+/, "");
    const filePath = join(ROOT, HTML_ROUTES.get(pathname) ?? clean);
    if (!filePath.startsWith(ROOT + sep) && filePath !== ROOT) {
      res.writeHead(403, { "Content-Type": "text/plain" });
      res.end("Forbidden");
      return;
    }

    const ext = extname(filePath).toLowerCase();
    const mime = MIME[ext] ?? "application/octet-stream";

    const body = await readFile(filePath);
    res.writeHead(200, { "Content-Type": mime, "Cache-Control": "no-store" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page not found — BloxdBuilder</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <main class="container">
    <h1>Page not found</h1>
    <p class="muted">The requested page could not be found.</p>
    <p><a href="/home">Return to BloxdBuilder</a></p>
  </main>
</body>
</html>`);
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`BloxdBuilder dev server listening on http://0.0.0.0:${PORT}`);
});
