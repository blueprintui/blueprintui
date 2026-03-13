---
description: Performance testing for BlueprintUI components — bundle size (treeshaking) and render time benchmarks. Use when writing, fixing, or reviewing .performance.ts files, checking bundle sizes, investigating performance regressions, or setting size/time thresholds for new components. Use this skill whenever the user mentions performance tests, bundle size, render time, or treeshaking.
globs: *.performance.ts
alwaysApply: false
---

# Performance Testing Best Practices

Performance tests prevent regressions in bundle size and render time. Every component must have an `element.performance.ts` file with both bundle size and render time assertions.

## Commands

```bash
# Run performance tests (warn slow to complete)
pnpm run test:performance

# Run single file performance test
pnpm run test:performance -- src/COMPONENT_DIR/element.performance.ts
```

## Test File Structure

- Performance test files should be named `element.performance.ts`
- Place them alongside the component file in the same directory

## Test Template

```typescript
import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/component-name.js';

describe('bp-component-name performance', () => {
  const element = html`<bp-component-name>content</bp-component-name>`;

  it(`should bundle and treeshake under Xkb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/component-name.js', { optimize: true })).kb
    ).toBeLessThan(X);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
```

## Choosing Threshold Values

### Render Time

Use `20` ms as the standard render time threshold. This is consistent across all components in the library.

### Bundle Size

Bundle size varies by component complexity. Check similar existing components for reference:

| Component Complexity                           | Typical Bundle Size | Examples              |
| ---------------------------------------------- | ------------------- | --------------------- |
| Simple (few deps)                              | 8–10 KB             | bp-button (8.9 KB)    |
| Medium complexity                              | 11–15 KB            | bp-dropdown (12.8 KB) |
| Complex (form controls, multiple sub-elements) | 15–20 KB            | bp-checkbox (18 KB)   |

To determine the right threshold for a new component:

1. Write the test with a generous threshold first (e.g., 20 KB)
2. Run the test to see the actual bundle size in the output
3. Set the threshold ~10-15% above the actual size to allow minor growth without false failures

### Always Use `{ optimize: true }`

The `optimize: true` flag enables treeshaking in the bundle size test, which reflects real-world usage where bundlers eliminate unused code. Always include this flag.
