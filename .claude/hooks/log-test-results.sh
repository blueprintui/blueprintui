#!/bin/bash
# Logs test command results for tracking session progress
# Creates a simple log of test runs and their outcomes

set -e

# Hook receives tool output as JSON on stdin
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
EXIT_CODE=$(echo "$INPUT" | jq -r '.tool_result.exit_code // 0')

# Only log test-related commands
if [[ ! "$COMMAND" =~ test|spec|jasmine|playwright ]]; then
  exit 0
fi

# Determine project directory
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
LOG_FILE="$PROJECT_DIR/.claude/test-results.log"

# Ensure log directory exists
mkdir -p "$(dirname "$LOG_FILE")"

TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
STATUS="PASS"
if [[ "$EXIT_CODE" != "0" ]]; then
  STATUS="FAIL"
fi

# Extract test type from command
TEST_TYPE="unknown"
if [[ "$COMMAND" =~ visual ]]; then
  TEST_TYPE="visual"
elif [[ "$COMMAND" =~ performance ]]; then
  TEST_TYPE="performance"
elif [[ "$COMMAND" =~ unit|spec ]]; then
  TEST_TYPE="unit"
elif [[ "$COMMAND" =~ test ]]; then
  TEST_TYPE="test"
fi

echo "[$TIMESTAMP] [$STATUS] $TEST_TYPE: $COMMAND" >> "$LOG_FILE"

# Keep log file small - only last 100 entries
tail -100 "$LOG_FILE" > "$LOG_FILE.tmp" && mv "$LOG_FILE.tmp" "$LOG_FILE"

exit 0
