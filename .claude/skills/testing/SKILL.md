---
description: General testing overview for BlueprintUI — use when the user asks about the overall testing strategy, wants to run all test suites, or needs to understand which test types exist (unit, visual, performance, API, a11y, coverage). For specific test types, the dedicated skills (testing-unit, testing-visual, testing-performance) provide detailed patterns.
globs:
alwaysApply: false
---

# Testing Overview

BlueprintUI uses multiple test suites to ensure component quality. Each test type has a dedicated skill with detailed patterns — this skill provides the high-level map.

## Test Suites

| Suite         | Files                    | Skill                 | Purpose                                               |
| ------------- | ------------------------ | --------------------- | ----------------------------------------------------- |
| Unit          | `element.spec.ts`        | `testing-unit`        | Component behavior, CSS states, accessibility, events |
| Visual        | `element.visual.ts`      | `testing-visual`      | Screenshot regression (light + dark themes)           |
| Performance   | `element.performance.ts` | `testing-performance` | Bundle size and render time budgets                   |
| API           | —                        | —                     | API contract validation (`bp api`)                    |
| Accessibility | —                        | —                     | Automated a11y checks                                 |
| Coverage      | —                        | —                     | Code coverage reporting                               |

## Commands

```bash
# Run all tests
pnpm run test:unit
pnpm run test:visual
pnpm run test:performance
pnpm run test:api
pnpm run test:a11y
pnpm run test:coverage

# Run a single test file (any suite)
pnpm run test:unit -- src/COMPONENT_DIR/element.spec.ts
pnpm run test:visual -- src/COMPONENT_DIR/element.visual.ts
pnpm run test:performance -- src/COMPONENT_DIR/element.performance.ts

# Update visual baselines after intentional changes
pnpm run test:visual:update

# Full CI validation
pnpm run ci
```

## Required Test Files Per Component

Every component must have these 3 test files alongside `element.ts`:

1. `element.spec.ts` — Unit tests (90%+ coverage target)
2. `element.visual.ts` — Screenshot tests (light + dark themes)
3. `element.performance.ts` — Bundle size + render time budgets

## When to Use Which Skill

- Writing or fixing a `.spec.ts` file → use `testing-unit`
- Writing or fixing a `.visual.ts` file → use `testing-visual`
- Writing or fixing a `.performance.ts` file → use `testing-performance`
- General testing questions or running multiple suites → this skill
