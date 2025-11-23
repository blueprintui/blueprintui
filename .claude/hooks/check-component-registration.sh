#!/bin/bash
# Reminds about component registration when creating new components
# Components must be registered in include/{name}.ts, include/all.ts, include/lazy.ts

set -e

# Hook receives tool input as JSON on stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.file_path // empty')

# Only trigger for component index.ts files
if [[ ! "$FILE_PATH" =~ projects/components/src/([^/]+)/index\.ts$ ]]; then
  exit 0
fi

COMP_NAME="${BASH_REMATCH[1]}"
INCLUDE_DIR="$(dirname "$(dirname "$FILE_PATH")")/include"

# Skip internal directories
if [[ "$COMP_NAME" == "internals" ]] || [[ "$COMP_NAME" == "include" ]]; then
  exit 0
fi

# Check if include file exists
if [[ ! -f "$INCLUDE_DIR/$COMP_NAME.ts" ]]; then
  echo "REMINDER: Register new component '$COMP_NAME' in include files:"
  echo "  1. Create: $INCLUDE_DIR/$COMP_NAME.ts"
  echo "  2. Add export to: $INCLUDE_DIR/all.ts"
  echo "  3. Add lazy loader to: $INCLUDE_DIR/lazy.ts"
fi

exit 0
