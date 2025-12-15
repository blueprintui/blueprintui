# @blueprintui/virtual

### Zero-dependency virtual scrolling Web Component

[![npm version](https://badge.fury.io/js/@blueprintui%2Fvirtual-list.svg)](https://badge.fury.io/js/@blueprintui%2Fvirtual-list)

- [Documentation](https://blueprintui.dev)
- [Stackblitz Demo](https://stackblitz.com/edit/blueprintui-virtual-list)

## Install

### NPM
```bash
npm install @blueprintui/virtual
```

### CDN
```javascript
import 'https://cdn.jsdelivr.net/npm/@blueprintui/virtual@1.0.0/include/virtual-list.js/+esm';
```

## Usage

```html
<bp-virtual-list id="list" height="400px" item-height="44" item-count="10000">
</bp-virtual-list>
```

```javascript
import '@blueprintui/virtual/include/virtual-list.js';

const list = document.getElementById('list');
const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Item ${i}` }));

list.addEventListener('bp-range-change', ({ detail: { start, end } }) => {
  list.innerHTML = data.slice(start, end)
    .map(item => `<div class="item">${item.name}</div>`)
    .join('');
});
```

## Features

- **Zero Dependencies** - Vanilla Web Component with no external dependencies
- **High Performance** - GPU-accelerated transforms with requestAnimationFrame throttling
- **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JavaScript
- **Minimal API** - Simple event-driven architecture

## API

### Properties / Attributes

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `itemHeight` | `item-height` | `number` | `44` | Fixed height per item in pixels |
| `itemCount` | `item-count` | `number` | `0` | Total items in dataset |
| `overscan` | `overscan` | `number` | `3` | Buffer items outside viewport |
| `height` | `height` | `string` | `'auto'` | Container height (CSS value) |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `bp-range-change` | `{ start: number, end: number, count: number }` | Visible range updated |
| `bp-scroll` | `{ scrollTop: number, direction: 'up' \| 'down' \| 'idle' }` | Scroll position changed |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `scrollToIndex` | `(index: number, behavior?: ScrollBehavior) => void` | Scroll to item at index |
| `refresh` | `() => void` | Force recalculation of visible range |

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--bp-virtual-list-height` | `auto` | Container height |
| `--bp-virtual-list-scrollbar-width` | `auto` | Scrollbar width |
| `--bp-virtual-list-scrollbar-color` | `auto` | Scrollbar color |

## Examples

### Scroll to Index

```javascript
// Instant jump
list.scrollToIndex(500);

// Smooth scroll
list.scrollToIndex(500, 'smooth');
```

### Custom Overscan

```html
<!-- Render 10 extra items outside viewport for smoother scrolling -->
<bp-virtual-list overscan="10" item-height="44" item-count="10000" height="400px">
</bp-virtual-list>
```

### Styled Scrollbar

```html
<bp-virtual-list
  item-height="44"
  item-count="10000"
  height="400px"
  style="--bp-virtual-list-scrollbar-width: thin; --bp-virtual-list-scrollbar-color: #888 #f0f0f0;">
</bp-virtual-list>
```

### Dynamic Item Count

```javascript
// Update item count when data changes
list.itemCount = newData.length;
list.refresh();
```

## How It Works

The component's sole responsibility is **virtualization math**:

1. Track scroll position
2. Calculate visible index range
3. Emit range change events

Rendering is the consumer's responsibility. This enables maximum flexibility - you can render any content type (DOM elements, canvas, WebGL) in response to range changes.

## Performance Tips

1. **Match item height** - Ensure rendered items match the `itemHeight` property exactly
2. **Use keys** - When using frameworks, use stable keys for rendered items
3. **Limit overscan** - Higher overscan values render more items (3-5 is usually optimal)
4. **Recycle DOM** - Consider reusing DOM elements instead of recreating them

## Browser Support

- Chrome 77+
- Firefox 63+
- Safari 15.4+
- Edge 79+

Requires support for:
- Custom Elements v1
- Shadow DOM v1
- ElementInternals
