# @blueprintui/orbit

Lightweight CSS anchor positioning and popover mixin for web components.

## Features

- **Zero dependencies** - No Lit, no external packages required
- **Framework agnostic** - Works with any web component base class (HTMLElement, LitElement, etc.)
- **CSS Anchor Positioning** - Built-in support for CSS anchor positioning API
- **Popover API** - Leverages native Popover API with enhanced functionality
- **Focus Management** - Includes focus trap and focusable item utilities
- **Scroll Lock** - Optional scroll locking for modal popovers
- **TypeScript** - Full TypeScript support with type definitions

## Installation

```bash
npm install @blueprintui/orbit
```

## Usage

### PopoverMixin

```typescript
import { PopoverMixin } from '@blueprintui/orbit/popover';

class MyPopover extends PopoverMixin(HTMLElement) {
  get popoverConfig() {
    return {
      type: 'auto',
      modal: false,
      focusTrap: false,
      scrollLock: false
    };
  }
}

customElements.define('my-popover', MyPopover);
```

### CSS Anchor Positioning

```typescript
import { setupCSSAnchor, getPositionArea } from '@blueprintui/orbit/anchor';

const anchor = document.querySelector('#my-anchor');
const target = document.querySelector('#my-target');

setupCSSAnchor(anchor, target);
target.style.positionArea = getPositionArea('bottom-start');
```

### Focus Management

```typescript
import { createFocusTrap, getFlattenedFocusableItems } from '@blueprintui/orbit/focus';

const dialog = document.querySelector('dialog');
createFocusTrap(dialog);

const focusableItems = getFlattenedFocusableItems(dialog);
focusableItems[0]?.focus();
```

### Scroll Lock

```typescript
import { enableScrollLock, disableScrollLock } from '@blueprintui/orbit/scroll-lock';

// Lock scrolling
enableScrollLock();

// Unlock scrolling
disableScrollLock();
```

## License

MIT License - see LICENSE.md for details
