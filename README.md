# BloxdBuilder

A zero-dependency browser toolkit for Bloxd worlds. The app includes the World Builder, Script Editor, chat, browser settings, and a Workshop for local texture-pack manifests, mod drafts, and schematics.

## Run locally

Run `docker compose -f docker-compose.base44.yml up -d`, then open <http://localhost:3000/>.

The Workshop is at `/workshop`, with sections at `/workshop#tpacks`, `/workshop#mods`, and `/workshop#schematics`. Workshop files are processed in the browser; JavaScript mod drafts are saved but not executed.

The Script Editor includes a local assistant with code templates, explanations, and syntax checks. It does not connect to a cloud AI service or send code off-device. Autocomplete reads GameApi methods, signatures, properties, and documentation from `node_modules/@bloxd/index.d.ts`. Those game methods are suggestions for Bloxd scripts and are not simulated by the local preview. The preview's own API can read and edit the saved 24 × 16 × 24 world through `api.size`, `api.blocks`, `api.getBlock(x, y, z)`, and `api.setBlock(x, y, z, blockName)`.

The server maps the extensionless page routes (`/`, `/home`, `/world-builder`, `/chat`, `/script-editor`, and `/workshop`) to their `.html` files.
