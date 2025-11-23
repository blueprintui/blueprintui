# BlueprintUI Custom ESLint Rules

Custom ESLint rules to enforce architectural consistency and API conventions specific to BlueprintUI's design principles.

## Overview

This package provides 15 custom ESLint rules organized into the following categories:

1. **TypeScript/Component Patterns** - Enforce Lit component conventions
2. **Event Patterns** - Validate event naming and emission patterns
3. **HTML Template Patterns** - Validate template structure and accessibility
4. **Property Patterns** - Enforce property decorator conventions

---

## All Rules

| Rule | Severity | Description |
|------|----------|-------------|
| `no-reserved-property-names` | error | Prevents property names conflicting with HTMLElement prototype |
| `no-invalid-event-names` | error | Enforces lowercase kebab-case event names |
| `no-reserved-event-names` | error | Prevents overriding native HTMLElement events |
| `no-stateful-properties` | error | Prevents internal mutation of public @property declarations |
| `no-complex-properties` | error | Restricts @property types to primitives (no Object/Array) |
| `no-unknown-event-names` | error | Whitelist-based event name validation |
| `require-accessor-keyword` | error | Requires accessor keyword with @property decorators |
| `no-reflect-state-properties` | error | Prevents reflect: true on ElementInternals-managed states |
| `no-stateful-event-emission` | error | Prevents dispatching events from setters/lifecycle methods |
| `aria-label-i18n` | error | Requires i18n values for aria-label attributes |
| `no-event-verb-prefix` | error | Prevents verb prefixes (on, before, after) in event names |
| `require-property-type` | error | Requires type specification in @property decorators |
| `require-visual-property-reflect` | error | Suggests reflect: true for visual properties |
| `controller-decorator-naming` | error | Enforces naming convention for controller decorators |
| `require-part-internal` | error | Requires part="internal" wrapper in render templates |

---

## Rule Details

### `no-reserved-property-names`

**Severity:** error

Prevents property names that conflict with the HTMLElement prototype (e.g., `title`, `hidden`, `style`, ARIA properties).

```typescript
// ❌ BAD
@property({ type: String }) accessor title: string;

// ✅ GOOD
@property({ type: String }) accessor heading: string;
```

---

### `no-invalid-event-names`

**Severity:** error

Events must be lowercase and use kebab-case for DOM API compatibility.

```typescript
// ❌ BAD
this.dispatchEvent(new CustomEvent('myEvent'));
this.dispatchEvent(new CustomEvent('my_event'));

// ✅ GOOD
this.dispatchEvent(new CustomEvent('my-event'));
```

---

### `no-reserved-event-names`

**Severity:** error

Prevents overriding native HTMLElement events (e.g., `click`, `focus`, `change`).

```typescript
// ❌ BAD - conflicts with native events
@event() change: EventEmitter;

// ✅ GOOD
@event() valueChange: EventEmitter;
```

---

### `no-stateful-properties`

**Severity:** error  
**Options:** `{ exclude: ['value'] }`

Prevents internal mutation of public @property declarations. Properties should be set externally, not mutated internally.

```typescript
// ❌ BAD
@property({ type: Boolean }) accessor expanded = false;

toggle() {
  this.expanded = !this.expanded; // Mutating public property internally
}

// ✅ GOOD - use @state for internal state
@state() accessor _expanded = false;
```

---

### `no-complex-properties`

**Severity:** error  
**Options:** `{ exclude: ['i18n'] }`

Restricts @property types to primitives. Objects and Arrays should not be used as property types to ensure proper attribute handling.

```typescript
// ❌ BAD
@property({ type: Object }) accessor config: Config;
@property({ type: Array }) accessor items: Item[];

// ✅ GOOD - use primitives or excluded properties
@property({ type: String }) accessor value: string;
@property({ type: Object }) accessor i18n: I18nConfig; // excluded
```

---

### `no-unknown-event-names`

**Severity:** error  
**Options:** `{ include: [...allowedEvents] }`

Whitelist-based validation ensuring only approved event names are dispatched.

```typescript
// ❌ BAD - if 'custom-event' not in whitelist
this.dispatchEvent(new CustomEvent('custom-event'));

// ✅ GOOD - whitelisted events
this.dispatchEvent(new CustomEvent('open'));
this.dispatchEvent(new CustomEvent('close'));
```

**Current whitelist:**
- `bp-touchstart`, `bp-touchmove`, `bp-touchend`
- `bp-keychange`, `bp-slotchange`, `bp-textchange`
- `bp-virtual-change`, `bp-virtual-scroll`
- `resize-layout`, `resize-input`
- `size`, `open`, `close`, `complete`, `copy`

---

### `require-accessor-keyword`

**Severity:** error

All @property decorators must use the `accessor` keyword for proper Lit 3.x class field semantics.

```typescript
// ❌ BAD - missing accessor keyword
@property({ type: String }) status: string;
@property({ type: Boolean }) disabled = false;

// ✅ GOOD - accessor keyword present
@property({ type: String }) accessor status: string;
@property({ type: Boolean }) accessor disabled = false;
```

**Why:** The `accessor` keyword is required for Lit's reactive property system to work correctly with TypeScript class fields. Omitting it causes runtime issues with property updates.

---

### `no-reflect-state-properties`

**Severity:** error  
**Options:** `{ exclude: ['selected'] }`

State properties managed by ElementInternals should NOT use `reflect: true`. These states use Custom States API (`:state(disabled)`) instead of attributes.

**Checked properties:** `disabled`, `readonly`, `checked`, `selected`, `expanded`, `pressed`, `active`, `indeterminate`

```typescript
// ❌ BAD - disabled is managed by ElementInternals
@property({ type: Boolean, reflect: true }) accessor disabled = false;

// ✅ GOOD - no reflection for controller-managed state
@property({ type: Boolean }) accessor disabled = false;
```

**Why:** These states are managed via Custom States API (`:state(disabled)`) and ElementInternals, not HTML attributes. Reflecting them creates redundant DOM attributes and potential state sync issues.

---

### `no-stateful-event-emission`

**Severity:** error

Events should only be dispatched from user interaction handlers, not from property setters or lifecycle methods.

**Checked methods:** `updated`, `firstUpdated`, `willUpdate`, `connectedCallback`, `attributeChangedCallback`

```typescript
// ❌ BAD - emitting from property setter
set expanded(value: boolean) {
  this._expanded = value;
  this.dispatchEvent(new CustomEvent('expand')); // Fires on programmatic change!
}

// ❌ BAD - emitting from lifecycle method
updated(props) {
  if (props.has('open')) {
    this.dispatchEvent(new CustomEvent('open'));
  }
}

// ✅ GOOD - emit from user interaction handler only
#handleClick() {
  this.expanded = !this.expanded;
  this.dispatchEvent(new CustomEvent(this.expanded ? 'open' : 'close'));
}
```

**Why:** Emitting events on state changes (not user actions) causes rendering loops and noise. If a consumer sets `expanded = true`, don't fire an `expand` event.

---

### `aria-label-i18n`

**Severity:** error  
**Applied to:** Source files only (`**/src/**/element.ts`, `**/src/**/*.controller.ts`)

Interactive elements with `aria-label` should use i18n service values, not hardcoded strings.

```typescript
// ❌ BAD - hardcoded aria-label
html`<button aria-label="Close">X</button>`;

// ✅ GOOD - i18n-based aria-label
html`<button aria-label=${this.i18n.close}>X</button>`;
```

**Why:** Ensures accessibility labels are translatable.

---

### `no-event-verb-prefix`

**Severity:** error  
**Options:** `{ additionalPrefixes: [...] }`

Custom events should not use verb prefixes like `on`, `did`, `will`, `before`, `after`. Events should be state-based, not action-based.

**Checked prefixes:** `on`, `before`, `after`, `will`, `did`

```typescript
// ❌ BAD - action verb prefixes
this.dispatchEvent(new CustomEvent('onOpen'));
this.dispatchEvent(new CustomEvent('beforeClose'));
this.dispatchEvent(new CustomEvent('didUpdate'));

// ✅ GOOD - state-based event names
this.dispatchEvent(new CustomEvent('open'));
this.dispatchEvent(new CustomEvent('close'));
this.dispatchEvent(new CustomEvent('update'));
```

**Why:** Per the API guide, events should be state-based. Framework bindings handle the "on" prefix automatically.

---

### `require-property-type`

**Severity:** error

All @property decorators should specify the `type` option for proper attribute handling.

```typescript
// ❌ BAD - missing type specification
@property() accessor value: string;
@property({ reflect: true }) accessor status: 'success' | 'error';

// ✅ GOOD - explicit type specified
@property({ type: String }) accessor value: string;
@property({ type: String, reflect: true }) accessor status: 'success' | 'error';
```

**Why:** Lit uses the type for attribute/property conversion. Without explicit types, attributes may not deserialize correctly from HTML.

---

### `require-visual-property-reflect`

**Severity:** error  
**Options:** `{ properties: [...], exclude: [...] }`

Visual/semantic properties should use `reflect: true` for CSS selector targeting.

**Checked properties:** `status`, `action`, `size`, `position`, `layout`, `orientation`, `shape`, `variant`

```typescript
// ❌ BAD - status used for CSS styling, should reflect
@property({ type: String }) accessor status: 'accent' | 'success';

// ✅ GOOD - visual properties reflect for CSS selectors
@property({ type: String, reflect: true }) accessor status: 'accent' | 'success';
```

**Why:** Visual variants need to be reflected as attributes to enable CSS styling via `[status='success']` selectors.

---

### `controller-decorator-naming`

**Severity:** error  
**Options:** `{ additionalControllers: ['draggableList'] }`

Controller decorators must follow the naming pattern `@[category][Name]<T>()` where category is `state`, `type`, `interaction`, or `i18n`.

**Valid prefixes:** `state`, `type`, `interaction`, `i18n`, `keynav`, `ariaMenu`, `dynamicControllers`

```typescript
// ❌ BAD - inconsistent naming
@disabled<BpButton>()
@buttonType<BpButton>()
@handleClick<BpButton>()

// ✅ GOOD - follows category prefix pattern
@stateDisabled<BpButton>()
@typeButton<BpButton>()
@interactionClick<BpButton>()
```

**Known controllers:**
- **State:** `stateDisabled`, `stateChecked`, `stateExpanded`, `stateReadonly`, `stateSelected`, `stateActive`, `statePressed`, `stateScrollLock`, `stateDirection`, `stateTextContent`
- **Type:** `typeButton`, `typeAnchor`, `typeClosable`, `typeGroup`, `typeMenu`, `typePopover`, `typeNavigation`, `typeRegion`, `typeCommandTrigger`, `typePopoverTrigger`, `typeFormRadio`, `typeFormCheckbox`, `typeMultiselectable`
- **Interaction:** `interactionClick`, `interactionTouch`, `interactionResponsive`, `interactionSelect`, `interactionExpand`, `interactionRangeSelection`, `interactionTextChange`, `interactionResizeContext`
- **Other:** `i18n`, `keynav`, `ariaMenu`, `dynamicControllers`

---

### `require-part-internal`

**Severity:** error  
**Options:** `{ exclude: ['BpCrane', 'BpDropzone', 'BpGridCell', 'BpGridHeader', 'BpGridRow', 'BpCheckbox', 'BpRadio', 'BpSwitch'] }`

Component templates should include a `part="internal"` wrapper element for proper styling isolation.

```typescript
// ❌ BAD - no internal wrapper
render() {
  return html`
    <slot></slot>
    <button>Click</button>
  `;
}

// ✅ GOOD - internal wrapper present
render() {
  return html`
    <div part="internal">
      <slot></slot>
      <button>Click</button>
    </div>
  `;
}
```

**Why:** BlueprintUI uses `[part="internal"]` as the primary styling target, keeping `:host` reserved for display properties and CSS custom property declarations.

---

## Configuration

The rules are configured in `src/configs/rules.js`:

```javascript
// eslint.config.js
export default [
  {
    plugins: {
      rules: rulesPlugin
    },
    rules: {
      // High priority (errors)
      'rules/no-reserved-property-names': 'error',
      'rules/no-invalid-event-names': 'error',
      'rules/no-reserved-event-names': 'error',
      'rules/no-stateful-properties': ['error', { exclude: ['value'] }],
      'rules/no-complex-properties': ['error', { exclude: ['i18n'] }],
      'rules/no-unknown-event-names': ['error', {
        include: [
          'bp-touchstart', 'bp-touchmove', 'bp-touchend',
          'bp-keychange', 'bp-slotchange', 'bp-textchange',
          'bp-virtual-change', 'bp-virtual-scroll',
          'resize-layout', 'resize-input',
          'size', 'open', 'close', 'complete', 'copy'
        ]
      }],
      'rules/require-accessor-keyword': 'error',
      'rules/no-reflect-state-properties': ['error', { exclude: ['selected'] }],
      'rules/no-stateful-event-emission': 'error',

      // Medium priority (errors)
      'rules/no-event-verb-prefix': 'error',
      'rules/require-property-type': 'error',
      'rules/require-visual-property-reflect': 'error',
      'rules/controller-decorator-naming': ['error', { additionalControllers: ['draggableList'] }],
      'rules/require-part-internal': ['error', {
        exclude: ['BpCrane', 'BpDropzone', 'BpGridCell', 'BpGridHeader', 'BpGridRow', 'BpCheckbox', 'BpRadio', 'BpSwitch']
      }]
    }
  },
  // Source-only rules (not applied to tests)
  {
    files: ['**/src/**/element.ts', '**/src/**/*.controller.ts'],
    rules: {
      'rules/aria-label-i18n': 'error'
    }
  }
];
```

---

## File Structure

```
projects/internals/eslint/
├── src/
│   ├── rules/
│   │   ├── aria-label-i18n.js
│   │   ├── controller-decorator-naming.js
│   │   ├── no-complex-properties.js
│   │   ├── no-event-verb-prefix.js
│   │   ├── no-invalid-event-names.js
│   │   ├── no-reflect-state-properties.js
│   │   ├── no-reserved-event-names.js
│   │   ├── no-reserved-property-names.js
│   │   ├── no-stateful-event-emission.js
│   │   ├── no-stateful-properties.js
│   │   ├── no-unknown-event-names.js
│   │   ├── require-accessor-keyword.js
│   │   ├── require-part-internal.js
│   │   ├── require-property-type.js
│   │   └── require-visual-property-reflect.js
│   ├── configs/
│   │   └── rules.js
│   └── index.js
└── README.md
```

---

## References

- [BlueprintUI Repository](https://github.com/blueprintui/blueprintui)
- [Reusable UI Component API Guide](https://github.com/coryrylan/reusable-ui-component-api-guide)
- [ESLint Custom Rules Documentation](https://eslint.org/docs/latest/extend/custom-rules)
- [Lit Documentation](https://lit.dev)
- [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest)
