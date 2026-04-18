#!/usr/bin/env bash
cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || cd "$(git rev-parse --show-toplevel)" 2>/dev/null || exit 0
if pnpm run format:fix && pnpm run ci; then
  echo "all checks pass"
else
  exit 2
fi
