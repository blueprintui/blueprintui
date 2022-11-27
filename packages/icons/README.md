# @blueprintui/icons

[![npm version](https://badge.fury.io/js/@blueprintui%2Ficons.svg)](https://badge.fury.io/js/@blueprintui%2Ficons)

BlueprintUI Icons provides a flexible, extensible, and easy-to-use set of icons for use in any web UI.

- 400+ Open Source Svg Icons from [Clarity Design](https://clarity.design)
- Lightweight and Fully Tree-Shakable
- Web Components that work in any framework

```typescript
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/user.js';
```

```html
<bp-icon shape="user"></bp-icon>
```

## Customization

```typescript
import { IconService } from '@blueprintui/icons';

IconService.add({
  name: 'logo',
  type: {
    default: '...svg...',
    solid: '...svg...'
  }
});
```

```html
<bp-icon shape="logo" type="solid"></bp-icon>
```