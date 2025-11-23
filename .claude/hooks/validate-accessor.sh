#!/bin/bash
# Validates that @property decorators use accessor keyword
# This is CRITICAL for BlueprintUI - missing accessor causes runtime bugs

set -e

# Hook receives tool input as JSON on stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.file_path // empty')
CONTENT=$(echo "$INPUT" | jq -r '.content // empty')

# Only check element.ts files in components
if [[ ! "$FILE_PATH" =~ projects/components/src/.*/element\.ts$ ]]; then
  exit 0
fi

# Check for @property without accessor (the wrong pattern)
# Pattern: @property(...) followed by word that is NOT 'accessor'
if echo "$CONTENT" | grep -P '@property\s*\([^)]*\)\s*(?!accessor\s)\w' >/dev/null 2>&1; then
  echo '{"error": "BLOCKING: Found @property decorator without accessor keyword. Use: @property({ type: String }) accessor myProp: string;"}' >&2
  exit 2  # Blocking error
fi

exit 0
