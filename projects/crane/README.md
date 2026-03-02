# @blueprintui/crane

### Simple and lightweight drag and drop Web Components and utilities.

[![npm version](https://badge.fury.io/js/@blueprintui%2Fcrane.svg)](https://badge.fury.io/js/@blueprintui%2Fcrane)

- [Documentation](https://blueprintui.dev/crane)

## Install

```bash
npm install @blueprintui/crane
```

## Usage

```html
<bp-draggable-list>
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
  <bp-draggable-dropzone></bp-draggable-dropzone>
</bp-draggable-list>
```

```javascript
import '@blueprintui/crane/include/draggable-list.js';

document.querySelector('bp-draggable-list').addEventListener('bp-draggable-drop', e => {
  e.detail.target.parentElement.insertBefore(e.detail.source, e.detail.target);
});
```

## Components

- `bp-draggable-list`
- `bp-draggable-dropzone`


## Events

| Event               | Description                              | Detail Return Type       |
| ------------------- | ---------------------------------------- | ------------------------ |
| `bp-draggable-start` | user starts dragging an item             | `BpDraggableChangeEvent` |
| `bp-draggable-enter` | item enters valid drop target            | `BpDraggableChangeEvent` |
| `bp-draggable-leave` | item leaves valid drop target            | `BpDraggableChangeEvent` |
| `bp-draggable-end`   | drag operation ends                      | `BpDraggableChangeEvent` |
| `bp-draggable-drop`  | item is dropped on a valid drop target   | `BpDraggableChangeEvent` |
| `bp-draggable-over`  | item is dragged over a valid drop target | `BpDraggableChangeEvent` |
| `bp-draggable-drag`  | item is dragged                          | `BpDraggableChangeEvent` |

### Event Detail

```typescript
interface BpDraggableChangeEvent {
  source?: HTMLElement;
  target?: HTMLElement;
  type: 'start' | 'drag' | 'over' | 'drop' | 'enter' | 'leave' | 'end';
  interaction?: 'pointer' | 'key';
}
```
