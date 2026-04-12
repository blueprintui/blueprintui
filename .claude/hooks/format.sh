#!/usr/bin/env bash
set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Exit early if no file path provided
if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

# Run code formatter on specific file
OUTPUT=$(cd "$CLAUDE_PROJECT_DIR" && pnpm exec prettier --write --ignore-unknown --no-error-on-unmatched-pattern "$FILE_PATH" 2>&1) || EXIT_CODE=$?

if [[ ${EXIT_CODE:-0} -ne 0 && -n "$OUTPUT" ]]; then
  echo "$OUTPUT" >&2
  exit 2
fi

exit 0