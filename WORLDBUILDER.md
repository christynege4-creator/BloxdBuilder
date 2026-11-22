# World Builder

The World Builder is an in-browser 3D sandbox for editing a small block world. Open it from the Home page or visit `/world-builder`.

## Getting started

1. Open **World Builder**.
2. Click the play overlay to start and capture the mouse.
3. Move and look around the world, then break or place blocks.
4. Use **Leave builder** in the top bar or **Exit to Home** on the start overlay to return Home.

The world is 24 blocks wide, 16 blocks high, and 24 blocks deep. A starter landscape is created the first time a saved world is not available.

## Controls

| Input | Action |
| --- | --- |
| `W`, `A`, `S`, `D` | Move |
| Mouse | Look around |
| Space / Shift | Move up / down |
| Left click | Break the targeted block |
| Right click | Place the selected block |
| `1`–`9` or mouse wheel | Select a hotbar slot |
| `Tab` | Open or close inventory |
| `X` | Open or close the in-world script panel |
| `B` | Open the block shop |
| `Esc` | Release the mouse and close open panels |

Clicking the inventory, shop, script, or settings buttons opens its panel. Use the panel's close button to dismiss it.

## Inventory and shop

The inventory lets you put owned blocks into the selected hotbar slot. Breaking a block earns one coin. The shop uses coins to unlock additional blocks; coin totals, unlocked blocks, and hotbar slots are stored in this browser.

## World settings

The in-world Settings panel contains the sky, fog, field-of-view, and mouse-sensitivity controls. Changes are saved locally and shared with the Home page's browser settings.

## Export and import

The Settings panel contains two data options:

- **Export JSON** copies a JSON representation of the current world to the text box and attempts to copy it to the clipboard.
- **Import JSON** reads JSON pasted into that text box.
- **Download .bloxdschem** downloads the builder's world data with a `.bloxdschem` filename.
- **Import .bloxdschem** reads a selected `.bloxdschem` or JSON file.

The builder schematic payload is JSON containing:

```json
{
  "size": [24, 16, 24],
  "palette": ["..."],
  "world": ["..."]
}
```

The `world` array contains 9,216 palette indices, ordered by Y layer, then Z row, then X column. The importer checks the dimensions and block indices before applying the world.

> The `.bloxdschem` extension follows Bloxd's schematic filename convention. BloxdBuilder currently stores its own JSON world payload inside the file; this does not claim compatibility with every native Bloxd schematic encoding.

World data is saved in browser `localStorage` under `bloxd.world3d`. Export a backup before importing another world.
