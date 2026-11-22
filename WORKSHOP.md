# Workshop

Open **Workshop** from the navigation or visit `/workshop`. Workshop operations are performed in the browser. The page has sections for texture-pack manifests, JavaScript mod drafts, and schematics.

## Texture packs

1. Enter a pack name.
2. Select one or more PNG, JPEG, or WebP images.
3. Check the image previews and readiness message.
4. Select **Download pack manifest**.

Each file must be non-empty, no larger than 8 MB, and decode as a valid image. The downloaded `.bloxdpack.json` is a BloxdBuilder manifest with embedded image data; it does not install or apply textures in Bloxd.

## Mods (code)

Enter a mod name and edit its JavaScript source. **Save draft** stores `{ name, code }` locally in `localStorage` under `bloxd.workshop.mod`. **Download .js** downloads the source as a `.js` file using a filename-safe version of the mod name.

The Workshop saves and downloads mod drafts but does not execute them.

## Schematics

Select **Download .bloxdschem** to export the current saved World Builder world, or **Import .bloxdschem** to load a file. Import accepts `.bloxdschem` and JSON files, and validates:

- Dimensions of `[24, 16, 24]`.
- A `world` array with exactly 9,216 entries.
- Integer block indices from 0 through 14.

An imported world replaces `bloxd.world3d` in this browser. Open or reload the World Builder to see it. A schematic file from the World Builder and Workshop carries BloxdBuilder's JSON world payload under Bloxd's `.bloxdschem` filename convention; the extension alone does not guarantee compatibility with every native Bloxd schematic format.

## Local storage and privacy

World data and mod drafts stay in the browser's local storage unless you download or otherwise export them. Texture images are read in the browser and placed into the downloaded manifest. Nothing on this page uploads your workshop files to a Bloxd server.
