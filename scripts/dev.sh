#!/usr/bin/env bash

echo "┏━━━ DEV ━━━━━━━"
concurrently -p name           \
-c "yellow,magenta,cyan" \
-n "tasks,server,client" "yarn --cwd services/tasks dev" "yarn --cwd server dev" "yarn --cwd client dev" 

