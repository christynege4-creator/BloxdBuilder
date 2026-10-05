# Settings and `settings.lua`

BloxdBuilder has browser settings on the Home page and a separate Lua reference module for Lua-based Bloxd scripts.

## Browser settings

Open **Settings** in the navigation or visit `/index.html#settings`. Choose:

| Setting | Options | Default |
| --- | --- | --- |
| Appearance | Dark or light | Dark |
| Default sky | Day or night | Day |
| Fog | Enabled or disabled | Enabled |
| Field of view | 60–100 | 75 |
| Mouse sensitivity | 0.5–2, in 0.1 steps | 1.0 |

These preferences are saved on this device in `localStorage` under `bloxd.settings`. The World Builder reads the sky, fog, field-of-view, and sensitivity values when it opens.

## Lua preset

The **Lua settings preset** section on Home displays the contents of [`settings.lua`](./settings.lua). Use its download link to save the file for a Lua script project.

The Lua file is a reference/module for Lua environments; the browser settings page does not run Lua and the downloaded module does not automatically synchronize with `bloxd.settings`.

### Available defaults

```lua
theme = "dark"
sky = "day"
fog = true
fov = 75
sens = 1
```

### Module functions

| Function | Purpose |
| --- | --- |
| `settings.load(saved)` | Load valid values from a table; use defaults for missing or invalid values. |
| `settings.get(key)` | Read a currently loaded value. |
| `settings.set(key, value)` | Set a supported value; returns `false` if the key or value is invalid. |
| `settings.reset()` | Restore every setting to its default. |
| `settings.all()` | Return a shallow copy of the current values. |
| `settings.printAll()` | Print each current key and value. |

Supported values are `theme = "dark"` or `"light"`, `sky = "day"` or `"night"`, a boolean `fog`, `fov` from 60 through 100, and `sens` from 0.5 through 2.

### Example

```lua
local settings = require("settings")

settings.set("sky", "night")
settings.set("fov", 90)

local current = settings.all()
print("Sky:", current.sky)
settings.printAll()
```

The module's `require("settings")` path depends on the Lua environment's module-loading rules. Adjust the require path if your project stores the file in a subfolder.
