# BlueprintUI Custom ESLint Rules Proposal

This document proposes custom ESLint rules to enforce architectural consistency and API conventions specific to BlueprintUI's design principles.

## Executive Summary

BlueprintUI already has 6 custom ESLint rules enforcing core API principles. This proposal extends that foundation with additional rules categorized by:

1. **TypeScript/Component Patterns** - Enforce Lit component conventions
2. **HTML Template Patterns** - Validate template structure and accessibility
3. **CSS Patterns** - Ensure design token usage and naming conventions
4. **Documentation Patterns** - Validate JSDoc completeness

---

## Existing Rules (Reference)

The following rules are already implemented in `projects/internals/eslint/src/rules/`:

| Rule | Description |
|------|-------------|
| `no-reserved-property-names` | Prevents property names conflicting with HTMLElement prototype |
| `no-invalid-event-names` | Enforces lowercase kebab-case event names |
| `no-reserved-event-names` | Prevents overriding native HTMLElement events |
| `no-stateful-properties` | Prevents internal mutation of public @property declarations |
| `no-complex-properties` | Restricts @property types to primitives (no Object/Array) |
| `no-unknown-event-names` | Whitelist-based event name validation |

---

## Proposed Rules

### Category 1: TypeScript/Component Patterns

#### 1.1 `require-accessor-keyword`

**Priority:** HIGH

**What it enforces:** All `@property` decorators must use the `accessor` keyword for proper Lit 3.x class field semantics.

**Why:** The `accessor` keyword is required for Lit's reactive property system to work correctly with TypeScript class fields. Omitting it causes runtime issues with property updates.

**Example violation:**
```typescript
// BAD - missing accessor keyword
@property({ type: String }) status: string;
@property({ type: Boolean }) disabled = false;
```

**Example fix:**
```typescript
// GOOD - accessor keyword present
@property({ type: String }) accessor status: string;
@property({ type: Boolean }) accessor disabled = false;
```

**Implementation approach:**
```javascript
// AST pattern to detect
'PropertyDefinition > Decorator[expression.callee.name=property]': (node) => {
  if (!node.parent.key.name.startsWith('accessor')) {
    // Check if parent PropertyDefinition has 'accessor' modifier
    const hasAccessor = node.parent.decorators?.some(d =>
      d.expression?.callee?.name === 'property'
    ) && node.parent.type === 'AccessorProperty';

    if (!hasAccessor) {
      context.report({
        node: node.parent,
        message: '@property decorator requires accessor keyword'
      });
    }
  }
}
```

---

#### 1.2 `require-property-type-annotation`

**Priority:** MEDIUM

**What it enforces:** All `@property` decorators must specify the `type` option for proper attribute handling.

**Why:** Lit uses the type for attribute/property conversion. Without explicit types, attributes may not deserialize correctly from HTML.

**Example violation:**
```typescript
// BAD - missing type specification
@property() accessor value: string;
@property({ reflect: true }) accessor status: 'success' | 'error';
```

**Example fix:**
```typescript
// GOOD - explicit type specified
@property({ type: String }) accessor value: string;
@property({ type: String, reflect: true }) accessor status: 'success' | 'error';
```

**Implementation approach:**
```javascript
'PropertyDefinition > Decorator[expression.callee.name=property]': (node) => {
  const args = node.expression.arguments;
  if (!args.length || !args[0].properties?.some(p => p.key.name === 'type')) {
    context.report({
      node,
      message: '@property decorator should specify type for attribute conversion'
    });
  }
}
```

---

#### 1.3 `no-reflect-state-properties`

**Priority:** HIGH

**What it enforces:** State properties managed by `ElementInternals` (disabled, readonly, checked, etc.) should NOT use `reflect: true`.

**Why:** These states are managed via Custom States API (`:state(disabled)`) and `ElementInternals`, not HTML attributes. Reflecting them creates redundant DOM attributes and potential state sync issues.

**Example violation:**
```typescript
// BAD - disabled managed by StateDisabledController, shouldn't reflect
@property({ type: Boolean, reflect: true }) accessor disabled = false;
```

**Example fix:**
```typescript
// GOOD - no reflection for controller-managed state
@property({ type: Boolean }) accessor disabled = false;
```

**Implementation approach:**
```javascript
const noReflectStates = ['disabled', 'readonly', 'checked', 'selected', 'expanded', 'pressed', 'active'];

'PropertyDefinition > Decorator[expression.callee.name=property]': (node) => {
  const propName = node.parent.key.name;
  const hasReflect = node.expression.arguments[0]?.properties
    ?.some(p => p.key.name === 'reflect' && p.value.value === true);

  if (noReflectStates.includes(propName) && hasReflect) {
    context.report({
      node,
      message: `'${propName}' is managed by ElementInternals and should not use reflect: true`
    });
  }
}
```

---

#### 1.4 `require-visual-property-reflect`

**Priority:** LOW

**What it enforces:** Visual/semantic properties like `status`, `action`, `size`, `position` should use `reflect: true` for CSS selector targeting.

**Why:** Visual variants need to be reflected as attributes to enable CSS styling via `[status='success']` selectors.

**Example violation:**
```typescript
// BAD - status used for CSS styling, should reflect
@property({ type: String }) accessor status: 'accent' | 'success';
```

**Example fix:**
```typescript
// GOOD - visual properties reflect for CSS selectors
@property({ type: String, reflect: true }) accessor status: 'accent' | 'success';
```

**Implementation approach:**
```javascript
const visualProperties = ['status', 'action', 'size', 'position', 'layout', 'orientation', 'shape'];

'PropertyDefinition > Decorator[expression.callee.name=property]': (node) => {
  const propName = node.parent.key.name;
  const hasReflect = node.expression.arguments[0]?.properties
    ?.some(p => p.key.name === 'reflect' && p.value.value === true);

  if (visualProperties.includes(propName) && !hasReflect) {
    context.report({
      node,
      message: `Visual property '${propName}' should use reflect: true for CSS styling`,
      severity: 'warning'
    });
  }
}
```

---

#### 1.5 `controller-decorator-naming`

**Priority:** MEDIUM

**What it enforces:** Controller decorators must follow the naming pattern `@[category][Name]<T>()` where category is `state`, `type`, `interaction`, or `i18n`.

**Why:** Consistent naming makes it clear what category of behavior a controller provides and maintains codebase uniformity.

**Example violation:**
```typescript
// BAD - inconsistent naming
@disabled<BpButton>()
@buttonType<BpButton>()
@handleClick<BpButton>()
```

**Example fix:**
```typescript
// GOOD - follows category prefix pattern
@stateDisabled<BpButton>()
@typeButton<BpButton>()
@interactionClick<BpButton>()
```

**Implementation approach:**
```javascript
const validPrefixes = ['state', 'type', 'interaction', 'i18n', 'keynav', 'ariaMenu', 'dynamicControllers'];

'Decorator > CallExpression': (node) => {
  const name = node.callee.name;
  if (name && !validPrefixes.some(prefix =>
    name.startsWith(prefix) || name === prefix
  )) {
    // Check if it's a known controller decorator by checking imports
    // Only report if it appears to be a controller decorator
  }
}
```

---

#### 1.6 `no-event-verb-prefix`

**Priority:** MEDIUM

**What it enforces:** Custom events should not use verb prefixes like `on`, `did`, `will`, `before`, `after`.

**Why:** Per the API guide, events should be state-based, not action-based. Framework bindings handle the "on" prefix automatically.

**Example violation:**
```typescript
// BAD - action verb prefixes
this.dispatchEvent(new CustomEvent('onOpen'));
this.dispatchEvent(new CustomEvent('beforeClose'));
this.dispatchEvent(new CustomEvent('didUpdate'));
```

**Example fix:**
```typescript
// GOOD - state-based event names
this.dispatchEvent(new CustomEvent('open'));
this.dispatchEvent(new CustomEvent('close'));
this.dispatchEvent(new CustomEvent('update'));
```

**Implementation approach:**
```javascript
const verbPrefixes = ['on', 'before', 'after', 'will', 'did'];

'NewExpression[callee.name="CustomEvent"]'(node) {
  const eventName = node.arguments[0]?.value;
  if (eventName && verbPrefixes.some(p => eventName.startsWith(p))) {
    context.report({
      node,
      message: `Event '${eventName}' should not use verb prefix. Use state-based naming.`
    });
  }
}
```

---

#### 1.7 `no-stateful-event-emission`

**Priority:** HIGH

**What it enforces:** Events should only be dispatched from user interaction handlers, not from property setters or lifecycle methods.

**Why:** Per the API guide, emitting events on state changes (not user actions) causes rendering loops and noise. If a consumer sets `expanded = true`, don't fire an `expand` event.

**Example violation:**
```typescript
// BAD - emitting event from property setter
set expanded(value: boolean) {
  this._expanded = value;
  this.dispatchEvent(new CustomEvent('expand')); // Fires on programmatic change!
}

// BAD - emitting event from updated() lifecycle
updated(props) {
  if (props.has('open')) {
    this.dispatchEvent(new CustomEvent('open'));
  }
}
```

**Example fix:**
```typescript
// GOOD - emit from user interaction handler only
#handleClick() {
  this.expanded = !this.expanded;
  this.dispatchEvent(new CustomEvent(this.expanded ? 'open' : 'close'));
}
```

**Implementation approach:**
```javascript
// Detect CustomEvent dispatch inside:
// - setter methods
// - updated/firstUpdated/willUpdate lifecycle methods
// - connectedCallback (with exceptions)

'MethodDefinition[kind="set"] NewExpression[callee.name="CustomEvent"]': (node) => {
  context.report({
    node,
    message: 'Do not dispatch events from property setters. Only emit events from user interactions.'
  });
},

'MethodDefinition[key.name=/^(updated|firstUpdated|willUpdate)$/] NewExpression[callee.name="CustomEvent"]': (node) => {
  context.report({
    node,
    message: 'Do not dispatch events from lifecycle methods. Only emit events from user interactions.'
  });
}
```

---

### Category 2: HTML Template Patterns

#### 2.1 `require-part-internal`

**Priority:** MEDIUM

**What it enforces:** Component templates should include a `part="internal"` wrapper element for proper styling isolation.

**Why:** BlueprintUI uses `[part="internal"]` as the primary styling target, keeping `:host` reserved for display properties and CSS custom property declarations.

**Example violation:**
```typescript
// BAD - no internal wrapper
render() {
  return html`
    <slot></slot>
    <button>Click</button>
  `;
}
```

**Example fix:**
```typescript
// GOOD - internal wrapper present
render() {
  return html`
    <div part="internal">
      <slot></slot>
      <button>Click</button>
    </div>
  `;
}
```

**Implementation approach:**
```javascript
// In render method, check for part="internal" element
'MethodDefinition[key.name="render"] TaggedTemplateExpression': (node) => {
  const template = node.quasi.quasis.map(q => q.value.raw).join('');
  if (!template.includes('part="internal"')) {
    context.report({
      node,
      message: 'Component template should include part="internal" wrapper for styling consistency'
    });
  }
}
```

---

#### 2.2 `require-slot-documentation`

**Priority:** MEDIUM

**What it enforces:** All named slots in templates must have corresponding `@slot` JSDoc tags.

**Why:** Slot documentation enables tooling (Custom Elements Manifest) and IDE support.

**Example violation:**
```typescript
/**
 * @element bp-dialog
 */
export class BpDialog {
  render() {
    return html`
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    `;
  }
}
```

**Example fix:**
```typescript
/**
 * @element bp-dialog
 * @slot - main dialog content
 * @slot header - slot for dialog header
 * @slot footer - slot for dialog footer
 */
export class BpDialog {
  render() {
    return html`
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    `;
  }
}
```

**Implementation approach:**
```javascript
// Extract slot names from template, compare against @slot tags in JSDoc
'ClassDeclaration': (node) => {
  const jsdoc = context.getCommentsBefore(node);
  const slotTags = extractSlotTags(jsdoc);
  const templateSlots = extractSlotsFromRender(node);

  templateSlots.forEach(slot => {
    if (!slotTags.includes(slot)) {
      context.report({
        node,
        message: `Slot '${slot}' is used in template but not documented with @slot`
      });
    }
  });
}
```

---

#### 2.3 `aria-label-i18n`

**Priority:** HIGH

**What it enforces:** Interactive elements with `aria-label` should use i18n service values, not hardcoded strings.

**Why:** Ensures accessibility labels are translatable.

**Example violation:**
```typescript
// BAD - hardcoded aria-label
html`<button aria-label="Close">X</button>`;
```

**Example fix:**
```typescript
// GOOD - i18n-based aria-label
html`<button aria-label=${this.i18n.close}>X</button>`;
```

**Implementation approach:**
```javascript
// In Lit templates, check aria-label bindings
'TaggedTemplateExpression': (node) => {
  const template = node.quasi.quasis.map(q => q.value.raw).join('');
  const hardcodedAriaLabel = /aria-label="[^"$]+"/g;

  if (hardcodedAriaLabel.test(template)) {
    context.report({
      node,
      message: 'aria-label should use i18n values for internationalization support'
    });
  }
}
```

---

### Category 3: CSS Patterns

#### 3.1 `no-hardcoded-units` (Stylelint/eslint-css)

**Priority:** HIGH

**What it enforces:** CSS should not use hardcoded pixel values; use design tokens instead.

**Why:** Design tokens ensure consistency and enable theming.

**Example violation:**
```css
/* BAD - hardcoded values */
:host {
  padding: 16px;
  font-size: 14px;
  border-radius: 4px;
}
```

**Example fix:**
```css
/* GOOD - design tokens */
:host {
  --padding: var(--bp-size-500);
  --font-size: var(--bp-text-size-200);
  --border-radius: var(--bp-object-border-radius-100);
}
```

**Implementation approach:**
```javascript
// Using eslint-css or stylelint plugin
{
  'declaration': (node) => {
    const value = node.value;
    // Detect standalone px values not inside var() or calc()
    if (/\d+px/.test(value) && !value.includes('var(')) {
      context.report({
        node,
        message: 'Use design tokens instead of hardcoded pixel values'
      });
    }
  }
}
```

---

#### 3.2 `css-custom-property-naming`

**Priority:** MEDIUM

**What it enforces:** CSS custom properties declared on `:host` should use simple, semantic names matching standard CSS properties.

**Why:** Per the API guide, custom property names should mirror native CSS for discoverability. Use `--padding` not `--button-padding-left`.

**Example violation:**
```css
/* BAD - verbose naming */
:host {
  --button-background-color: blue;
  --component-padding-x: 16px;
}
```

**Example fix:**
```css
/* GOOD - matches CSS properties */
:host {
  --background: blue;
  --padding: var(--bp-size-500);
}
```

**Implementation approach:**
```javascript
const validCustomProps = [
  'background', 'color', 'border', 'padding', 'margin', 'width', 'height',
  'min-width', 'min-height', 'max-width', 'max-height', 'font-size',
  'line-height', 'text-align', 'opacity', 'cursor', 'transition', 'transform',
  'border-radius', 'outline', 'outline-offset', 'gap', 'animation-duration',
  'text-decoration', 'icon-color', 'placeholder-color', 'filter'
];

// Warn on non-standard custom property names
```

---

#### 3.3 `require-state-selectors`

**Priority:** MEDIUM

**What it enforces:** Component states should use `:state()` pseudo-class selectors, not attribute selectors for boolean states.

**Why:** BlueprintUI uses Custom States API for component states like disabled, checked, etc.

**Example violation:**
```css
/* BAD - attribute selector for state */
:host([disabled]) {
  opacity: 0.5;
}
```

**Example fix:**
```css
/* GOOD - state selector */
:host(:state(disabled)) {
  opacity: 0.5;
}
```

**Implementation approach:**
```javascript
const stateProps = ['disabled', 'readonly', 'checked', 'selected', 'expanded', 'pressed', 'active'];

// Detect :host([disabled]) patterns and suggest :host(:state(disabled))
```

---

### Category 4: Documentation Patterns

#### 4.1 `require-element-jsdoc`

**Priority:** HIGH

**What it enforces:** Component classes must have JSDoc with required tags: `@element`, `@since`, `@summary`.

**Why:** Custom Elements Manifest and tooling rely on these tags for documentation generation.

**Example violation:**
```typescript
// BAD - missing required JSDoc
export class BpButton extends LitElement {
  // ...
}
```

**Example fix:**
```typescript
/**
 * @summary The button component is used for actions.
 * @element bp-button
 * @since 1.0.0
 * @slot - button content
 */
export class BpButton extends LitElement {
  // ...
}
```

**Implementation approach:**
```javascript
'ClassDeclaration': (node) => {
  if (!node.id.name.startsWith('Bp')) return;

  const jsdoc = context.getCommentsBefore(node);
  const requiredTags = ['element', 'since', 'summary'];

  requiredTags.forEach(tag => {
    if (!jsdoc.some(c => c.value.includes(`@${tag}`))) {
      context.report({
        node,
        message: `Component class requires @${tag} JSDoc tag`
      });
    }
  });
}
```

---

#### 4.2 `require-event-documentation`

**Priority:** MEDIUM

**What it enforces:** All events dispatched by a component must have corresponding `@event` JSDoc tags.

**Why:** Event documentation enables IDE autocomplete and API documentation.

**Example violation:**
```typescript
/**
 * @element bp-dialog
 */
export class BpDialog {
  // dispatches 'open' and 'close' events but no @event tags
}
```

**Example fix:**
```typescript
/**
 * @element bp-dialog
 * @event open - dispatched when the dialog is opened
 * @event close - dispatched when the dialog is closed
 */
export class BpDialog {
  // ...
}
```

---

#### 4.3 `require-cssprop-documentation`

**Priority:** LOW

**What it enforces:** CSS custom properties declared on `:host` should have corresponding `@cssprop` JSDoc tags.

**Why:** Documents the styling API for component consumers.

**Example violation:**
```typescript
/**
 * @element bp-button
 */
export class BpButton {
  // CSS has --background, --color but not documented
}
```

**Example fix:**
```typescript
/**
 * @element bp-button
 * @cssprop --background
 * @cssprop --color
 */
export class BpButton {
  // ...
}
```

---

#### 4.4 `jsdoc-event-format`

**Priority:** LOW

**What it enforces:** `@event` tags should have consistent format with description.

**Why:** Inconsistent documentation format (e.g., `@event - close` vs `@event close -`) creates confusion.

**Example violation (found in codebase):**
```typescript
// BAD - inconsistent format (alert/element.ts)
* @event - close
* @event - open
```

**Example fix:**
```typescript
// GOOD - consistent format
* @event close - dispatched when closed
* @event open - dispatched when opened
```

---

## Implementation Priority Summary

### High Priority (Enforce Immediately)
1. `require-accessor-keyword` - Prevents runtime bugs
2. `no-reflect-state-properties` - Prevents state sync issues
3. `no-stateful-event-emission` - Prevents render loops (from API guide)
4. `no-hardcoded-units` - Enforces design system
5. `require-element-jsdoc` - Enables tooling
6. `aria-label-i18n` - Accessibility

### Medium Priority (Recommended)
1. `require-property-type-annotation` - Proper attribute handling
2. `controller-decorator-naming` - Consistency
3. `no-event-verb-prefix` - API conventions
4. `require-part-internal` - Styling consistency
5. `require-slot-documentation` - API documentation
6. `require-event-documentation` - API documentation
7. `css-custom-property-naming` - Naming conventions
8. `require-state-selectors` - CSS consistency

### Low Priority (Nice to Have)
1. `require-visual-property-reflect` - CSS convenience
2. `require-cssprop-documentation` - Documentation completeness
3. `jsdoc-event-format` - Documentation consistency

---

## Known Issues Found During Analysis

During the codebase analysis, the following issues were identified that these rules would catch:

1. **Typo in slot documentation** (`projects/components/src/input/element.ts:27`):
   ```typescript
   * @slot suffix - slot for suffic text or icons
   ```
   Should be "suffix"

2. **Inconsistent event documentation** (`projects/components/src/alert/element.ts:34-35`):
   ```typescript
   * @event - close
   * @event - open
   ```
   Format differs from other components (e.g., dialog uses `@event close - description`)

3. **Duplicate CSS property documentation** (found in some components):
   Some components list the same `@cssprop` multiple times

---

## Integration Recommendations

### File Structure
```
projects/internals/eslint/
├── src/
│   ├── rules/
│   │   ├── require-accessor-keyword.js
│   │   ├── no-reflect-state-properties.js
│   │   ├── no-stateful-event-emission.js
│   │   ├── require-part-internal.js
│   │   ├── require-element-jsdoc.js
│   │   └── ...
│   ├── configs/
│   │   ├── blueprint.js  # New config for Blueprint-specific rules
│   │   └── ...
│   └── index.js
```

### Configuration Example
```javascript
// eslint.config.js
export default [
  // ... existing configs
  {
    rules: {
      'blueprint/require-accessor-keyword': 'error',
      'blueprint/no-reflect-state-properties': 'error',
      'blueprint/no-stateful-event-emission': 'error',
      'blueprint/require-element-jsdoc': 'error',
      'blueprint/require-part-internal': 'warn',
      'blueprint/no-event-verb-prefix': 'warn',
    }
  }
];
```

---

## References

- [BlueprintUI Repository](https://github.com/blueprintui/blueprintui)
- [Reusable UI Component API Guide](https://github.com/coryrylan/reusable-ui-component-api-guide)
- [ESLint Custom Rules Documentation](https://eslint.org/docs/latest/extend/custom-rules)
- [Lit Documentation](https://lit.dev)
- [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest)
