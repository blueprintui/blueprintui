# BlueprintUI Agent Harness Audit

**Date:** 2026-03-08
**Scope:** Monorepo at `blueprintui/blueprintui`
**Purpose:** Assess "harness engineering" readiness — the deterministic tooling, context scaffolding, and feedback loops that allow AI agents to work reliably and autonomously.

---

## 1. Testing as Oracle

### Current State

**Co-location and naming:** Tests are co-located with source in every component directory following a strict 7-file convention:
- `element.spec.ts` — Jasmine unit tests
- `element.visual.ts` — Playwright screenshot tests (light + dark)
- `element.performance.ts` — Bundle size + render time assertions

This is consistent across all packages (`components`, `crane`, `grid`, `icons`, `typewriter`, `virtual`, `layout`, `typography`).

**Unified test command:** Root `package.json` provides `pnpm run test` via Wireit, which aggregates tests from all 8+ packages. This returns a clean exit code 0/1. The full CI command `pnpm run ci` chains `lint → build → test → drafter → examples → test:performance` with Wireit dependency resolution. Both give deterministic pass/fail signals.

**Test utilities:** Shared test utilities live in `projects/internals/test/` and are published as `@blueprintui/test`:
- `createFixture(html)` / `removeFixture(fixture)` — DOM fixture lifecycle
- `elementIsStable(element)` — await component update cycles
- `createVisualFixture(html)` — Playwright visual test setup
- `emulateClick()`, `onceEvent()` — interaction helpers

**Visual tests:** Playwright configured with Chromium. Screenshots stored via Git LFS (`.gitattributes` configured). Both light and dark theme coverage required per component.

**API contract tests:** `custom-elements.lock.json` files in each package serve as API snapshots. The `test:api` command via `@blueprintui/cli` (`bp api`) validates the current CEM against these lockfiles, detecting breaking changes (property/event/slot removal).

### Gaps

1. **No behavioral integration tests.** Visual tests verify appearance only. There are no Playwright tests that assert interactive behavior (click → state change, form submission, keyboard navigation flows). The unit tests cover these but run in a mocked DOM (Jasmine + web-test-runner), not a real browser page context.

2. **No structural/architectural tests.** There are no "ArchUnit-style" tests that enforce conventions like:
   - Every `element.ts` must import `baseStyles`
   - Every form control must use `ElementInternals`
   - Every component must register via `customElements.define()`
   - Slot names must follow naming convention
   - CSS custom properties must use `--bp-` prefix

3. **No coverage enforcement gate.** The `.spec.ts` files aim for 90%+ coverage (documented in AGENTS.md), but there's no CI gate that fails if coverage drops below threshold. Coverage is available via `test:coverage` but it's not wired into `pnpm run ci`.

4. **No a11y test integration in CI.** `test:a11y` is mentioned in AGENTS.md but not included in the `ci:run` Wireit dependency chain.

### Recommendations

1. **Add structural convention tests** (`projects/internals/test/structural/`):
```typescript
// conventions.spec.ts - validates all component directories
it('every element.ts should import baseStyles', () => { /* glob + AST check */ });
it('every component should have all 7 required files', () => { /* glob check */ });
it('every CSS file should only use --bp- prefixed custom properties', () => { /* regex */ });
it('no component should have runtime dependencies outside @blueprintui/', () => { /* package.json check */ });
```

2. **Wire `test:coverage` into CI** with a minimum threshold (e.g., 85% lines).

3. **Add `test:a11y` to the `ci:run` dependency chain** in root `package.json`.

4. **Consider Playwright behavioral tests** for critical interaction flows (form submission, popover open/close, keyboard navigation) that can't be fully validated in unit tests.

---

## 2. Static Analysis & Linting

### Current State

**Custom ESLint plugin:** The repo has an impressive internal ESLint plugin at `projects/internals/eslint/` with 15 custom rules enforcing BlueprintUI architectural patterns:

| Rule | Purpose |
|------|---------|
| `require-accessor-keyword` | Enforces `accessor` on `@property` decorators |
| `no-stateful-properties` | Prevents direct stateful property patterns |
| `no-reflect-state-properties` | Enforces `ElementInternals` state over attribute reflection |
| `no-reserved-property-names` | Blocks reserved HTML property names |
| `no-reserved-event-names` | Blocks reserved DOM event names |
| `no-invalid-event-names` | Validates event naming patterns |
| `no-unknown-event-names` | Whitelist-based event name validation |
| `no-event-verb-prefix` | Prevents `onX` event naming |
| `no-stateful-event-emission` | Prevents events in stateful callbacks |
| `no-complex-properties` | Blocks complex object/array properties |
| `require-property-type` | Requires explicit type in `@property` |
| `require-visual-property-reflect` | Ensures visual properties reflect to attributes |
| `controller-decorator-naming` | Validates controller decorator names |
| `require-part-internal` | Enforces CSS `::part()` internal pattern |
| `aria-label-i18n` | Ensures aria-labels use i18n |

All rules are configured as `"error"` (not `"warn"`), making them blocking.

**Additional linting layers:**
- `eslint-plugin-lit` — Lit-specific patterns
- `eslint-plugin-lit-a11y` — Accessibility in Lit templates
- `eslint-plugin-wc` — Web Component best practices
- `eslint-plugin-jasmine` — Test patterns
- `stylelint` with `stylelint-config-standard` — CSS linting
- `prettier` — Formatting (enforced via pre-commit hook)

**TypeScript strictness:** Partial. Individual flags are enabled (`alwaysStrict`, `noImplicitAny`, `noImplicitReturns`, `noImplicitThis`, `noUnusedLocals`, `noUnusedParameters`, `strictFunctionTypes`, `noFallthroughCasesInSwitch`) but `strict: true` is NOT used globally. Critically, `strictNullChecks: false` in `projects/components/tsconfig.json` (but `true` in `projects/virtual`).

**CI integration:** Lint is a dependency of `ci:run` via Wireit, so it's a blocking gate. TypeScript compilation is part of `build`, also blocking.

### Gaps

1. **`strictNullChecks: false`** in the largest package (`components`). This is the single biggest type-safety gap — agents can write code that passes compilation but has null-reference bugs at runtime.

2. **No `noUncheckedIndexedAccess`** anywhere. Array/map access returns potentially-undefined values without compiler warning.

3. **No `exactOptionalPropertyTypes`** anywhere. Optional properties can be assigned `undefined` instead of being omitted.

4. **Stylelint missing `stylelint-no-px` enforcement.** The plugin is installed as a devDependency but not configured in `stylelint.config.cjs` — the rule that would catch hardcoded pixel values isn't active.

5. **Many stylelint rules disabled** (`no-descending-specificity`, `no-duplicate-selectors`, `at-rule-no-unknown`, `selector-pseudo-class-no-unknown`, `selector-type-no-unknown`, `property-no-unknown`). While some are needed for modern CSS features (:state, @starting-style), the broad disabling reduces safety.

6. **No ESLint rule preventing `document.querySelector`** or other global DOM access patterns that should use Lit's `@query` decorator or `this.renderRoot.querySelector()`.

7. **ts-lit-plugin rules all disabled.** In `projects/components/tsconfig.json`, all 10 `ts-lit-plugin` rules are set to `"off"`, negating the value of having the plugin.

8. **CEM generation not validated in CI.** While `custom-elements.lock.json` files exist and `test:api` validates them, there's no step that regenerates the CEM and checks for drift between source and manifest.

### Recommendations

1. **Enable `strictNullChecks: true`** in `projects/components/tsconfig.json`. This will be a large migration but is the highest-ROI type-safety improvement. Consider an incremental approach with `// @ts-expect-error` annotations.

2. **Activate `stylelint-no-px`** in `stylelint.config.cjs`:
```javascript
plugins: ['stylelint-no-px'],
rules: {
  'meowtec/no-px': [true, { ignore: ['1px'] }],
}
```

3. **Add ESLint rule for global DOM access:**
```javascript
'no-restricted-globals': ['error', 'document', 'window'],
// or a custom rule that checks for document.querySelector usage
```

4. **Enable ts-lit-plugin rules** incrementally — start with `no-missing-import` and `no-unknown-attribute`.

5. **Add CEM drift detection to CI:** After build, run `bp build:cem` and `git diff --exit-code custom-elements.lock.json` to catch uncommitted CEM changes.

---

## 3. Context & Memory Files (CLAUDE.md / Agent Knowledge Base)

### Current State

**Root context:** Both `CLAUDE.md` and `AGENTS.md` exist at root. `CLAUDE.md` simply references `@AGENTS.md`. `AGENTS.md` is comprehensive (300+ lines) covering:
- Repository structure and package dependency graph
- Environment requirements (Node 24.14.0, pnpm 10.30.3, Git LFS)
- Essential commands
- 7-file component convention
- Critical conventions (accessor keyword, import rules, component pattern, controllers, design tokens, testing, documentation)
- Component creation checklist
- AI agent support references to skills
- Build system overview
- Common workflows
- Commit message conventions with examples

**Skills directory:** `.claude/skills/` contains 6 specialized skills:
- `typescript/SKILL.md` — Import conventions, component patterns, property decorators, controllers, events, slots, i18n, state management, code style
- `testing-unit/SKILL.md` — Jasmine patterns, fixture management, CSS state testing, accessibility, event testing, form association, coverage checklist
- `testing-visual/SKILL.md` — Playwright screenshot patterns, light/dark theme
- `testing-performance/SKILL.md` — Bundle size and render time test templates
- `testing/SKILL.md` — Overview linking to the 3 specific testing skills
- `documentation/SKILL.md` — Eleventy docs, example authoring patterns

**Cursor rules:** `.cursor/rules` exists (references Claude skills for consistency).

### Gaps

1. **No per-package context.** Individual packages (crane, grid, virtual, etc.) lack READMEs or convention docs. An agent working on `grid` wouldn't know its unique patterns (e.g., cell selection, virtual scrolling integration) without reading all source files.

2. **No ADRs (Architecture Decision Records).** Key decisions are undocumented:
   - Why `ElementInternals` states over attribute reflection?
   - Why zero-dependency constraint for `virtual`?
   - Why `accessor` keyword required (TC39 decorator spec)?
   - Why OKLCH color space in themes?
   - Why semantic-release over changesets?

3. **Top 5 implicit conventions an agent would likely violate:**

   | # | Convention | Where Documented | Risk |
   |---|-----------|-----------------|------|
   | 1 | **Stateless-at-rest pattern** — Components should not reflect boolean states as attributes; use `ElementInternals` `states` | Partially in ESLint rules, not in AGENTS.md prose | Agent adds `[disabled]` attribute selector in CSS instead of `:state(disabled)` |
   | 2 | **Zero-dependency constraint** — `virtual` package must have zero runtime deps; other packages can only depend on siblings | Not documented anywhere as a rule | Agent adds lodash or other npm dep |
   | 3 | **OKLCH color space** — Theme tokens use OKLCH, not hex/rgb/hsl | Not documented | Agent adds `color: #333` in CSS |
   | 4 | **Event naming pattern** — Events use `bp-` prefix for custom events, no verb prefix (not `onClick` but `click`) | In ESLint rules but prose explanation is minimal | Agent creates `onToggle` event |
   | 5 | **Controller decorator composition** — Shared behaviors come from decorators (`@stateDisabled`, `@typeButton`), not inheritance or mixins | Listed in AGENTS.md but "when to use which" guidance is missing | Agent creates a base class mixin instead of using a decorator |

4. **No prohibited patterns section.** AGENTS.md says what TO do but doesn't have a clear "never do this" list. Agents benefit from explicit negative examples.

5. **No troubleshooting / FAQ section.** Common agent failure modes (e.g., "tests fail because element not registered" → "check include/{name}.ts") aren't documented.

### Recommendations

1. **Add a "Prohibited Patterns" section to AGENTS.md:**
```markdown
## Prohibited Patterns
- NEVER use attribute selectors for component states; use `:state()` pseudo-class
- NEVER add runtime dependencies to any package (use peer deps or devDeps only)
- NEVER hardcode color values; use OKLCH design tokens from themes
- NEVER create base class mixins; use controller decorators
- NEVER use `document.querySelector()`; use `this.renderRoot.querySelector()` or `@query`
- NEVER emit events with verb prefixes (onX, handleX)
- NEVER use `@property()` without `accessor` keyword
```

2. **Add per-package README.md** with package-specific conventions, dependency constraints, and unique patterns.

3. **Create `docs/adr/` directory** with at least 5 foundational ADRs covering the conventions listed above.

4. **Add a troubleshooting section** to AGENTS.md with common error → solution mappings.

---

## 4. Claude Code Hooks (.claude/settings.json)

### Current State

The `.claude/settings.json` is well-configured with hooks across all 5 lifecycle events:

**SessionStart (1 hook):**
- Installs Node 24.14.0 via nvm, pnpm 10.30.3, Git LFS, frozen-lockfile deps, Playwright Chromium
- This is thorough and ensures a working environment

**PreToolUse — `Write` matcher (5 hooks):**
- `validate-accessor.sh` — **BLOCKING** (`exit 2`): Catches `@property` without `accessor` keyword
- `validate-design-tokens.sh` — WARNING: Catches hardcoded px values in CSS
- `validate-examples.sh` — **BLOCKING** (`exit 2`): Ensures `.examples.js` files have `metadata` and `example()` exports
- `validate-css-states.sh` — WARNING: Catches `[disabled]` attribute selectors (suggests `:state()`)
- `validate-imports.sh` — WARNING: Catches local imports without `.js` extension

**PostToolUse — `Write` matcher (2 hooks):**
- `validate-component-structure.sh` — INFO: Checks 7-file convention completeness
- `check-component-registration.sh` — REMINDER: Checks include file registration

**PostToolUse — `Bash` matcher (1 hook):**
- `log-test-results.sh` — Logs test run outcomes to `.claude/test-results.log`

**Stop (1 hook):**
- `quick-lint.sh` — Runs ESLint on recently modified files (30s timeout, non-blocking)

**UserPromptSubmit (1 hook):**
- `suggest-commit-scope.sh` — Detects package scope from modified files, suggests conventional commit format

### Gaps

1. **No `Edit` matcher on PreToolUse.** The accessor, design-token, CSS-state, and import validators only trigger on `Write`, not `Edit`. Since agents use `Edit` more often than `Write` for modifying existing files, these critical validations are bypassed for the most common modification path.

2. **No destructive command blocking.** There's no `PreToolUse` hook on `Bash` to catch dangerous commands like `rm -rf`, `git push --force`, `git reset --hard`, `pnpm publish`, or `git checkout .`.

3. **Design token hook is non-blocking** (exits 0 even on violations). Given the importance of the token convention, this should be blocking (exit 2).

4. **CSS state hook is non-blocking.** Same issue — attribute selectors for states should be blocked, not just warned.

5. **No Stop hook runs affected tests.** The `quick-lint.sh` only runs ESLint. When the agent finishes, there's no automatic test execution to verify correctness.

6. **No PostToolUse hook for CEM regeneration.** After modifying component source, the Custom Elements Manifest should be regenerated.

7. **Hook scripts don't validate `Edit` tool input format.** The `INPUT=$(cat)` + `jq` pattern assumes `Write` tool JSON shape (`file_path`, `content`). The `Edit` tool has different fields (`file_path`, `old_string`, `new_string`).

### Recommendations

1. **Extend PreToolUse matcher to `Write|Edit`** and update hook scripts to handle both tool input formats:
```json
{
  "matcher": "Write|Edit",
  "hooks": [
    { "type": "command", "command": ".claude/hooks/validate-accessor.sh" }
  ]
}
```
Update scripts to extract content from either `content` (Write) or `new_string` (Edit):
```bash
CONTENT=$(echo "$INPUT" | jq -r '.content // .new_string // empty')
```

2. **Add destructive command blocker:**
```json
{
  "matcher": "Bash",
  "hooks": [
    { "type": "command", "command": ".claude/hooks/block-destructive.sh" }
  ]
}
```
```bash
#!/bin/bash
# .claude/hooks/block-destructive.sh
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.command // empty')
if echo "$COMMAND" | grep -qE 'rm\s+-rf|git\s+push\s+--force|git\s+reset\s+--hard|pnpm\s+publish|git\s+checkout\s+\.'; then
  echo '{"error": "BLOCKING: Destructive command detected. Get explicit user approval."}' >&2
  exit 2
fi
exit 0
```

3. **Make design-token and CSS-state hooks blocking** (change `exit 0` to `exit 2` on violation).

4. **Add Stop hook for affected tests:**
```json
{
  "matcher": "",
  "hooks": [
    { "type": "command", "command": ".claude/hooks/quick-lint.sh", "timeout": 30 },
    { "type": "command", "command": ".claude/hooks/run-affected-tests.sh", "timeout": 120 }
  ]
}
```

---

## 5. Claude Code Skills

### Current State

Six skills exist in `.claude/skills/`:

| Skill | File | Quality |
|-------|------|---------|
| `typescript` | `typescript/SKILL.md` | Comprehensive — covers imports, components, decorators, controllers, events, slots, i18n, state management |
| `testing-unit` | `testing-unit/SKILL.md` | Comprehensive — 13-item coverage checklist, common pitfalls, 10 best practices |
| `testing-visual` | `testing-visual/SKILL.md` | Adequate — template-focused, covers light/dark themes |
| `testing-performance` | `testing-performance/SKILL.md` | Minimal — just a test template |
| `testing` | `testing/SKILL.md` | Index file linking to the 3 testing skills |
| `documentation` | `documentation/SKILL.md` | Comprehensive — style guidelines, coverage requirements, quality checklist |

### Gaps

1. **No `new-component` scaffolding skill.** This is the highest-value missing skill. Creating a new component requires 7+ files, registration in 3 include files, and adherence to multiple conventions. An agent currently must piece this together from AGENTS.md and the typescript skill.

2. **No `add-form-control` skill.** Extending a component to participate in forms via `ElementInternals` is a complex, multi-step process (formAssociated flag, formStateRestoreCallback, validation API) that's not covered by any skill.

3. **No `audit-accessibility` skill.** While `eslint-plugin-lit-a11y` catches template issues, there's no skill guiding an agent through WAI-ARIA authoring practices for a specific component role (e.g., what aria attributes a combobox needs).

4. **No `validate-cem` skill.** Agents have no guided workflow for verifying Custom Elements Manifest completeness.

5. **No `simplify` / code review skill specific to BlueprintUI patterns.** The generic `simplify` skill exists but doesn't know about BlueprintUI-specific anti-patterns.

6. **Performance testing skill is too minimal.** It provides a template but no guidance on choosing bundle size thresholds, understanding render time benchmarks, or debugging performance regressions.

### Recommendations

1. **Create `.claude/skills/new-component/SKILL.md`:**
```markdown
---
name: new-component
description: Scaffold a new BlueprintUI Web Component with all required files
---

## Steps
1. Create component directory: `projects/components/src/{name}/`
2. Generate all 7 files from templates (element.ts, element.css, element.spec.ts,
   element.visual.ts, element.performance.ts, element.examples.js, index.ts)
3. Create include file: `projects/components/src/include/{name}.ts`
4. Register in `include/all.ts` and `include/lazy.ts`
5. Run `pnpm run test:unit -- src/{name}/element.spec.ts` to verify
6. Run `pnpm run lint` to verify conventions

## Templates
[Include full file templates for each of the 7 required files]
```

2. **Create `.claude/skills/add-form-control/SKILL.md`** covering:
   - `static formAssociated = true`
   - `ElementInternals` setup
   - `formStateRestoreCallback` implementation
   - Form validation API integration
   - Required test patterns for form association

3. **Create `.claude/skills/audit-accessibility/SKILL.md`** with:
   - WAI-ARIA authoring practices lookup by component role
   - Required aria attributes per role
   - Keyboard interaction patterns per role
   - Test checklist for accessibility

4. **Expand `testing-performance/SKILL.md`** with threshold selection guidance and debugging workflow.

---

## 6. Architectural Constraint Enforcement

### Current State

**Package boundaries:** pnpm workspace with `workspace:^` dependencies. No cross-package import restrictions enforced beyond what TypeScript path resolution provides. Each package's `tsconfig.json` has `rootDir: "./src"` and package-scoped `paths`, which limits accidental imports but doesn't prevent an agent from adding a `dependencies` entry.

**Zero-dependency rule:** `projects/virtual/package.json` has zero runtime `dependencies` — but this is implicit. No CI check validates it.

**API contract testing:** The `custom-elements.lock.json` + `bp api` system is effective. Running `pnpm run test:api:update` regenerates lockfiles; CI compares against committed lockfiles. This catches property/event/slot removals (breaking changes).

**Custom ESLint rules:** The 15 rules in `projects/internals/eslint/` effectively encode architectural constraints as executable rules. Key rules like `require-accessor-keyword`, `no-reflect-state-properties`, and `no-stateful-properties` catch the most common anti-patterns.

### Gaps

1. **No package dependency boundary enforcement.** Nothing prevents an agent from adding `lodash` to `projects/components/package.json`. There's no `depcheck`, `dependency-cruiser`, or equivalent.

2. **No import boundary enforcement.** An agent could import from `@blueprintui/grid` inside `@blueprintui/components` (reversing the dependency direction) and it would compile fine.

3. **CEM lockfile not auto-verified in CI for drift.** If an agent modifies a component but forgets to update the CEM lockfile, CI won't catch it unless `test:api` is in the chain (it is — via build dependencies — but the failure message may be unclear).

4. **No bundle size budget enforcement in CI.** Performance tests check individual component bundles, but there's no aggregate budget preventing total bundle growth.

5. **No circular dependency detection.** pnpm workspace doesn't prevent circular package references at the code level.

### Recommendations

1. **Add dependency constraint check to CI:**
```bash
# .github/scripts/check-deps.sh
# Verify virtual has zero runtime deps
VIRTUAL_DEPS=$(jq '.dependencies // {} | length' projects/virtual/package.json)
if [ "$VIRTUAL_DEPS" -ne 0 ]; then
  echo "ERROR: virtual package must have zero runtime dependencies"
  exit 1
fi

# Verify no external (non-@blueprintui) runtime deps in any package
for pkg in projects/*/package.json; do
  EXTERNAL=$(jq -r '.dependencies // {} | keys[] | select(startswith("@blueprintui") | not)' "$pkg")
  if [ -n "$EXTERNAL" ]; then
    echo "ERROR: External dependency found in $pkg: $EXTERNAL"
    exit 1
  fi
done
```

2. **Add `dependency-cruiser` or equivalent** to validate import boundaries match the declared package dependency graph.

3. **Add CEM drift check** as a post-build CI step:
```bash
pnpm run test:api:update
git diff --exit-code '**/custom-elements.lock.json' || \
  (echo "ERROR: CEM lockfiles out of date. Run 'pnpm run test:api:update' and commit." && exit 1)
```

4. **Add structural convention tests** (as recommended in Section 1) that can run as part of `pnpm run test` and validate:
   - All component directories have 7 required files
   - All components are registered in include files
   - No component CSS uses hardcoded px values > 1px
   - All `@property` decorators use `accessor`

---

## 7. Feedback Loop Completeness

### Signal Clarity — Grade: B+

| Signal | Clear? | Notes |
|--------|--------|-------|
| Unit tests | Yes | `pnpm run test` → exit 0/1 |
| Visual tests | Yes | Playwright screenshots with Git LFS baselines |
| Performance tests | Yes | Bundle size + render time assertions |
| API contracts | Yes | CEM lockfile comparison |
| Lint | Yes | ESLint + Stylelint + Prettier → exit 0/1 |
| TypeScript | Partial | Compiles but `strictNullChecks: false` reduces signal |
| a11y | Weak | `test:a11y` exists but not in CI chain |
| Behavior integration | No | No Playwright behavioral tests |

**Verdict:** An agent can get a deterministic green/red for most changes. The main false-negative risk is null-safety bugs passing TypeScript compilation due to `strictNullChecks: false`.

### Cycle Time — Estimate: ~3-5 minutes (full CI)

| Gate | Estimated Time |
|------|---------------|
| Lint (ESLint + Stylelint + Prettier) | ~30s |
| Build (all packages via Wireit) | ~60-90s |
| Unit tests (Jasmine via web-test-runner) | ~60s |
| Visual tests (Playwright screenshots) | ~60-90s |
| Performance tests | ~30s |
| **Total (with Wireit parallelism)** | **~3-5 min** |

**Bottleneck:** Build step depends on all packages; Wireit caching mitigates for incremental changes. Visual tests are the slowest non-cached step.

**Agent-specific cycle time:** For a single component change, an agent can run `pnpm run test:unit -- src/{component}/element.spec.ts` in ~5-10 seconds, giving fast inner-loop feedback.

### Gap Entropy — Most Likely Undetected Agent Mistakes

| Rank | Mistake Class | Why Missed | Fix |
|------|--------------|-----------|-----|
| 1 | **Null-reference bug** | `strictNullChecks: false` | Enable strict null checks |
| 2 | **Wrong CSS state pattern** | Hook is warning-only, not on Edit | Make hook blocking, add Edit matcher |
| 3 | **External dependency added** | No dep boundary enforcement | Add CI check script |
| 4 | **Missing include registration** | Hook is info-only, not blocking | Make blocking or add structural test |
| 5 | **Behavioral regression** | No integration tests | Add Playwright behavioral tests |

### Priority Roadmap — Ordered by ROI for Agent Autonomy

| Priority | Area | Impact | Effort | Rationale |
|----------|------|--------|--------|-----------|
| **P0** | **Hooks: Add Edit matcher** (§4) | High | Low | Currently the 5 PreToolUse validators only fire on Write, missing the primary Edit path. Single-line config change + minor script update. |
| **P1** | **Hooks: Make warnings blocking** (§4) | High | Low | Design tokens and CSS states hooks warn but don't block. Changing `exit 0` to `exit 2` prevents the most common agent style violations. |
| **P2** | **Skills: new-component** (§5) | High | Medium | Most common agent task. A scaffolding skill with full templates would eliminate 80% of convention errors in new component creation. |
| **P3** | **TypeScript: strictNullChecks** (§2) | High | High | Biggest type-safety gap. High effort but highest long-term ROI for correctness. Consider incremental rollout. |
| **P4** | **Architectural: dependency constraints** (§6) | Medium | Low | Simple shell script in CI prevents external dep contamination. |
| **P5** | **Context: prohibited patterns doc** (§3) | Medium | Low | Add explicit "never do this" section to AGENTS.md. Low effort, prevents common agent errors. |
| **P6** | **Testing: structural convention tests** (§1) | Medium | Medium | Executable invariant checks catch convention violations that linting misses. |
| **P7** | **Stylelint: activate no-px** (§2) | Low | Low | Plugin is installed but not configured. One-line config change. |
| **P8** | **Hooks: destructive command blocker** (§4) | Low | Low | Safety net for `rm -rf`, `git push --force`. Low probability but high impact. |
| **P9** | **Testing: a11y in CI** (§1) | Low | Low | Wire `test:a11y` into `ci:run` dependencies. |
| **P10** | **Context: ADRs** (§3) | Low | Medium | Documents the "why" behind conventions. Most valuable for long-term agent onboarding. |

---

## Summary

BlueprintUI's agent harness is **above average** for an open-source Web Components library. Key strengths:

- **Excellent custom ESLint plugin** (15 rules encoding architectural constraints)
- **Strong hook infrastructure** (10 hooks across all lifecycle events with blocking validators)
- **Comprehensive context files** (AGENTS.md + 6 specialized skills)
- **Good CI pipeline** (Wireit-orchestrated with lint, build, test, visual, performance, API contract gates)
- **Effective API contract testing** (CEM lockfile snapshots)

The highest-ROI improvements are:
1. **Fix the Edit matcher gap** in hooks (most agent edits bypass all PreToolUse validators)
2. **Upgrade warning hooks to blocking** (design tokens, CSS states)
3. **Create a new-component scaffolding skill** (eliminates convention errors in the most common task)
4. **Enable strictNullChecks** (closes the biggest type-safety hole)

These 4 changes would move the harness from "good" to "excellent" for autonomous agent reliability.
