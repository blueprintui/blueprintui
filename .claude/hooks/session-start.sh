#!/usr/bin/env bash
set -e
cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || cd "$(git rev-parse --show-toplevel)" 2>/dev/null || exit 0
pnpm i --frozen-lockfile && pnpm run ci