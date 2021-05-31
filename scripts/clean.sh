#!/usr/bin/env bash

echo "┏━━━ CLEAN ━━━━━━━"
concurrently -p name           \
-c "yellow,magenta,cyan" \
-n "tasks,server,client" "yarn --cwd services/tasks clean" "yarn --cwd server clean" "yarn --cwd client clean"
