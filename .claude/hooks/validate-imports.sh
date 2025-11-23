#!/bin/bash
# Validates TypeScript imports use .js extensions
# TypeScript outputs .js files, so imports must use .js extension

set -e

# Hook receives tool input as JSON on stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.file_path // empty')
CONTENT=$(echo "$INPUT" | jq -r '.content // empty')

# Only check TypeScript files in components
if [[ ! "$FILE_PATH" =~ projects/components/src/.*\.ts$ ]]; then
  exit 0
fi

# Skip spec and test files
if [[ "$FILE_PATH" =~ \.(spec|visual|performance)\.ts$ ]]; then
  exit 0
fi

# Check for local imports without .js extension
# Pattern: from './something' or from '../something' without .js
VIOLATIONS=$(echo "$CONTENT" | grep -nP "from\s+['\"]\.\.?/[^'\"]+(?<!\.js)(?<!\.css)['\"]" 2>/dev/null | grep -v "with { type:" || true)

if [[ -n "$VIOLATIONS" ]]; then
  echo "WARNING: Local imports should use .js extension:" >&2
  echo "$VIOLATIONS" | head -3 >&2
  echo "Example: import { foo } from './bar.js';" >&2
fi

exit 0
