#!/bin/bash
# Validates CSS uses :state() pseudo-class instead of attribute selectors
# BlueprintUI uses ElementInternals states, not attributes

set -e

# Hook receives tool input as JSON on stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.file_path // empty')
CONTENT=$(echo "$INPUT" | jq -r '.content // empty')

# Only check component CSS files
if [[ ! "$FILE_PATH" =~ projects/components/src/.*/element\.css$ ]]; then
  exit 0
fi

# Check for attribute selectors that should be :state()
STATES=("disabled" "checked" "expanded" "readonly" "selected" "pressed" "active")
WARNINGS=()

for state in "${STATES[@]}"; do
  if echo "$CONTENT" | grep -qE "\[${state}\]|\[${state}=" 2>/dev/null; then
    WARNINGS+=("Use :host(:state($state)) instead of [$state] selector")
  fi
done

if [[ ${#WARNINGS[@]} -gt 0 ]]; then
  echo "WARNING: Use CSS :state() pseudo-class for component states:" >&2
  for warn in "${WARNINGS[@]}"; do
    echo "  - $warn" >&2
  done
  echo "See: https://developer.mozilla.org/en-US/docs/Web/CSS/:state" >&2
fi

exit 0
