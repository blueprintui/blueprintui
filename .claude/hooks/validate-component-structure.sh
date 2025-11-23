#!/bin/bash
# Checks if component directories have all 7 required files
# Required: element.ts, element.css, element.spec.ts, element.visual.ts,
#           element.performance.ts, element.examples.js, index.ts

set -e

# Hook receives tool input as JSON on stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.file_path // empty')

# Only check component source files
if [[ ! "$FILE_PATH" =~ projects/components/src/[^/]+/element\.(ts|css)$ ]] && \
   [[ ! "$FILE_PATH" =~ projects/components/src/[^/]+/index\.ts$ ]]; then
  exit 0
fi

# Extract component directory
COMP_DIR=$(dirname "$FILE_PATH")
COMP_NAME=$(basename "$COMP_DIR")

# Skip internal directories
if [[ "$COMP_NAME" == "internals" ]] || [[ "$COMP_NAME" == "include" ]]; then
  exit 0
fi

REQUIRED_FILES=("element.ts" "element.css" "element.spec.ts" "element.visual.ts" "element.performance.ts" "element.examples.js" "index.ts")
MISSING=()

for file in "${REQUIRED_FILES[@]}"; do
  if [[ ! -f "$COMP_DIR/$file" ]]; then
    MISSING+=("$file")
  fi
done

if [[ ${#MISSING[@]} -gt 0 ]]; then
  echo "INFO: Component '$COMP_NAME' missing files: ${MISSING[*]}"
  echo "Required for complete component: ${REQUIRED_FILES[*]}"
fi

exit 0
