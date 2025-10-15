#!/bin/bash
set -e

STATE_FILE="timer_state.json"

# Chargement de l'état actuel
ACTIVE=$(jq -r '.active' "$STATE_FILE")

if [ "$ACTIVE" != "true" ]; then
  echo "⏸️ Timer inactif, aucune notification envoyée."
  exit 0
fi

# Création du lien de relance
REPO_URL=$(git config --get remote.origin.url | sed 's/\.git$//')
TRIGGER_URL="$REPO_URL/-/pipeline_schedules"
MESSAGE="⏰ 30 minutes écoulées ! Clique ici pour relancer le timer 👉 $TRIGGER_URL"

# Envoi de la notification Discord
curl -H "Content-Type: application/json" \
  -d "{\"content\": \"$MESSAGE\"}" \
  "$DISCORD_WEBHOOK_URL"

# Met l'état sur false (en attente de clic)
jq '.active = false' "$STATE_FILE" > tmp.json && mv tmp.json "$STATE_FILE"

# Commit et push la mise à jour
git config user.email "gitlab-bot@example.com"
git config user.name "GitLab Timer Bot"
git add "$STATE_FILE"
git commit -m "Pause timer après notif"
git push
