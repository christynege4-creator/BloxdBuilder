# Script Editor

Open **Script Editor** from the navigation or visit `/script-editor`. The editor provides JavaScript completion, a local code helper, and a preview runner for BloxdBuilder worlds.

## Editing and running code

- **Run** evaluates the current JavaScript in this browser and writes `console` output to the Console output panel.
- **Save** stores the current text in browser `localStorage` as `bloxd.script`.
- **Reset** asks for confirmation, restores the sample script, and removes the saved `bloxd.script` value.
- **Copy code** copies the editor contents to the clipboard when the browser permits it.
- **Download .js** downloads the current editor contents as `bloxd-script.js`.

Edits are not automatically saved: use **Save** before leaving if you want to keep them.

## World preview API

The local runner provides an `api` object for BloxdBuilder's saved 24 × 16 × 24 world:

| API | Description |
| --- | --- |
| `api.size` | World dimensions as `[width, height, depth]`. |
| `api.blocks` | Available block names. |
| `api.getBlock(x, y, z)` | Return a block name, or `null` when the position is empty or outside the world. |
| `api.setBlock(x, y, z, name)` | Set a valid block at an in-bounds position. |

Block names include `grass`, `dirt`, `stone`, `wood`, `leaves`, `water`, `sand`, `gold`, `bedrock`, `glass`, `brick`, `snow`, `sandstone`, and `ice`.

Example:

```js
const [width, height, depth] = api.size;
const y = Math.min(height - 1, 8);

for (let x = 10; x < 14; x++) {
  for (let z = 10; z < 14; z++) {
    api.setBlock(x, y, z, "gold");
  }
}

console.log("World size:", width, height, depth);
```

## Suggestions and Bloxd GameApi

Typing a member prefix such as `api.` opens the completion list. The installed declarations at `node_modules/@bloxd/index.d.ts` provide Bloxd GameApi methods, signatures, and documentation. Select a suggestion with the arrow keys and accept it with `Enter` or `Tab`; method snippets include required-argument tab stops. Use `Ctrl+Space` to request suggestions explicitly.

Bloxd GameApi suggestions are for scripts run in Bloxd's GameApi environment. The BloxdBuilder local preview only implements the four world-preview members documented above; it does not simulate every Bloxd game method.

## Local assistant

The right-hand Assistant panel provides local code templates for common structures, a basic syntax check, and code explanations. Generated code can be inserted into the editor. This built-in helper uses local recipes and checks; it is not a connected cloud AI service.

The current script is available to the helper for its local checks and explanations. Review generated code before running it.
