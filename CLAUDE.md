# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BlueprintUI is a Web Components library built with Lit that provides UI components working across all frameworks (Angular, React, Vue). It's organized as a pnpm monorepo with the following structure:

- **packages/components** - Core Web Components library
- **packages/grid** - Data grid component
- **packages/icons** - Icon library
- **packages/themes** - CSS themes and design tokens
- **packages/layout** - Layout utilities
- **packages/typography** - Typography utilities
- **packages/typewriter** - AI chat components
- **packages/crane** - Grid layout components
- **docs/** - Documentation site (Eleventy)
- **examples/** - Framework integration examples

## Essential Commands

### Development

```bash
# Initial setup (run from root)
pnpm run setup

# Start development server (run in specific package)
cd packages/components
pnpm run start

# Run full CI build/test from root
pnpm run ci

# Clean all generated files
pnpm run clean

# Full reset and rebuild
pnpm run reset && pnpm run ci
```

### Testing

```bash
# Run all tests
pnpm run test

# Run visual regression tests (in packages/components)
pnpm run test:visual

# Update visual regression snapshots
pnpm run test:visual:update

# Run performance tests
pnpm run test:performance

# Update API snapshots
pnpm run test:api:update
```

### Code Quality

```bash
# Lint (ESLint + Stylelint)
pnpm run lint
pnpm run lint:fix

# Format (Prettier)
pnpm run format
pnpm run format:fix

# Build all packages
pnpm run build
```

## Architecture Patterns

### Component Structure

Each component follows this standardized structure:

- `element.ts` - Main component class extending LitElement
- `element.css` - Component styles (imported with `with { type: 'css' }`)
- `element.spec.ts` - Unit tests (Jasmine)
- `element.examples.js` - Examples for documentation
- `element.visual.ts` - Visual regression tests
- `element.performance.ts` - Performance benchmarks

### Component Implementation

```typescript
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

export class BpComponent extends LitElement {
  static styles = [baseStyles, styles];

  @property({ type: String }) status: 'success' | 'error' = 'success';

  render() {
    return html`<div>${this.status}</div>`;
  }
}
```

### Controllers Pattern

Shared behaviors are implemented as controllers in `packages/components/src/internals/controllers/`:

- `type-button.controller.ts` - Button behavior
- `closable.controller.ts` - Closable elements
- `interaction-*.controller.ts` - Touch/click interactions

### Build System

- Uses **Wireit** for task orchestration with caching
- Custom `@blueprintui/cli` for component building
- ESBuild for TypeScript compilation
- Semantic Release for automated publishing

## Testing Strategy

1. **Unit Tests**: Jasmine with Web Test Runner
2. **Visual Tests**: Playwright for screenshot comparisons
3. **Performance Tests**: Benchmarks for component rendering
4. **API Tests**: Contract testing for component interfaces

## Key Conventions

- Target ES2022 for modern browser support
- Use TypeScript decorators for Lit properties
- Follow existing patterns when adding new components
- All components must have performance and visual tests
- Use design tokens from `packages/themes` for styling
- Components should be framework-agnostic
