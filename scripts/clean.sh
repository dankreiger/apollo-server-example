#!/usr/bin/env bash

echo "┏━━━ CLEAN ━━━━━━━"
concurrently -p name           \
-c "green,magenta,cyan,purple" \
-n "rest,graphql,client" "yarn --cwd services/tasks clean" "yarn --cwd server clean" "yarn --cwd client clean"
