# @blueprintui/compass

Internationalization (i18n) utilities for Web Component libraries.

## Installation

```bash
npm install @blueprintui/compass
```

## Usage

Compass provides a simple and efficient way to manage internationalization in your Web Components using Lit.

### Basic Usage

```typescript
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { i18n, I18nService } from '@blueprintui/compass';

@i18n({ key: 'actions' })
export class MyElement extends LitElement {
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  render() {
    return html`<button>${this.i18n.close}</button>`;
  }
}
```

### Customizing Translations

```typescript
import { I18nService } from '@blueprintui/compass';

// Set custom translations
I18nService.keys = {
  actions: {
    close: 'Cerrar',
    open: 'Abrir'
  }
};
```

### Using Template Interpolation

```typescript
import { matchInterpolate } from '@blueprintui/compass';

const template = 'Hello ${name}, you have ${count} messages';
const result = matchInterpolate(template, { name: 'John', count: 5 });
// Result: "Hello John, you have 5 messages"
```

## API

### `i18n` Decorator

A class decorator that automatically manages i18n updates for your component.

### `I18nService`

A service for managing global internationalization strings.

- `I18nService.keys`: Get the current i18n registry
- `I18nService.keys = {...}`: Set custom i18n values

### `I18nController`

A Lit reactive controller that handles i18n updates.

### Utilities

- `matchInterpolate(template, values)`: Interpolate template strings with dynamic values
- `getElementLanguageDirection(element)`: Get the language direction (ltr/rtl) of an element

## License

MIT
