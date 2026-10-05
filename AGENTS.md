# BloxdBuilder

## What this app is
A static, zero-dependency multi-page web app ("BloxdBuilder" — a world toolkit for bloxd).
The HTML pages share one stylesheet; `index.ts` is the only server code.

## Non-obvious quirks
- The pages are `index.html`, `world-builder.html`, `chat.html`, `script-editor.html`, and `workshop.html`.
  `index.ts` (Node http server, run with `--experimental-strip-types`) maps `/` and `/home` to
  `index.html`, and maps the other extensionless page routes to their `.html` files.
- No package.json / no npm install needed — plain `node:22-alpine` runtime, source bind-mounted.
- `node_modules/@bloxd/index.d.ts` contains the Bloxd GameApi declarations used by Script Editor autocomplete.
- All state (world grid, chat, script) persists in browser `localStorage` under keys `bloxd.*`.
  There is no database and no external service — no secrets required.
- Server reads files from disk per request with `Cache-Control: no-store`, so HTML/CSS edits show on
  refresh; `index.ts` edits trigger a restart via `node --watch`.

## Verify
```
docker compose -f docker-compose.base44.yml up -d
curl -o /dev/null -w "%{http_code}" http://localhost:3000/          # 200
curl -I http://localhost:3000/world-builder | grep -i content-type  # text/html
curl -I http://localhost:3000/node_modules/@bloxd/index.d.ts
```
Check every page: `/`, `/home`, `/world-builder`, `/chat`, `/script-editor`, `/workshop`, plus `/style.css`.
