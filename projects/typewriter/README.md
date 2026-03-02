# @blueprintui/typewriter

[![npm version](https://badge.fury.io/js/@blueprintui%2Ftypewriter.svg)](https://badge.fury.io/js/@blueprintui%2Ftypewriter)

- [Documentation](https://blueprintui.dev/typewriter)

## Simple and lightweight key navigation utilities and components.

```bash
npm install @blueprintui/typewriter
```

## Inline Navigation

`bp-keynav-list` with `layout="inline"` creates a horizontal key navigation list. The `loop` attribute will loop focus when the user reaches the end of the list.

```html
<script type="module">
  import '@blueprintui/typewriter/include/keynav-list.js';
</script>
<bp-keynav-list layout="inline" loop>
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keynav-list>
```

## Block Navigation

`bp-keynav-list` with `layout="block"` creates a vertical key navigation list useful for menus and vertical item lists.

```html
<script type="module">
  import '@blueprintui/typewriter/include/keynav-list.js';
</script>
<bp-keynav-list layout="block" loop>
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keynav-list>
```

## Grid Navigation

`bp-keynav-list` with `layout="grid"` follows the ARIA [grid navigation](https://w3c.github.io/aria-practices/#gridNav_focus) patterns. It computes the number of columns from the CSS `grid-template-columns` property. If columns are dynamic, set the column count explicitly with `<bp-keynav-list columns="4">`.

```html
<script type="module">
  import '@blueprintui/typewriter/include/keynav-list.js';
</script>
<bp-keynav-list layout="grid" columns="4">
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
</bp-keynav-list>
```

## KeynavController

The `KeynavController` can be used as a Lit reactive controller for custom components that need key navigation behavior.

```typescript
import { KeynavController } from '@blueprintui/typewriter';
```