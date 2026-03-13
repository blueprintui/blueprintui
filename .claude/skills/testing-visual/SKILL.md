---
description: Visual regression testing for BlueprintUI components using Playwright screenshots — use when writing, fixing, or reviewing .visual.ts files, updating screenshot baselines, or adding light/dark theme visual coverage. Use this skill whenever the user mentions visual tests, screenshot tests, visual regressions, or baseline updates.
globs: *.visual.ts
alwaysApply: false
---

# Visual Testing Best Practices

Visual tests capture screenshots of components to detect visual regressions across changes. They ensure consistent rendering across themes and component states.

## Commands

```bash
# Run visual tests (warn slow to complete)
pnpm run test:visual

# Run single file visual test
pnpm run test:visual -- src/COMPONENT_DIR/element.visual.ts

# Update screenshot baselines after intentional visual changes
pnpm run test:visual:update
```

## Test File Structure

- Visual test files should be named `element.visual.ts`
- Place them alongside the component file in the same directory
- Screenshot baselines are stored via Git LFS (configured in `.gitattributes`)

## Test Template

```typescript
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { createVisualFixture, removeFixture } from '@blueprintui/test';
import * as component from './element.examples.js';
import '@blueprintui/components/include/component.js';

describe('bp-component', () => {
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createVisualFixture(
      html`
        ${unsafeHTML(component.example())} ${unsafeHTML(component.vertical())} ${unsafeHTML(component.horizontal())}
        ${unsafeHTML(component.compact())} ${unsafeHTML(component.validation())}
      `,
      { width: '800px', height: '600px' }
    );
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('light theme', async () => {
    await visualDiff(fixture, 'component/light.png');
  });

  it('dark theme', async () => {
    document.documentElement.setAttribute('bp-theme', 'dark');
    await visualDiff(fixture, 'component/dark.png');
  });
});
```

## Key Patterns

### Always Test Both Themes

Every visual test must include both light and dark theme screenshots. The dark theme is set by adding the `bp-theme="dark"` attribute to the document element.

### Fixture Sizing

Set fixture dimensions to fit all rendered examples without clipping. Common sizes:

- Simple components: `{ width: '400px', height: '200px' }`
- Components with multiple variants: `{ width: '800px', height: '600px' }`
- Large or complex layouts: `{ width: '1000px', height: '800px' }`

If screenshots appear clipped, increase the fixture size.

### Using `unsafeHTML` with Examples

The `unsafeHTML` directive renders HTML strings from `element.examples.js` functions into the Lit template. Include all relevant example functions to capture visual coverage of variants, states, and compositions.

### Screenshot Naming

Use descriptive paths for screenshots: `component-name/light.png` and `component-name/dark.png`. This organizes baselines by component in the screenshots directory.

### Updating Baselines

When you intentionally change a component's appearance, baselines need updating:

1. Run `pnpm run test:visual:update` to regenerate screenshots
2. Review the updated screenshots to verify they look correct
3. Commit the new baselines (Git LFS handles the binary files)

### Debugging Failures

When visual tests fail, the test runner generates diff images showing what changed. Check the test output for the diff image path to understand what regressed.
