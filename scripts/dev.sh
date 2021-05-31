#!/usr/bin/env bash

echo "┏━━━ DEV ━━━━━━━"
concurrently -p name           \
-c "green,magenta,cyan,purple" \
-n "rest,graphql,client" "yarn --cwd services/tasks dev" "yarn --cwd server dev" "yarn --cwd client dev" 

