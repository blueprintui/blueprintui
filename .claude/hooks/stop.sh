#!/bin/bash
set -e
cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || cd "$(git rev-parse --show-toplevel)" 2>/dev/null || exit 0
pnpm run format:fix && pnpm run ci
