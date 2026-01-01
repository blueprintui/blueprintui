# Popover Mixin

## Native Popover Type Behaviors

| Behavior                  | auto           | hint         | manual |
| ------------------------- | -------------- | ------------ | ------ |
| Escape key closes         | ✅             | ✅           | ❌     |
| Click outside closes      | ✅             | ✅           | ❌     |
| Opens → closes other auto | ✅             | ❌           | ❌     |
| Multiple can coexist      | ⚠️ nested only | ⚠️ with auto | ✅     |

## Component Behaviors

| Component | Popover Type | Focus Trap | Modal Default | Scroll Lock |
| --------- | ------------ | ---------- | ------------- | ----------- |
| Tooltip   | `hint`       | ❌         | ❌            | ❌          |
| Toggletip | `auto`       | ❌         | ❌            | ❌          |
| Toast     | `manual`     | ❌         | ❌            | ❌          |
| Dropdown  | `auto`       | ⚠️ managed | ❌            | ❌          |
| Drawer    | `auto`       | ✅         | ✅            | ✅          |
| Dialog    | `auto`       | ✅         | ✅            | ✅          |
