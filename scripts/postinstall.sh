#!/usr/bin/env bash
echo "┏━━━ POSTINSTALL ━━━━━━━"
concurrently -p name -c "green,magenta,cyan,purple" -n "rest,graphql,client" "yarn --cwd services/tasks install" "yarn --cwd server install" "yarn --cwd client install"
