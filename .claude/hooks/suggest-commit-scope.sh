#!/bin/bash
# Suggests commit scope based on modified files
# Helps ensure correct conventional commit format

set -e

# Hook receives user prompt as JSON on stdin
INPUT=$(cat)
PROMPT=$(echo "$INPUT" | jq -r '.prompt // empty')

# Only trigger for commit-related prompts
if [[ ! "$PROMPT" =~ [Cc]ommit ]]; then
  exit 0
fi

# Determine project directory
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$PROJECT_DIR" || exit 0

# Get modified files (staged + unstaged)
MODIFIED=$(git diff --name-only HEAD 2>/dev/null || git diff --name-only 2>/dev/null || true)

if [[ -z "$MODIFIED" ]]; then
  exit 0
fi

# Detect scope from modified paths
SCOPE=""
if echo "$MODIFIED" | grep -q "projects/components"; then
  SCOPE="components"
elif echo "$MODIFIED" | grep -q "projects/grid"; then
  SCOPE="grid"
elif echo "$MODIFIED" | grep -q "projects/crane"; then
  SCOPE="crane"
elif echo "$MODIFIED" | grep -q "projects/icons"; then
  SCOPE="icons"
elif echo "$MODIFIED" | grep -q "projects/themes"; then
  SCOPE="themes"
elif echo "$MODIFIED" | grep -q "projects/typewriter"; then
  SCOPE="typewriter"
elif echo "$MODIFIED" | grep -q "projects/typography"; then
  SCOPE="typography"
elif echo "$MODIFIED" | grep -q "projects/layout"; then
  SCOPE="layout"
elif echo "$MODIFIED" | grep -q "projects/docs"; then
  SCOPE="docs"
elif echo "$MODIFIED" | grep -q "projects/examples"; then
  SCOPE="examples"
elif echo "$MODIFIED" | grep -q ".claude/"; then
  SCOPE="build"
fi

if [[ -n "$SCOPE" ]]; then
  echo "Suggested commit scope based on changes: $SCOPE"
  echo "Format: feat($SCOPE): description or fix($SCOPE): description"
fi

exit 0
