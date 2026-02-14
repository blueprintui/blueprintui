# Form Control Mixins

This directory contains mixin functions that provide native HTML form element behavior for custom Web Components using the `ElementInternals` API and `formAssociated` custom elements.

## Architecture

```
FormControlMixin (base)
├── CheckboxFormControlMixin  → checkbox behavior (checked, indeterminate)
├── RadioFormControlMixin     → radio behavior (checked, radio groups)
├── SelectFormControlMixin    → select behavior (options, selectedIndex, multiple)
│   └── OptionMixin           → option behavior (value, selected, disabled)
└── SliderFormControlMixin    → range/slider behavior (min, max, step, keyboard/touch)
```

All leaf mixins compose `FormControlMixin` internally, so consumers only need to apply the leaf mixin.

## TypeScript 6.0 (tsgo) and TS4094

### The Problem

TypeScript 6.0-beta (tsgo) is stricter than TypeScript 5.x about **TS4094**: `Property '#field' of exported anonymous class type may not be private or protected`.

This error occurs because mixin functions return **anonymous class expressions** that contain `#` private fields. TypeScript cannot represent `#` private fields in the emitted `.d.ts` type declarations for anonymous classes, since each `#` field creates a unique, unnameable type brand.

```typescript
// TS4094 - tsgo rejects this
export function MyMixin(Base) {
  return class extends Base {
    #value = '';  // <-- private field in anonymous class
  };
}
```

Related: [microsoft/typescript-go#2216](https://github.com/microsoft/typescript-go/issues/2216)

### The Solution

The fix uses two parts:

1. **Explicit return type annotation** on the mixin function, providing the public API contract
2. **`as any` cast** on the returned class expression, bypassing internal assignability checks

```typescript
export function FormControlMixin<TBase extends Constructor, T extends FormControlValue>(
  SuperClass: TBase
): TBase & FormControlMixin {           // 1. explicit return type
  return class Base extends SuperClass {
    #value: T | string = '';            // #private fields preserved
    // ...
  } as any;                             // 2. as any cast
}
```

This preserves `#` private field encapsulation in the implementation while providing clean, accurate types for consumers through the mixin interface.

### Why Not Other Approaches

| Approach | Result |
|---|---|
| `_` underscore prefix | Loses true encapsulation; convention-only privacy |
| `@ts-expect-error TS4094` | tsgo reports "Unused directive" (TS2578); not supported for this error |
| Return type without `as any` | Cascading type errors from interface/implementation mismatches |

## Adding or Modifying Mixins

### Mixin Interface Requirements

Each mixin needs an **instance interface** and a **static interface**:

```typescript
// Instance interface - extends FormControlInstance for leaf mixins
interface FormControlFooInstance extends FormControlInstance {
  myProp: string;
  myMethod(): void;
}

// Static/constructor interface - what the mixin function returns
export interface FooFormControlMixin {
  new (...args: any[]): FormControlFooInstance;
  formAssociated: boolean;                    // boolean, not literal `true`
  readonly observedAttributes: string[];
}
```

### Interface Rules

- Use **`boolean`** for `formAssociated` (not `true`), to avoid TS2417 assignability errors
- Use **method syntax** in interfaces (`reset(): void`), not property syntax (`reset: () => void`), to avoid TS2425 errors when class methods override them
- Ensure `value` types use `FormControlValue` (`string | number | FormData | File`) to match the base mixin
- Use `number | string | null` for `min`/`max` since different form controls accept different types

### Checklist for New Mixins

1. Define instance interface extending `FormControlInstance` (for leaf mixins)
2. Define exported constructor/static interface
3. Define local `Constructor` type with lifecycle methods
4. Implement mixin function with explicit return type + `as any` cast
5. Use `#` private fields freely in the implementation class
6. Call `super.observedAttributes.concat([...])` to merge observed attributes
7. Handle own attributes in `attributeChangedCallback` before delegating to `super`
