#!/usr/bin/env bash
echo "┏━━━ POSTINSTALL ━━━━━━━"
concurrently -p name \
 -c "yellow,magenta,cyan" \
-n "tasks,server,client" "yarn --cwd services/tasks install" "yarn --cwd server install" "yarn --cwd client install"
