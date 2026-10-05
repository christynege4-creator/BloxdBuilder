-- BloxdBuilder settings module.
-- Use this module from another Lua script with: local settings = require("settings")

local defaults = {
  theme = "dark",
  sky = "day",
  fog = true,
  fov = 75,
  sens = 1,
}

local values = {}

local function isValid(key, value)
  if key == "theme" then
    return value == "dark" or value == "light"
  elseif key == "sky" then
    return value == "day" or value == "night"
  elseif key == "fog" then
    return type(value) == "boolean"
  elseif key == "fov" then
    return type(value) == "number" and value >= 60 and value <= 100
  elseif key == "sens" then
    return type(value) == "number" and value >= 0.5 and value <= 2
  end

  return false
end

local function load(saved)
  for key, defaultValue in pairs(defaults) do
    local savedValue = nil
    if type(saved) == "table" then
      savedValue = saved[key]
    end

    if isValid(key, savedValue) then
      values[key] = savedValue
    else
      values[key] = defaultValue
    end
  end

  return values
end

local function get(key)
  return values[key]
end

local function set(key, value)
  if defaults[key] == nil or not isValid(key, value) then
    return false
  end

  values[key] = value
  return true
end

local function reset()
  for key, defaultValue in pairs(defaults) do
    values[key] = defaultValue
  end

  return values
end

local function all()
  local copy = {}
  for key, value in pairs(values) do
    copy[key] = value
  end
  return copy
end

local function printAll()
  for key, value in pairs(values) do
    print(key .. " = " .. tostring(value))
  end
end

load()

return {
  defaults = defaults,
  load = load,
  get = get,
  set = set,
  reset = reset,
  all = all,
  printAll = printAll,
}
