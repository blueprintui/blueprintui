#!/bin/bash
# Validates no hardcoded px values in CSS (design tokens only)
# BlueprintUI requires design tokens for consistent theming

set -e

# Hook receives tool input as JSON on stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.file_path // empty')
CONTENT=$(echo "$INPUT" | jq -r '.content // empty')

# Only check CSS files in components
if [[ ! "$FILE_PATH" =~ \.css$ ]]; then
  exit 0
fi

# Check for hardcoded px values (excluding 0px, 1px)
# Allow: 0px, 1px, values in var() like var(--bp-size-100)
# Block: 16px, 24px, etc.
# First grep for any px values >= 2px, then filter out var() lines
VIOLATIONS=$(echo "$CONTENT" | grep -nE '\b([2-9]|[1-9][0-9]+)px\b' 2>/dev/null | grep -v 'var(--' | head -5 || true)

if [[ -n "$VIOLATIONS" ]]; then
  echo "WARNING: Hardcoded pixel values found - use design tokens instead:" >&2
  echo "$VIOLATIONS" >&2
  echo "Example: Use var(--bp-size-500) instead of 16px" >&2
  # Non-blocking warning - exit 0 but show message
  exit 0
fi

exit 0
