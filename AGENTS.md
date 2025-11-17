# Agents

This file provides guidance to AI agents when working with code in this repository.

## Project Overview

BlueprintUI is a Web Components library built with Lit that provides framework-agnostic UI components for Angular, React, Vue, and vanilla JavaScript. The repository is organized as a pnpm monorepo with 15 packages.

### Repository Structure

- **.claude/** - Claude Code configuration and skills (detailed guidance for TypeScript, testing, documentation)
- **.cursor/rules** - Cursor Rules (reference Claude skills for consistency)
- **projects/components** - Core Web Components library (60+ components)
- **projects/grid** - Data grid component
- **projects/icons** - Icon library
- **projects/themes** - CSS design tokens (light/dark themes)
- **projects/layout** - Layout utilities
- **projects/typography** - Typography utilities
- **projects/typewriter** - Key navigation and AI chat components
- **projects/crane** - Drag and drop components
- **projects/docs** - Documentation site (Eleventy + Firebase)
- **projects/internals/** - Shared testing utilities and ESLint config
- **projects/examples/** - Framework examples (Angular, React, Vue)

### Package Dependencies

```
themes → icons, layout, typography, typewriter → crane
components → depends on: icons, themes, typewriter
grid → depends on: components, crane, icons, themes, typewriter
```

## Environment Requirements

- **Node.js**: 24.11.1 (`.nvmrc`)
- **Package Manager**: pnpm 10.18.2
- **Browser Testing**: Playwright + Chromium
- **TypeScript**: 5.9.2 (ES2022 target)

## Essential Commands

```bash
# Setup (installs Node, pnpm, deps, Playwright)
pnpm run setup

# Development
cd projects/components
pnpm run start              # Dev server + live preview
pnpm run ci                 # Full CI build/test (from root)

# Testing
pnpm run test:unit          # Jasmine unit tests
pnpm run test:visual        # Playwright screenshots
pnpm run test:performance   # Bundle size + render time
pnpm run test:api           # API contract validation

# Code Quality
pnpm run lint && pnpm run format
```

## Component File Structure

Each component requires these 7 files:

```
component-name/
├── element.ts              # Component class
├── element.css             # Styles (design tokens only)
├── element.spec.ts         # Unit tests (90%+ coverage)
├── element.visual.ts       # Screenshot tests (light + dark)
├── element.performance.ts  # Bundle size + render time
├── element.examples.js     # Documentation examples
└── index.ts               # Public exports
```

## Critical Conventions

### 1. Property Decorators - MUST use `accessor` keyword

```typescript
// ✅ CORRECT
@property({ type: String }) accessor status: string;

// ❌ WRONG (will cause runtime issues)
@property({ type: String }) status: string;
```

### 2. Import Rules

```typescript
// Always use .js extensions (TypeScript outputs .js)
import { BpButton } from './button/element.js';

// CSS imports use 'with' syntax
import styles from './element.css' with { type: 'css' };

// Shared utilities
import { baseStyles, defineElement } from '@blueprintui/components/internals';
```

### 3. Component Pattern

```typescript
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

export class BpComponent extends LitElement {
  static styles = [baseStyles, styles];

  @property({ type: String }) accessor status: 'success' | 'error' = 'success';

  render() {
    return html`<div part="container">${this.status}</div>`;
  }
}
```

### 4. Controllers (Shared Behaviors)

Apply via decorators for common functionality:

```typescript
import { typeButton, stateDisabled } from '@blueprintui/components/internals';

@typeButton<BpMyButton>()
@stateDisabled<BpMyButton>()
export class BpMyButton extends LitElement {
  // Auto-adds button behavior + disabled state management
}
```

**Available Controllers** (in `internals/controllers/`):

- State: `@stateDisabled`, `@stateChecked`, `@stateExpanded`, `@stateReadonly`, `@stateSelected`
- Type: `@typeButton`, `@typeAnchor`, `@typeClosable`, `@typeGroup`, `@typeMenu`, `@typePopover`
- Interaction: `@interactionClick`, `@interactionTouch`, `@interactionExpand`, `@interactionResponsive`

### 5. Styling with Design Tokens

```css
:host {
  /* ✅ Use design tokens */
  --background: var(--bp-status-neutral-background-200);
  --padding: var(--bp-size-500);

  /* ❌ NEVER hardcode px values */
  /* padding: 16px; */
}

/* Use :state() for component states */
:host(:state(disabled)) {
  opacity: 0.4;
}
```

### 6. Testing Patterns

```typescript
// Unit tests - element.spec.ts
import { createFixture, elementIsStable } from '@blueprintui/test';

it('should support CSS states', async () => {
  const fixture = await createFixture(html`<bp-component></bp-component>`);
  const element = fixture.querySelector('bp-component');

  element.disabled = true;
  await elementIsStable(element);

  // Test CSS states (not attributes)
  expect(element.matches(':state(disabled)')).toBe(true);
});
```

### 7. Documentation Examples

```javascript
// element.examples.js
export const metadata = {
  name: 'button',
  elements: ['bp-button']
};

export function example() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/button.js';
    </script>
    <bp-button>click me</bp-button>
  `;
}
```

## Component Creation Checklist

- [ ] Create all 7 required files (element.ts, .css, .spec.ts, .visual.ts, .performance.ts, .examples.js, index.ts)
- [ ] Use `accessor` keyword with `@property` decorators
- [ ] Use design tokens only (no hardcoded px values)
- [ ] Apply appropriate controllers via decorators
- [ ] Register in `include/{name}.ts` and add to `include/all.ts`, `include/lazy.ts`
- [ ] Tests: 90%+ coverage, light + dark themes, bundle size limits
- [ ] Documentation: Export examples with metadata

## AI Agent Support

### Claude Code Skills (`.claude/skills/`)

Specialized guidance activates automatically based on file patterns:

- **typescript** - Lit components, `accessor` decorators, controllers, state management (all `.ts` files)
- **testing-unit** - Jasmine patterns, fixtures, CSS states (`.spec.ts` files)
- **testing-visual** - Playwright screenshots, theme coverage (`.visual.ts` files)
- **testing-performance** - Bundle size + render time benchmarks (`.performance.ts` files)
- **documentation** - Eleventy docs, examples authoring (`.11ty.js` files)

### Session Startup (`.claude/settings.json`)

Automatic environment setup on every session:

1. Installs Node.js 24.11.1 via nvm
2. Installs pnpm 10.18.2 globally
3. Runs `pnpm i --frozen-lockfile`
4. Installs Playwright browsers

## Build System

- **Wireit** - Task orchestration with dependency caching
- **@blueprintui/cli** - Component building (`bp build`) and API testing (`bp api`)
- **@blueprintui/drafter** - Live documentation preview generation
- **Semantic Release** - Automated versioning and npm publishing

## Common Workflows

### Adding a Component

```bash
cd projects/components/src && mkdir my-component
# Create all 7 required files, implement with proper patterns
# Register in include/my-component.ts
# Add to include/all.ts and include/lazy.ts
pnpm run test && pnpm run start
```

### Running Tests

```bash
pnpm run test:unit -- src/button/element.spec.ts  # Single file
pnpm run test:visual:update                        # Update baselines
pnpm run test:performance                          # Check bundle sizes
```

### Release Process

Conventional commits on `main` trigger automated release:

- `feat:` → minor version bump
- `fix:` → patch version bump
- `BREAKING CHANGE:` → major version bump

## Key Resources

- **Detailed Guidance**: See `.claude/skills/` for comprehensive patterns and examples
- **Lit Documentation**: https://lit.dev
- **Custom State Pseudo-class**: https://developer.mozilla.org/en-US/docs/Web/CSS/:state
- **ElementInternals API**: https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals
