#!/bin/bash
set -e

STATE_FILE="timer_state.json"

# Remet le timer à true
jq '.active = true' "$STATE_FILE" > tmp.json && mv tmp.json "$STATE_FILE"

# Commit et push la mise à jour
git config user.email "gitlab-bot@example.com"
git config user.name "GitLab Timer Bot"
git add "$STATE_FILE"
git commit -m "Relance du timer manuelle"
git push
