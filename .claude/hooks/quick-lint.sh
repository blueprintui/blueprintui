#!/bin/bash
# Runs quick lint check on recently modified TypeScript files
# Provides faster feedback than waiting for full CI

# Don't fail on lint errors - this is informational
set +e

cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || cd "$(git rev-parse --show-toplevel)" 2>/dev/null || exit 0

# Get TypeScript files modified in last 5 minutes
MODIFIED=$(find projects/components/src -name "*.ts" -mmin -5 -type f 2>/dev/null | grep -v node_modules | head -10)

if [[ -z "$MODIFIED" ]]; then
  exit 0
fi

# Count files
FILE_COUNT=$(echo "$MODIFIED" | wc -l)

echo "Quick lint: checking $FILE_COUNT recently modified file(s)..."

# Run eslint quietly (only show errors)
LINT_OUTPUT=$(echo "$MODIFIED" | xargs npx eslint --quiet 2>&1 || true)

if [[ -n "$LINT_OUTPUT" ]]; then
  echo "Lint issues found:" >&2
  echo "$LINT_OUTPUT" | head -20 >&2
  echo "" >&2
  echo "Run 'pnpm run lint' for full report" >&2
fi

exit 0
