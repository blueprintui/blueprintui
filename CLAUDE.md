# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BlueprintUI is a Web Components library built with Lit that provides UI components working across all frameworks (Angular, React, Vue). It's organized as a pnpm monorepo with the following structure:

- **.cursor/rules** - Related Cursor Rules and Coding Guidelines (see typescript.mdc for TypeScript conventions)
- **projects/components** - Core Web Components library
- **projects/grid** - Data grid component
- **projects/icons** - Icon library
- **projects/themes** - CSS themes and design tokens
- **projects/layout** - Layout utilities
- **projects/typography** - Typography utilities
- **projects/typewriter** - AI chat components
- **projects/crane** - Grid layout components
- **projects/docs/** - Documentation site (Eleventy)
- **projects/examples/** - Framework integration examples

## Essential Commands

### Development

```bash
# Initial setup (run from root)
pnpm run setup

# Start development server (run in specific package)
cd projects/components
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

# Run unit tests
pnpm run test:unit

# Run single file unit test
pnpm run test:unit -- src/COMPONENT_DIR/element.spec.ts

# Run visual regression tests (in projects/components)
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

Shared behaviors are implemented as controllers in `projects/components/src/internals/controllers/`:

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
- Use design tokens from `projects/themes` for styling
- Components should be framework-agnostic

## Coding Guidelines

For detailed TypeScript and JavaScript coding conventions, please refer to the cursor rules in `.cursor/rules/`:

- **typescript.mdc** - Comprehensive TypeScript patterns including component structure, decorators, controllers, testing, and common pitfalls
- **documentation.mdc** - Documentation standards and practices

These rules provide specific guidance on:

- Import conventions with `.js` extensions
- Component patterns using `accessor` keyword with `@property`
- Controller and decorator patterns
- Testing with Jasmine and fixtures
- State management with ElementInternals
- Naming conventions and code style
