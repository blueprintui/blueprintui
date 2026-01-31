#!/bin/bash
# Validates documentation example files have required exports
# Required: export const metadata, export function example()

set -e

# Hook receives tool input as JSON on stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.file_path // empty')
CONTENT=$(echo "$INPUT" | jq -r '.content // empty')

# Only check examples files
if [[ ! "$FILE_PATH" =~ \.examples\.js$ ]]; then
  exit 0
fi

ERRORS=()

# Check for required metadata export
if ! echo "$CONTENT" | grep -q "export const metadata"; then
  ERRORS+=("Missing 'export const metadata = { name: \"...\", elements: [\"bp-...\"] };'")
fi

# Check for required example function
if ! echo "$CONTENT" | grep -q "export function example"; then
  ERRORS+=("Missing 'export function example() { return /* html */\`...\`; }'")
fi

if [[ ${#ERRORS[@]} -gt 0 ]]; then
  echo "ERROR: Documentation examples file is invalid:" >&2
  for err in "${ERRORS[@]}"; do
    echo "  - $err" >&2
  done
  exit 2  # Blocking error
fi

exit 0
