---
description: Unit Testing Best Practices
globs: *.spec.ts
alwaysApply: false
---

# Unit Testing Best Practices

## Commands

```bash
# Run unit tests (warn slow to complete)
pnpm run test:unit

# Run single file unit test
pnpm run test:unit -- src/COMPONENT_DIR/element.spec.ts
```

## Test Structure and Organization

## Test File Structure

- Performance test files should be named `*.spec.ts`
- Place them alongside the component file in the same directory

## Test Template

```typescript
describe('component-name element', () => {
  let fixture: HTMLElement;
  let element: ComponentType;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-component>content</bp-component>`);
    element = fixture.querySelector<ComponentType>('bp-component');
  });

  afterEach(() => {
    removeFixture(fixture);
  });
});
```

## Component Testing Patterns

### Basic Component Tests

Always include these fundamental tests:

```typescript
it('should create the component', async () => {
  await elementIsStable(element);
  expect(element.innerText).toBe('expected content');
});

it('should set default properties', async () => {
  await elementIsStable(element);
  expect(element.defaultProperty).toBe('expected value');
});
```

### Inherited Properties Testing

When testing components that extend base classes (like BaseButton):

```typescript
it('should support inherited properties', async () => {
  await elementIsStable(element);

  // Test boolean properties with CSS states
  element.disabled = true;
  await elementIsStable(element);
  expect(element.disabled).toBe(true);
  expect(element.matches(':state(disabled)')).toBe(true);
  expect(element._internals.ariaDisabled).toBe('true');

  // Test reflected properties
  element.type = 'submit';
  await elementIsStable(element);
  expect(element.type).toBe('submit');
  expect(element.getAttribute('type')).toBe('submit');
});
```

### CSS State Testing

Use CSS state selectors instead of attribute checks for controller-managed states:

```typescript
// ✅ Correct - Test CSS states
expect(element.matches(':state(disabled)')).toBe(true);
expect(element.matches(':state(readonly)')).toBe(true);
expect(element.matches(':state(selected)')).toBe(true);

// ❌ Incorrect - Don't test attributes for controller-managed states
expect(element.hasAttribute('disabled')).toBe(true);
```

### Accessibility Testing

Always test accessibility attributes and states:

```typescript
it('should have proper accessibility attributes', async () => {
  await elementIsStable(element);

  // Test ARIA attributes
  expect(element._internals.ariaExpanded).toBe('false');
  expect(element._internals.role).toBe('button');

  // Test focus management
  expect(element.tabIndex).toBe(0);

  element.disabled = true;
  await elementIsStable(element);
  expect(element.tabIndex).toBe(-1);
});
```

### Event Handling Testing

Test event interactions using the project's testing utilities:

```typescript
it('should emit change event on click', async () => {
  await elementIsStable(element);
  expect(element.value).toBe('0');

  const event = onceEvent(element, 'change');
  emulateClick(element);
  await elementIsStable(element);
  expect((await event)?.target.value).toBe('1');
});
```

#### Spies

```typescript
it('should handle click interactions', async () => {
  await elementIsStable(element);

  const clickSpy = jasmine.createSpy('click');
  element.addEventListener('click', clickSpy);

  await emulateClick(element);
  expect(clickSpy).toHaveBeenCalled();
});
```

### Form Association Testing

For components with form association:

```typescript
it('should have form association enabled', async () => {
  await elementIsStable(element);
  expect(ComponentClass.formAssociated).toBe(true);
});
```

### CSS Parts Testing

Test that CSS parts are rendered correctly:

```typescript
it('should render with correct CSS parts', async () => {
  await elementIsStable(element);
  const internalPart = element.shadowRoot.querySelector('[part="internal"]');
  expect(internalPart).toBeTruthy();
});
```

### CSS Custom Properties Testing

Test that documented CSS custom properties can be set:

```typescript
it('should support CSS custom properties', async () => {
  await elementIsStable(element);

  element.style.setProperty('--background', 'red');
  element.style.setProperty('--color', 'white');

  await elementIsStable(element);

  expect(element.style.getPropertyValue('--background')).toBe('red');
  expect(element.style.getPropertyValue('--color')).toBe('white');
});
```

## Testing Framework Specifics

### Jasmine

This project uses Jasmine:

```typescript
// ✅ Correct - Use Jasmine spies
const clickSpy = jasmine.createSpy('click');

// ❌ Incorrect - Don't use Jest
const clickSpy = jest.fn();
```

### Static Property Testing

Access static properties through the constructor:

```typescript
// ✅ Correct - Access static property
expect(ComponentClass.formAssociated).toBe(true);

// ❌ Incorrect - Don't access static property on instance
expect(element.formAssociated).toBe(true);
```

### State Management Testing

For components with state properties:

```typescript
it('should handle state changes properly', async () => {
  await elementIsStable(element);

  // Initial state
  expect(element.stateProperty).toBe(false);
  expect(element._internals.ariaState).toBe('false');

  // Change state
  element.stateProperty = true;
  await elementIsStable(element);
  expect(element.stateProperty).toBe(true);
  expect(element._internals.ariaState).toBe('true');

  // Reset state
  element.stateProperty = false;
  await elementIsStable(element);
  expect(element.stateProperty).toBe(false);
  expect(element._internals.ariaState).toBe('false');
});
```

### Child Component Testing

When testing components that render child components:

```typescript
it('should render child components with correct properties', async () => {
  await elementIsStable(element);
  const childComponent = element.shadowRoot.querySelector('bp-child-component');

  expect(childComponent.property).toBe(expectedValue);
  expect(childComponent.readonly).toBe(true);
});
```

## Test Coverage Checklist

Before considering a component fully tested, ensure coverage of:

- [ ] Basic component creation and rendering
- [ ] Default property values
- [ ] All inherited properties from base classes
- [ ] CSS states (disabled, readonly, selected, etc.)
- [ ] Accessibility attributes (role, aria-\* attributes)
- [ ] Focus management (tabIndex changes)
- [ ] Event handling (click, keyboard interactions)
- [ ] Form association (if applicable)
- [ ] CSS parts rendering
- [ ] CSS custom properties
- [ ] State management and updates
- [ ] Child component properties
- [ ] Lifecycle methods (connectedCallback, updated)
- [ ] Error states and edge cases

## Common Pitfalls to Avoid

1. **Testing attributes instead of CSS states** for controller-managed properties
2. **Using Jest instead of Jasmine** for spies and mocks
3. **Accessing static properties on instances** instead of constructors
4. **Missing accessibility testing** for interactive components
5. **Not testing inherited functionality** from base classes
6. **Incomplete state management testing** (only testing one direction)
7. **Missing CSS custom properties testing** for documented styling options

## Best Practices

1. **Use descriptive test names** that explain the expected behavior
2. **Test one concept per test** to make failures easier to debug
3. **Use async/await** consistently with `elementIsStable()` for component stability
4. **Test both positive and negative cases** for boolean properties
5. **Verify accessibility compliance** for all interactive components
6. **Test CSS states** rather than attributes for controller-managed properties
7. **Include comprehensive inherited property testing** for components extending base classes
8. **Test event handling** to ensure proper interaction behavior
9. **Verify CSS parts** are rendered correctly for styling customization
10. **Test CSS custom properties** to ensure documented styling options work
