---
description: TypeScript Guidance and Best Practices for BlueprintUI
globs: *.ts
alwaysApply: false
---

# TypeScript Coding Guidelines for BlueprintUI

These guidelines ensure consistent TypeScript code across the BlueprintUI Web Components library. Follow these patterns when writing TypeScript for components, controllers, utilities, and tests.

## Import Conventions

### Module Imports

- Use explicit `.js` extensions for local imports (TypeScript outputs `.js` files)
- Import CSS files with `with { type: 'css' }` syntax
- Avoid default exports; use named exports
- Group imports: external packages, internal packages, relative imports

```typescript
// External packages
import { LitElement, html, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';

// Internal packages
import { baseStyles, attachInternals } from '@blueprintui/components/internals';

// Relative imports with .js extension
import { BpAccordionHeader } from '../header/element.js';

// CSS imports
import styles from './element.css' with { type: 'css' };
```

## Component Patterns

### Basic Component Structure

```typescript
@customDecorator<BpComponent>()
export class BpComponent extends LitElement implements Pick<BpTypeElement, keyof BpComponent> {
  // Static properties first
  static styles = [baseStyles, styles];
  static formAssociated = true; // if form control

  // Properties with accessor keyword and decorators
  @property({ type: String, reflect: true }) accessor status: 'success' | 'error' = 'success';
  @property({ type: Boolean }) accessor disabled = false;
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  // Private properties with # prefix
  #privateProperty = 'value';

  // Getters for internal element references
  get #internalElement() {
    return this.querySelector<Element>('selector');
  }

  // ElementInternals reference
  /** @private */
  _internals: ElementInternals;

  // Render method
  render() {
    return html`<div part="internal">${this.content}</div>`;
  }

  // Lifecycle methods in order
  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.states.add('bp-layer');
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    // React to property changes
  }
}
```

## Property Decorators

### Use `accessor` keyword with `@property`

```typescript
// Always use accessor for reactive properties
@property({ type: String }) accessor name = 'default';
@property({ type: Boolean }) accessor disabled = false;

// Reflect to attribute when needed for CSS selectors
@property({ type: String, reflect: true }) accessor size: 'sm' | 'md' | 'lg';
```

## TypeScript Patterns

### Type Imports and Exports

```typescript
// Pick pattern for implementing interfaces
export class Component extends LitElement implements Pick<BpTypeElement, keyof Component> {
  // Implementation inherits only the properties that exist on Component
}
```

### Generic Constraints

```typescript
// Use generic constraints for decorators and controllers
export function decorator<T extends BaseType>(config?: Config): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T) => new Controller(instance));
}
```

## Controller Pattern

### Reactive Controller Structure

```typescript
export class CustomController<T extends HostElement> implements ReactiveController {
  // Use # for truly private properties
  #observers: MutationObserver[] = [];

  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    // Setup logic
  }

  hostDisconnected() {
    // Cleanup observers
    this.#observers.forEach(observer => observer.disconnect());
  }
}
```

## Event Handling

### Custom Events

```typescript
// Always use createCustomEvent utility
import { createCustomEvent } from '@blueprintui/components/internals';

// Dispatch with proper typing
this.dispatchEvent(
  createCustomEvent('event-name', {
    detail: { data: 'value' },
    bubbles: true,
    composed: true
  })
);
```

### Event Listeners

```typescript
// Bind methods properly
#clickHandler = this.#handleClick.bind(this);

// Clean up in disconnectedCallback
disconnectedCallback() {
  this.removeEventListener('click', this.#clickHandler);
}
```

## Slot Patterns

### Content Projection

```html
<!-- ✅ REQUIRED: Primary data via slot -->
<bp-button>Click me</bp-button>

<!-- ❌ VIOLATION: Primary data via property -->
<bp-button label="Click me"></bp-button>
```

### Named Slots

- Use descriptive slot names
- Document slot purpose in examples
- Match patterns from similar components

## Internationalization (i18n)

### I18nService Usage

```typescript
// ✅ REQUIRED for user-facing strings
import { I18nService } from '@blueprintui/components/internals';

get closeLabel() {
  return I18nService.keys.close;
}
```

## State Management

### Internal State Updates

```typescript
// Use _internals.states for CSS state
this._internals.states.add('focused');
this._internals.states.delete('disabled');

// Toggle helper usage
import { toggleState } from '@blueprintui/components/internals';
toggleState(this._internals, 'checked', this.checked);
```

## Code Style

### Naming Conventions

- Classes: PascalCase with `Bp` prefix (e.g., `BpDialog`)
- Private methods/properties: # prefix (e.g., `#privateMethod`)
- Interfaces: PascalCase, often prefixed with type (e.g., `BpTypeElement`)

### Comments and Documentation

```typescript
/**
 * @element bp-component
 * @since 1.0.0
 * @event open - dispatched when opened
 * @slot - default slot for content
 * @cssprop --padding - component padding
 */
export class BpComponent extends LitElement {
  /** Determines component state */
  @property() accessor state: string;

  /** @private */
  _internals: ElementInternals;
}
```
