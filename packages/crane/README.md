# @blueprintui/crane (beta)

### Simple and lightweight drag and drop Web Components and utilities.

[![npm version](https://badge.fury.io/js/@blueprintui%2Fcrane.svg)](https://badge.fury.io/js/@blueprintui%2Fcrane)

- [Documentation](https://blueprintui.dev/crane)
- [Stackblitz Demo](https://stackblitz.com/edit/blueprintui-crane)

## Install

### NPM
```bash
npm install @blueprintui/crane
```

### CDN
```javascript
import 'https://cdn.jsdelivr.net/npm/@blueprintui/crane@0.0.0/include/crane.js/+esm';
```

## Usage

```html
<bp-crane>
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
  <bp-dropzone></bp-dropzone>
</bp-crane>
```

```javascript
import '@blueprintui/crane/include/crane.js';

document.querySelector('bp-crane').addEventListener('bp-crane-drop', e => {
  e.detail.target.parentElement.insertBefore(e.detail.source, e.detail.target);
});
```

## Components

- `bp-crane`
- `bp-dropzone`


## Events

| Event            | Description                              | Detail Return Type       |
| ---------------- | ---------------------------------------- | ------------------------ |
| `bp-crane-start` | user starts dragging an item             | `BpDraggableChangeEvent` |
| `bp-crane-enter` | item enters valid drop target            | `BpDraggableChangeEvent` |
| `bp-crane-leave` | item leaves valid drop target            | `BpDraggableChangeEvent` |
| `bp-crane-end`   | drag operation ends                      | `BpDraggableChangeEvent` |
| `bp-crane-drop`  | item is dropped on a valid drop target   | `BpDraggableChangeEvent` |
| `bp-crane-over`  | item is dragged over a valid drop target | `BpDraggableChangeEvent` |
| `bp-crane-drag`  | item is dragged                          | `BpDraggableChangeEvent` |

### Event Detail

```typescript
interface BpDraggableChangeEvent {
  source?: HTMLElement;
  target?: HTMLElement;
  type: 'start' | 'drag' | 'over' | 'drop' | 'enter' | 'leave' | 'end';
  interaction?: 'pointer' | 'key';
}
```
